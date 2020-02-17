#!/bin/bash
sudo cp ./e2.ui.data.tar.bz2 /var/www/html
cd /var/www/html
sudo tar -xvf e2.ui.data.tar.bz2
sudo rm e2.ui.data.tar.bz2
