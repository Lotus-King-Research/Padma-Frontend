# padma-frontend
VueJS web + electron frontend for http://padma.io

Electron allows cross platform (Mac, Windows, Linux) packaging of this frontend

Note - the instructions below use yarn but work just as well with npm

## Project setup
From the repo folder, do the following
```
yarn install
```

## Before serving for dev or building for production
```
. .env
```

This works on linux, mac, windows git bash. On windows powershell you would need to export the variable VUE_APP_API_URL=http://padma.io

### Compiles and hot-reloads for development
From the repo folder, do the following (for electron)
```
yarn electron:serve
```

or (for web)

```
yarn serve
```

### Compiles and minifies for production
Electron (same platform as you are using):
```
yarn electron:build
```

Electron (mac, windows, linux -- x32, x64)
```
yarn electron:buildall
```

Web:
```
yarn build
```

Production build folders - dist (for web), electron_dist (for electron)

### Docker build / deploy
To build - from repo folder

```
docker build -t padma-frontend .
```

Deploy (runs on 127.0.0.1:8080)

```
docker run -it -p 8080:8080 --rm --name padma-frontend-vue-1 padma-frontend
```


### Lints and fixes files
```
yarn lint
```

### Update app icon
Update the file public/img/icons/padma.png

Then run the following command to generate the required iconset
```
yarn electron:generate-icons
```

After this, run a production build to incorporate the new iconset

### Debugging production build

The following is a good thread
https://stackoverflow.com/questions/45485262/how-to-debug-electron-production-binaries#45487191

Debugtron works well, but is by ByteDance

