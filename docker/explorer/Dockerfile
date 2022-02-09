FROM node:14
WORKDIR /application
COPY ../../build /application
RUN npm ci --only-production

ENV SOURCE=explorer
CMD node server.js