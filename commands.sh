#!/bin/bash

# Install nvm via curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash

# OR via wget
# wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash

# Source nvm (zsh)
source ~/.zshrc

# OR Source nvm (bash, if using bash)
# source ~/.bashrc

# Check nvm is really working
nvm list

# Install latest LTS version of Node (as of November 11, 2022)
nvm install 16.18.1

# Alias this version as the nvm default
nvm alias default 16.18.1

# Check the version of Node to see if nvm actually set it
node -v

# You should see "16.18.1". If so, you've completed all code for this lesson! See you in lesson 3!