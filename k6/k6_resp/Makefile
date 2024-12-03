# Envs
TEST_URL ?= https://test.k6.io


# Variables
OUTPUT_DIR=output
LOG_FILE=$(OUTPUT_DIR)/test_results.log
CSV_FILE=$(OUTPUT_DIR)/results.csv

# Targets
.PHONY: all clean run test process

all: clean test process

# Clean the output directory
clean:
	@echo "Cleaning output directory..."
	@rm -rf $(OUTPUT_DIR)
	@mkdir -p $(OUTPUT_DIR)

# Run k6 test and log the output
test:
	@echo "Running k6 test..."
	k6 run -e TEST_URL=$(TEST_URL) script.js 2> $(LOG_FILE)
	@echo "Log file output at $(LOG_FILE)"

# Process the log file and generate CSV
process:
	@echo "Processing log file..."
	python process.py 
	@echo "CSV generated at $(CSV_FILE)"
