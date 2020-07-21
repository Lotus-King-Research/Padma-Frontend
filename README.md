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
From the repo folder, do the following
```
yarn electron:serve
```

or

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

### Lints and fixes files
```
yarn lint
```
