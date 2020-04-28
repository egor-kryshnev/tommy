# Stage 2 build files from image
FROM node:13-alpine as build
WORKDIR /usr/src/app
COPY --from=tommy-client /usr/src/app /usr/src/app
RUN cd /usr/src/app
RUN npm run build:prod

# Stage 3 - serve static files
FROM nginx:alpine
COPY --from=build /usr/src/app/dist/tommy /usr/share/nginx/html
COPY --from=build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200
