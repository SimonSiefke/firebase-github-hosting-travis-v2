#!/bin/bash
echo "deploying to staging and test lighthouse score"
firebase deploy --token $FIREBASE_TOKEN --project staging
npm run lh --score=96 --runner=wpt $STAGING_URL
