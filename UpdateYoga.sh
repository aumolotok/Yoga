#!/bin/sh

sudo docker stop $(docker ps -a -q) && sudo docker rm $(docker ps -a -q) && sudo git pull && sudo docker build . -t yogasubscriber && docker run yogasubscriber