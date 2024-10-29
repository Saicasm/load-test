## Installation & Setup

### Docker Setup for Monitoring

1. Create `docker-compose.yml`:

```yaml
version: "3.8"

services:
  influxdb:
    image: influxdb:1.8.10
    networks:
      - k6
    ports:
      - "8086:8086"
    environment:
      - INFLUXDB_DB=k6
      - INFLUXDB_HTTP_AUTH_ENABLED=false

  grafana:
    image: grafana/grafana:latest
    networks:
      - k6
    ports:
      - "3000:3000"
    environment:
      - GF_AUTH_ANONYMOUS_ENABLED=true
      - GF_AUTH_ANONYMOUS_ORG_ROLE=Admin
      - GF_AUTH_DISABLE_LOGIN_FORM=true
    volumes:
      - grafana_data:/var/lib/grafana
    depends_on:
      - influxdb

networks:
  k6:
    driver: bridge

volumes:
  grafana_data:
```

2. Start containers:

```bash
docker-compose up -d
```

3. Run k6 with InfluxDB output:

```bash
k6 run --out influxdb=http://localhost:8086/k6 script.js
```

## Monitoring Setup

### InfluxDB Configuration

1. Access InfluxDB:

```bash
curl http://localhost:8086/ping
```

2. Create database (if not exists):

```bash
curl -POST http://localhost:8086/query --data-urlencode "q=CREATE DATABASE k6"
```

### Grafana Setup

1. Access Grafana at http://localhost:3000
2. Add InfluxDB data source:
   - URL: http://influxdb:8086
   - Database: k6
   - HTTP Method: GET

## Grafana Dashboard

Here's a simple dashboard for monitoring request latency:

```json
{
  "annotations": {
    "list": []
  },
  "editable": true,
  "fiscalYearStartMonth": 0,
  "graphTooltip": 0,
  "links": [],
  "liveNow": false,
  "panels": [
    {
      "datasource": {
        "type": "influxdb",
        "uid": "${DS_INFLUXDB}"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "axisCenteredZero": false,
            "axisColorMode": "text",
            "axisLabel": "Response Time (ms)",
            "axisPlacement": "auto",
            "barAlignment": 0,
            "drawStyle": "line",
            "fillOpacity": 10,
            "gradientMode": "none",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "lineInterpolation": "smooth",
            "lineWidth": 2,
            "pointSize": 5,
            "scaleDistribution": {
              "type": "linear"
            },
            "showPoints": "auto",
            "spanNulls": false,
            "stacking": {
              "group": "A",
              "mode": "none"
            },
            "thresholdsStyle": {
              "mode": "line"
            }
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 2000
              }
            ]
          },
          "unit": "ms"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 16,
        "w": 24,
        "x": 0,
        "y": 0
      },
      "id": 1,
      "options": {
        "legend": {
          "calcs": ["min", "mean", "max", "p95"],
          "displayMode": "table",
          "placement": "bottom",
          "showLegend": true
        },
        "tooltip": {
          "mode": "single",
          "sort": "none"
        }
      },
      "title": "URL Latency",
      "type": "timeseries",
      "targets": [
        {
          "datasource": {
            "type": "influxdb",
            "uid": "${DS_INFLUXDB}"
          },
          "query": "SELECT \"value\" FROM \"http_req_duration\" WHERE \"name\" =~ /.*/ AND $timeFilter GROUP BY \"name\"",
          "rawQuery": true
        }
      ]
    }
  ],
  "refresh": "5s",
  "schemaVersion": 38,
  "style": "dark",
  "tags": ["k6", "latency"],
  "time": {
    "from": "now-5m",
    "to": "now"
  },
  "title": "K6 URL Latency Dashboard",
  "version": 1
}
```
