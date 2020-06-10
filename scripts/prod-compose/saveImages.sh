#!/bin/bash
docker save $(docker ps --format "{{.Image}}" -a) -o tommyImages.tar