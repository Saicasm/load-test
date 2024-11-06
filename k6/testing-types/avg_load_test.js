import http from 'k6/http';
import { sleep } from 'k6';


export const options = {
    stages: [
        { duration: '5m', target: 100 },  // Ramp-up from 1 to 100 users
        { duration: '30m', target: 100 }, // Maintain 100 users
        { duration: '5m', target: 0 },    // Ramp-down to 0 users
    ],
};

export default () => {
    const urlRes = http.get(${__ENV.TEST_URL});
    sleep(1);
    // Do some processing with response if needed

};