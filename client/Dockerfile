FROM node:12.18.1
WORKDIR /user/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --force
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
