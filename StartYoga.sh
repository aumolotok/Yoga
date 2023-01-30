#!/bin/sh

sudo docker build . -t yogasubscriber && sudo docker run --name yoga  -d yogasubscriber 