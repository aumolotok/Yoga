#!/bin/sh

sudo git pull && sudo docker build . -t yogasubscriber && docker run yogasubscriber