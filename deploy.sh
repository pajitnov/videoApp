#!/bin/bash
set -e
set -u
DB_USER=apajitnov
DB_PWD=lvlstudio4200
#$DB_PWD
echo "This uploads content of the folder to the local cloud and publishes to \n http://e2.lvlstudio.local  \n http://e2.lvlnetworks.com "
read DB_USER
#echo "Please enter your username"
#read -s DB_USER

#tar --exclude='./deploy.sh' --exclude='./node_modules' --exclude='./publish.sh' --exclude='./package.json' -jcvf e2.ui.data.tar.bz2 ./dist
cd ./dist
tar -jcvf e2.ui.data.tar.bz2 ./
scp ./e2.ui.data.tar.bz2 apajitnov@10.11.0.168:
scp ./publish.sh apajitnov@10.11.0.168:
ssh apajitnov@10.11.0.168 'bash -s' < publish.sh
