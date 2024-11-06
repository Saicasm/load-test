# Types of Performance Testing

This directory contains different types of performance testing examples and their associated scripts. To run any test script, use the following command:

```bash
k6 run -e TEST_URL=http://localhost:3000/ script.js
```

## 1. Smoke Testing

Smoke tests verify system functionality under minimal load and are used to gather baseline performance metrics. These tests are performed with a low number of Virtual Users (VUs), iterations, and duration. They're sometimes referred to as "shakeout tests."

### When to Use
- After system creation or updates
- As a prerequisite for other types of performance testing

### Goals
- Verify that the system functions without errors
- Confirm system stability under minimal load
- Prevent unnecessary testing if basic functionality fails
- Establish a baseline for other performance tests

```javascript
export const options = {
    vus: 3,          // Key for Smoke test: Keep between 2-5 VUs
    duration: '1m',   // Short duration or few iterations
};
```

## 2. Average-Load Testing

Average-load tests assess system performance under typical production load conditions. These tests simulate realistic user behavior and request patterns.

### Characteristics
- Includes ramp-up period
- Maintains constant load for set duration
- Implements controlled cool-down period

### Goals
- Evaluate system performance under typical load
- Identify early signs of performance degradation

```javascript
export const options = {
    stages: [
        { duration: '5m', target: 100 },  // Ramp-up from 1 to 100 users
        { duration: '30m', target: 100 }, // Maintain 100 users
        { duration: '5m', target: 0 },    // Ramp-down to 0 users
    ],
};
```

## 3. Spike Testing

Spike testing verifies system resilience under sudden, extreme load increases. It involves rapid scaling to high utilization levels in a short time frame.

### Goals
- Evaluate system response to sudden load spikes
- Fine-tune system recovery mechanisms
- Monitor critical backend resources (RAM, CPU, Network, Cloud resources)

```javascript
export const options = {
    stages: [
        { duration: "1m", target: 10 },    // Baseline
        { duration: "30s", target: 1000 }, // Spike
        { duration: "1m", target: 10 },    // Recovery
    ],
};
```

## 4. Soak Testing

Soak testing (also known as endurance testing) evaluates system performance over extended periods under sustained load.

### Goals
- Monitor performance degradation over time
- Evaluate resource consumption patterns
- Verify system stability during extended operations

```javascript
export const options = {
    stages: [
        { duration: "5m", target: 100 },  // Ramp up
        { duration: "4h", target: 100 },  // Sustained load
        { duration: "5m", target: 0 },    // Ramp down
    ],
};
```

## 5. Breakpoint Testing

Breakpoint testing identifies system limits by gradually increasing load to extreme levels. The test can be terminated either through predefined thresholds or manual intervention.

### Key Features
- Uses ramping-arrival-rate for consistent load increase
- Continues even after system degradation begins
- Helps identify true system capacity

```javascript
export const options = {
    executor: 'ramping-arrival-rate',         // Ensures load increase despite system slowdown
    stages: [
        { duration: '2h', target: 20000 },    // Gradual ramp-up to extreme load
    ],
};
```

## 6. Stress Testing

Stress testing evaluates system performance under loads exceeding typical production levels. It follows a similar pattern to average-load testing but with higher intensity and longer durations.

### Characteristics
- Longer ramp-up periods proportional to load increase
- Extended duration at peak load
- Careful monitoring of system degradation

### Goals
- Identify performance degradation patterns
- Evaluate system stability under sustained high load
- Monitor resource consumption at elevated stress levels

```javascript
export const options = {
    stages: [
        { duration: '5m', target: 100 },  // Ramp-up
        { duration: '8h', target: 100 },  // Sustained high load
        { duration: '5m', target: 0 },    // Ramp-down
    ],
};
```