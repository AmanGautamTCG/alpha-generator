# pull the Node.js Docker image
FROM node:alpine

# create the directory inside the container
WORKDIR /usr/src/app

# copy the package.json files from local machine to the workdir in container
COPY package*.json ./

# run npm install in our local machine
RUN npm install

# copy the generated modules and all other files to the container
COPY . .

ENV PORT=5000
# our app is running on port 5000 within the container, so need to expose it
EXPOSE 5000

#CMD ["run build_dev"]

#ENTRYPOINT ["npm"]

# the command that starts our app
CMD ["npm", "start"]
