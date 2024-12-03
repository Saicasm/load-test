import http from 'k6/http';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',

      // How long the test lasts
      duration: '30s',

      // How many iterations per timeUnit
      rate: 30,

      // Start `rate` iterations per second
      timeUnit: '1ms',

      // Pre-allocate 100 VUs before starting the test
      preAllocatedVUs: 100,

      // Spin up a maximum of 500 VUs to sustain the defined
      // constant arrival rate.
      maxVUs: 500,
    },
  },
};

export default function () {
  http.get(`${__ENV.TEST_URL}`);
}