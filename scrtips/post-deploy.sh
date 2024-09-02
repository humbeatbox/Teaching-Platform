#!/bin/bash


cd /home/ec2-user/Teaching-Platform/client


sudo npm run build


sudo mv -f build/ ../server/client/build


sudo pm2 restart all


sudo systemctl restart nginx
