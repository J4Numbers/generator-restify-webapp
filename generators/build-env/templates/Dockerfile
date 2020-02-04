# Stage 1 - Compile repository
FROM nexus.nonprod.dwpcloud.uk:8082/library/node:12-alpine as compile
WORKDIR /usr/src/app
COPY ../../webapp/templates .
RUN npm set repository "http://nexus.nonprod.dwpcloud.uk/repository/npm-npmjs/" &&\
    npm install

# Stage 2 - Compile production dependencies
FROM nexus.nonprod.dwpcloud.uk:8082/library/node:12-alpine as install
WORKDIR /usr/src/app
COPY --from=compile /usr/src/app/package.json /usr/src/app/package-lock.json ./
RUN npm set repository "http://nexus.nonprod.dwpcloud.uk/repository/npm-npmjs/" &&\
    npm install --only=production

# Stage 3 - Make clean staging area
FROM nexus.nonprod.dwpcloud.uk:8082/library/node:12-alpine as stage
WORKDIR /usr/src/app
COPY --from=install /usr/src/app/node_modules/     node_modules/
COPY --from=compile /usr/src/app/config/           config/
COPY --from=compile /usr/src/app/src/              src/
COPY --from=compile /usr/src/app/package*.json     ./

# Stage 4 - Final copy
FROM nexus.nonprod.dwpcloud.uk:8082/library/node:12-alpine as deploy
WORKDIR /usr/src/app
COPY --from=stage /usr/src/app ./
EXPOSE 8080
CMD [ "node", "./src/app.js" ]
