import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        { duration: "5m", target: 100 },  // Ramp up
        { duration: "4h", target: 100 },  // Sustained load
        { duration: "5m", target: 0 },    // Ramp down
    ],
};

export default () => {
    const urlRes = http.get(`${__ENV.TEST_URL}`);
    sleep(1);
    // Do some processing with response if needed

};