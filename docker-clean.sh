#!/bin/bash
docker kill $(docker ps -q)
sleep 0.2
docker rm $(docker ps -a -q -f)
sleep 0.2
docker rmi $(docker images -q) -f