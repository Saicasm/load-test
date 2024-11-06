import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 3,          // Key for Smoke test: Keep between 2-5 VUs
  duration: '1m',   // Short duration or few iterations
};
export default () => {
  const urlRes = http.get(${__ENV.TEST_URL});
  sleep(1);
  // Do some processing with response if needed

};