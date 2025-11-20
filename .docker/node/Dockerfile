# Base image
FROM node:22.15.0 as node

# install node-gyp
RUN npm install -g node-gyp

# install any packages
RUN apt-get update \
&& apt-get install bash \
&& apt-get install sudo \
&& apt-get install -y procps
