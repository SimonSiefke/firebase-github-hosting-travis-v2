#!/bin/bash
echo "deploying to staging and test lighthouse score"
firebase deploy --token $FIREBASE_TOKEN --project staging
npm run lh $STAGING_URL
exit 0
