FROM node:alpine as build
# Define build arguments for environment variables
ARG VITE_API_URL

# Set environment variables during the build process
ENV VITE_API_URL=$VITE_API_URL

COPY ./package.json package.json
COPY ./yarn.lock yarn.lock
RUN yarn install
ADD . .
RUN yarn build

FROM nginx
RUN rm /usr/share/nginx/html/index.html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /dist /usr/share/nginx/html

