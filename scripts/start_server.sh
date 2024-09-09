#!/bin/bash

# sudo rm -rf ../server/client/build

# mv ../client/build  ../server/client/build

pm2 reload all


sudo systemctl start nginx