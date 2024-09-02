#!/bin/bash
set -e

LOGFILE=/home/ec2-user/deploy.log

echo "Starting post-deploy script..." | tee -a $LOGFILE

cd /home/ec2-user/Teaching-Platform/client


sudo npm run build


sudo mv -f build/ ../server/client/build


sudo pm2 restart all


sudo systemctl restart nginx

echo "Post-deploy script completed successfully." | tee -a $LOGFILE