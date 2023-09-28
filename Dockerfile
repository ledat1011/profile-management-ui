# Step 1: Build the Angular app in a node container
FROM node:16-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# Step 2: Serve the app using nginx
FROM nginx:alpine
COPY --from=build /usr/src/app/dist/profile-management-ui/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
