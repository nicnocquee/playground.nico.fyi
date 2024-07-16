#!/bin/bash

URL="https://playground.nico.fyi/pgboss/api"
REQUESTS=100
CONCURRENT_REQUESTS=5
FAILURES=0

# Print header
printf "%-4s %-10s %-10s %-6s %-7s %s\n" "Req#" "Random#" "Duration" "Status" "Result" "Response"
echo "-------------------------------------------------------------------------"

send_request() {
  i=$1
  # Generate a random number between 1 and 1000000
  RANDOM_NUMBER=$((RANDOM % 1000000 + 1))
  
  # Prepare the JSON payload
  JSON_PAYLOAD="{\"task\": \"Create $RANDOM_NUMBER\"}"
  
  # Send the POST request and measure its duration
  START_TIME=$(date +%s.%N)
  RESPONSE=$(curl -s -w "\n%{http_code}" -X POST -H "Content-Type: application/json" -d "$JSON_PAYLOAD" "$URL")
  END_TIME=$(date +%s.%N)
  
  # Extract HTTP status code
  HTTP_STATUS=$(echo "$RESPONSE" | tail -n1)
  RESPONSE_BODY=$(echo "$RESPONSE" | sed '$d')
  
  # Calculate duration
  DURATION=$(echo "$END_TIME - $START_TIME" | bc)
  
  # Determine if the request was successful
  if [ "$HTTP_STATUS" -eq 200 ]; then
    RESULT="Success"
  else
    RESULT="Failure"
    ((FAILURES++))
  fi
  
  # Print the results in one line
  printf "%-4d %-10d %-10.4f %-6d %-7s %s\n" "$i" "$RANDOM_NUMBER" "$DURATION" "$HTTP_STATUS" "$RESULT" "$RESPONSE_BODY"
}

for ((i=1; i<=$REQUESTS; i+=$CONCURRENT_REQUESTS))
do
  for ((j=0; j<$CONCURRENT_REQUESTS; j++))
  do
    if [ $((i+j)) -le $REQUESTS ]; then
      send_request $((i+j)) &
    fi
  done
  wait
done

echo "-------------------------------------------------------------------------"
SUCCESSES=$((REQUESTS - FAILURES))
SUCCESS_RATE=$(echo "scale=2; $SUCCESSES * 100 / $REQUESTS" | bc)

echo "Summary:"
echo "Total requests: $REQUESTS"
echo "Successful requests: $SUCCESSES"
echo "Failed requests: $FAILURES"
echo "Success rate: $SUCCESS_RATE%"
