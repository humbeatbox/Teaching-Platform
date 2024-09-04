# Retail PlatForm

## Server-side

```
sudo npm install express dotenv bcrypt mongoose joi
```

how to use joi to validate the data

https://joi.dev/

implement the JWT work with passport package (passport-jwt, passport-local, passport)to create the stateless authentication

```
sudo npm install jsonwebtoken passport passport-jwt passport-local
```

add the ".env" in local folder
include the key
PASSPORT_SECRET=

REACTful API

```
sudo npm install cors
```

## Client-side

```
npx create-react-app client
```

```
sudo npm install react-router-dom
```

```
sudo npm install axios
```

use server to run the react
run the command in client director

```
npm run build
```

move to /Teaching-Platform/server/client directory

CI/CD
install AWS CodeDeploy

```
sudo yum update -y
sudo yum install ruby -y
sudo yum install wget -y
cd /home/ec2-user
wget https://aws-codedeploy-us-east-1.s3.us-east-1.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto
sudo service codedeploy-agent start
```

set up appspect.yml

set up correct IAM role and policy
