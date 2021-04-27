#!/usr/bin/env bash

script_path='./scripts/shrink-pr-pdfs/'

FILES=$(curl -s -X GET -G "$1" | jq -r '.[] | .filename' | grep "\.pdf$")
if [ -n "$FILES" ]; then
  IFS=$'\n'
  for file in $FILES; do
    if grep -q "$file" "${script_path}/shrank-pdfs";then
      echo "already shrank '$file'"
    else
      echo "shrinking '$file'..."
      tmpfile=$(mktemp)
      "${script_path}/shrinkpdf.sh" "$file" "${tmpfile}"
      mv "${tmpfile}" "${file}"
      echo "${file}" >> "${script_path}/shrank-pdfs"
      echo "shrank '$file'"
    fi
  done
else
  echo "no pdf files changed!"
fi
