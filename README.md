# User Portal UI

This project is the interface to list and save user information

## For local development

```
git clone <remote url>
cd user-portal
npm install
npm start
```

## Build with Docker
To build the image
```
docker build -t user-portal:1.0 .
```
To list the images built
```
docker images
```
To create a container and run
```
docker run --name user-portal -p 3000:3000 -d user-portal:1.0
```

Note:
The API will be running in port 3000
Node version : 16.14.0 
