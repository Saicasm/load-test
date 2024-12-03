import http from 'k6/http';
import { sleep } from 'k6';


export const options = {
    executor: 'ramping-arrival-rate',         // Ensures load increase despite system slowdown
    stages: [
        { duration: '2h', target: 20000 },    // Gradual ramp-up to extreme load
    ],
};
// Add thresholds to automatically break it

export default () => {
    const urlRes = http.get(`${__ENV.TEST_URL}`);
    sleep(1);
    // Do some processing with response if needed

};