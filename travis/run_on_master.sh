#!/bin/bash
echo "deploying to production"
firebase deploy --token $FIREBASE_TOKEN --project hostingv2
