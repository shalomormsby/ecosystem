#!/bin/bash

# Vercel Ignore Build Step Script
# Purpose: Cancel the build (Exit 0) if there are no changes in the current directory.
# Proceed with build (Exit 1) if there are changes.

# Get the latest commit hash ranges provided by Vercel, or default to HEAD^ HEAD
ref_start=${VERCEL_GIT_PREVIOUS_SHA:-HEAD^}
ref_end=${VERCEL_GIT_COMMIT_SHA:-HEAD}

echo "Checking for changes in apps/creative-powerup between $ref_start and $ref_end"

# git diff --quiet returns 0 if NO changes, 1 if changes found.
if git diff --quiet "$ref_start" "$ref_end" -- ./; then
  echo "No changes detected. Cancelling build (Exit 0)."
  exit 0
else
  echo "Changes detected. Proceeding with build (Exit 1)."
  exit 1
fi
