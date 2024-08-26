FROM node:20-alpine

COPY ./package.json package.json
COPY ./yarn.lock yarn.lock
RUN yarn
ADD . .
# RUN yarn test
RUN yarn build
ENV PORT=80
EXPOSE 80
CMD ["node", "dist/index.js"]