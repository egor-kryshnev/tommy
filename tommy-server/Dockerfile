FROM node:13-alpine
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent
COPY . .
EXPOSE 80
RUN npm run build
CMD npm start