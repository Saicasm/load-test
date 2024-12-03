import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        { duration: "1m", target: 10 },    // Baseline
        { duration: "30s", target: 1000 }, // Spike
        { duration: "1m", target: 10 },    // Recovery
    ],
};
export default () => {
    const urlRes = http.get(`${__ENV.TEST_URL}`);
    sleep(1);
    // Do some processing with response if needed

};