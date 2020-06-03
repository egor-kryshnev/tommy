#!/bin/bash
cd ../tommy-client
npm run build
cd ../dev-compose
docker-compose up --build -d
