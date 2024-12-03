# Load Testing with k6 and Log Processing

This project provides a setup to perform load testing using k6 and process the test results into a CSV format. The workflow is automated using a `Makefile`.

## Prerequisites
- k6 installed on your machine
- Python 3 installed, with any necessary libraries for `process.py`

## Project Structure
```
.
├── Makefile            # Automates the workflow
├── script.js           # k6 test script
├── process.py          # Script to process test_results.log into CSV
├── output/            # Directory for logs and CSV output (created during execution)
│   ├── test_results.log  # Raw k6 output
│   └── results.csv       # Processed CSV file
└── README.md          # Documentation
```

## Makefile Explanation

### Targets

1. `all`: Runs the full workflow: cleans the output directory, runs the k6 test, and processes the log to generate a CSV.
   ```bash
   make all
   ```

2. `clean`: Cleans the `output` directory by deleting it and recreating it.
   ```bash
   make clean
   ```

3. `test`: Runs the k6 load test using `script.js` and logs the output to `test_results.log`. The test uses the `TEST_URL` environment variable as the target URL.
   ```bash
   make test
   ```

4. `process`: Processes the `test_results.log` using `process.py` to generate `results.csv`.
   ```bash
   make process
   ```

### Environment Variables
- `TEST_URL`: URL to be tested. Defaults to `https://test.k6.io`.

To override:
```bash
make all TEST_URL=https://mycustomurl.com
```

## Workflow

1. **Set Up Environment**
   - Ensure `k6` and `Python` are installed
   - Confirm `script.js` and `process.py` are in the project root

2. **Run the Workflow**
   Use the `all` target to clean, test, and process:
   ```bash
   make all
   ```

3. **Custom Test URL**
   Specify a custom test URL:
   ```bash
   make all TEST_URL=https://example.com
   ```

4. **View Output**
   After the workflow:
   - Raw logs: `output/test_results.log`
   - Processed CSV: `output/results.csv`

## Scripts

### script.js
This is your k6 test script. Ensure it references `TEST_URL` using `__ENV.TEST_URL`:

```javascript
import http from 'k6/http';

  const url = `${__ENV.TEST_URL}`;
  const res = http.get(url);
```

### process.py
A Python script that processes `test_results.log` and extracts relevant data into `results.csv`. Customize it to fit your log structure.