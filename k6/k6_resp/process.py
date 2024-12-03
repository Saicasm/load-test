import re
import pandas as pd

# Read the log file
with open('output/test_results.log', 'r') as f:
    lines = f.readlines()

# Extract CSV-like data from log lines
pattern = r'msg="([^"]+)"'
data = [re.search(pattern, line).group(1) for line in lines if 'msg=' in line]

# Split the CSV-like data into columns
columns = ['timestamp', 'url', 'method', 'status', 'response_time', 'body_size']
rows = [row.split(',') for row in data]

# Create a DataFrame and save it as a CSV
df = pd.DataFrame(rows, columns=columns)
df.to_csv('output/cleaned_results.csv', index=False)
