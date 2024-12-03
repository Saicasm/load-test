import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');

// Test configuration
export const options = {
  scenarios: {
    constant_load: {
      executor: 'constant-arrival-rate',
      rate: 100000,            // 100k RPS (iterations per second)
      timeUnit: '1s',          // 1 second
      duration: '30s',          // Test duration
      preAllocatedVUs: 10000,  // Initial pool of VUs
      maxVUs: 20000,          // Maximum pool of VUs if needed
    },
  },
  thresholds: {
    'errors': ['rate<0.01'],   // Error rate should be less than 1%
    'http_req_duration': ['p(95)<2000'], // 95% of requests should be below 2s
  },
};

// Default function that will be executed for each iteration
export default function() {
  const response = http.get(`${__ENV.TEST_URL}`);
  
  // Custom check function which displays as a part of report at the end of the script
  const success = check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 2000ms': (r) => r.timings.duration < 2000,
  });
  
  // Record errors
  errorRate.add(!success);
  
  // Optional sleep to prevent overwhelming the system
  // Adjust or remove based on your needs
  sleep(0.1);
}

// Optional lifecycle hooks
export function setup() {
  // Setup code (runs once at the beginning)
  console.log('Starting load test with 100k RPS');
}

// export function handleSummary(data) {
//   return {
//     'stdout': JSON.stringify(data, null, 2),
//     'summary.json': JSON.stringify(data),
//   };
// }