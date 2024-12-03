import http from 'k6/http';
import { check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';



export const options = {
    vus: 3,          // Key for Smoke test: Keep between 2-5 VUs
    duration: '10s',   // Short duration or few iterations
  };
export default function () {
  const url = `${__ENV.TEST_URL}`;
  const res = http.get(url);

  // Record response details
  const record = {
    timestamp: new Date().toISOString(),
    url: url,
    method: 'GET',
    status: res.status,
    response_time: res.timings.duration,
    body_size: res.body.length,
  };

  // Log the result to stdout as CSV-like format
  console.log(`${record.timestamp},${record.url},${record.method},${record.status},${record.response_time},${record.body_size}`);

  // Optional checks
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
  check(res, {
    'is status !200': (r) => r.status != 200,
  });
}

// Custom summary to generate only general test metrics (no CSV here)
export function handleSummary(data) {
  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
  };
}
