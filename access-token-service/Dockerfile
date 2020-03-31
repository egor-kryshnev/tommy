FROM node:13-alpine AS build
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent
COPY . .
RUN npm run build

FROM node:13-alpine
WORKDIR /usr/src/app
ENV NODE_ENV production
COPY --from=build ./usr/src/app/dist ./dist
COPY --from=build ./usr/src/app/node_modules ./node_modules
COPY --from=build ./usr/src/app/package.json ./
CMD npm start