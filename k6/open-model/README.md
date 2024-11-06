# Open Method Testing

In k6, **open model testing** allows you to evaluate how a system handles incoming requests at a constant or gradually changing rate, independently of its response time. This is particularly useful for testing scenarios that simulate real-world traffic patterns, where requests arrive at a steady or gradually changing pace rather than in response to the system's capacity to handle them. Two primary executors are used in open model testing:


```bash
k6 run -e TEST_URL=http://localhost:3000/ script.js
```
### 1. **Constant-Arrival-Rate Executor**
The `constant-arrival-rate` executor is designed to send requests at a fixed rate, independent of the system’s ability to respond. This simulates a consistent load regardless of response delays, enabling a reliable measure of how well the system maintains its performance under a specific load rate.

- **Usage**: The `constant-arrival-rate` executor begins a defined number of iterations over a period. Each iteration is slightly offset, ensuring that they are distributed evenly but not starting exactly at the same time.
- **Configuration Options**:
    - **duration**: Defines how long the test runs.
    - **rate**: Sets the iterations per `timeUnit` (e.g., every second).
    - **timeUnit**: Interval between iteration starts, e.g., `1s`.
    - **preAllocatedVUs**: Number of VUs (Virtual Users) available before starting.
    - **maxVUs**: Maximum number of VUs that can be spun up to sustain the defined rate.

Example setup:
```javascript
export const options = {
    discardResponseBodies: true,
    scenarios: {
        contacts: {
            executor: 'constant-arrival-rate',
            duration: '30s',
            rate: 30,
            timeUnit: '1s',
            preAllocatedVUs: 2,
            maxVUs: 50,
        },
    },
};
```

Here, **30 iterations per second** are started for 30 seconds. The iterations start approximately every 100 milliseconds (1/10 of a second).

### 2. **Ramping-Arrival-Rate Executor**
The `ramping-arrival-rate` executor sends requests at a gradually changing rate, useful for tests that simulate traffic spikes or dips.

- **Usage**: It includes stages to ramp up or down the rate, imitating real-world usage where traffic doesn’t stay constant. You can set the starting rate, target rate, and ramping stages to shape the load profile.
- **Configuration Options**:
    - **startRate**: Initial rate of iterations per `timeUnit`.
    - **timeUnit**: Interval in which the iterations start, e.g., `1m`.
    - **preAllocatedVUs**: Number of pre-allocated VUs.
    - **stages**: Array defining how the rate changes over time, with each stage setting a target rate and duration.

Example setup:
```javascript
export const options = {
    discardResponseBodies: true,
    scenarios: {
        contacts: {
            executor: 'ramping-arrival-rate',
            startRate: 300,
            timeUnit: '1m',
            preAllocatedVUs: 50,
            stages: [
                { target: 300, duration: '1m' },
                { target: 600, duration: '2m' },
                { target: 600, duration: '4m' },
                { target: 60, duration: '2m' },
            ],
        },
    },
};

```

This configuration ramps up from **300 to 600 iterations per minute** over two minutes, holds that rate, then ramps down gradually. This provides a comprehensive view of how the system handles varying load intensities.


#### Key Differences

- **Constant Arrival Rate**:

  - Maintains a steady load throughout the test
  - Useful for consistent load testing scenarios
  - Best for testing system behavior under stable conditions


- **Ramping Arrival Rate**:

  - Provides variable load patterns
  - Useful for testing system scalability
  - Helps identify performance thresholds
  - Better simulates real-world traffic patterns
