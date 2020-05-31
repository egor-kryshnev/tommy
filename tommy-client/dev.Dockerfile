FROM node:13-alpine as build
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .

# Stage 2 - serve static files
FROM nginx:alpine
COPY --from=build /usr/src/app/dist/tommy /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200