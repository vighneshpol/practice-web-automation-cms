#!/bin/bash
TEMP_DIR="$1/.secrets/temp"
[ ! -d "$TEMP_DIR" ] && mkdir -p $TEMP_DIR
MACHINE_TOKEN=$(<$1/.secrets/machine-token)
RAW_PATH="$1/.secrets/temp/session-raw-$2"
FINAL_PATH="$1/.secrets/temp/session-$2"
if [ "$#" -gt "0" ]; then
  curl https://dashboard.pantheon.io/api/authorize/machine-token \
    -X POST -s \
    --data "{\"machine_token\": \"$MACHINE_TOKEN\", \"client\": \"terminus\"}" \
    --header "User-Agent: Terminus/1.0" \
    --header "Content-Type: application/json" \
    -vvv \
  > ${RAW_PATH}
  cat ${RAW_PATH} | jq '.session' | sed 's/\s//g' | sed 's/"//g' > ${FINAL_PATH}
  
fi