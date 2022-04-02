# Build environment
FROM node:latest
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm i --silent
RUN npm i react-scripts@5.0.0 -g --silent
COPY . .
RUN mv ./src/prod-settings.js ./src/settings.js
RUN npm run build

# Deploy
FROM nginx:latest
COPY --from=0 /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80/tcp
EXPOSE 443/tcp
CMD ["nginx", "-g", "daemon off;"]
