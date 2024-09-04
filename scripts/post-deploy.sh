#!/bin/bash
set -e

LOGFILE=/home/ec2-user/deploy.log

echo "Starting post-deploy script..." | tee -a $LOGFILE

echo "Changing directory to /home/ec2-user/Teaching-Platform/client..." | tee -a $LOGFILE
cd /home/ec2-user/Teaching-Platform/client

echo "Running npm run build..." | tee -a $LOGFILE
sudo npm run build

echo "Moving build files to ../server/client/build..." | tee -a $LOGFILE
sudo rm -rf ../server/client/build
sudo mv build/ ../server/client/

echo "Restarting PM2 processes..." | tee -a $LOGFILE

pm2 reload all
echo "Restarting Nginx..." | tee -a $LOGFILE
sudo systemctl restart nginx

echo "Post-deploy script completed successfully." | tee -a $LOGFILE