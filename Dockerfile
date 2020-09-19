# Build environment
FROM node:latest
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm i --silent
RUN npm i react-scripts@3.4.3 -g --silent
COPY . .
RUN mv ./src/prod-settings.js ./src/settings.js
RUN npm run build

# Deploy
FROM nginx:latest
COPY --from=0 /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 3000 
CMD ["nginx", "-g", "daemon off;"]
