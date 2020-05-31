#Stage 1 - copy dir from local computer
FROM node:13-alpine as base
COPY ./app/server .

# Stage 2 - build files from image
FROM node:13-alpine AS build
WORKDIR /usr/src/app
COPY --from=base /usr/src/app /usr/src/app
RUN cd /usr/src/app
RUN npm run build

# Stage 3 - start
FROM node:13-alpine
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY --from=build ./usr/src/app/node_modules ./
COPY --from=build ./usr/src/app/dist ./dist
COPY --from=build ./usr/src/app/package.json ./
EXPOSE 80
CMD npm start