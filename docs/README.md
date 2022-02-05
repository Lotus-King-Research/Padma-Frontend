# padma-frontend

VueJS web frontend for https://padma.io

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

- install mkcert (use brew on macos)
- run `mkcert -install` from the repo folder
- run `mkcert localhost` from the repo folder

## Env variables
`VUE_APP_API_URL` - `https://api.padma.io`

This works on linux, mac, windows git bash. On windows powershell you would need to export the variable VUE_APP_API_URL=https://api.padma.io

### Compiles and hot-reloads for development
From the repo folder, do the following

```
yarn serve
```

### Compiles and minifies for production
Web:
```
yarn build
```

Production build folders - dist (for web)

### Docker build / deploy
To build - from repo folder

```
docker build -t padma-frontend .
```

Deploy (runs on https://127.0.0.1:8080)

```
docker run -it -p 8080:8080 --rm --name padma-frontend-vue-1 padma-frontend
```

### Docker dev 
To build the dev container (first case if running backend locally, second is if using staging api)
```
docker-compose -f ./docker-compose-dev-local.yml build
```
or

```
docker-compose -f ./docker-compose-dev-staging.yml build
```

Then run `docker-compose up` with the same yml file above i.e.
```
docker-compose -f ./docker-compose-dev-local.yml up
```

or
```
docker-compose -f ./docker-compose-dev-staging.yml up
```

After you do this, you can visit https://localhost:8002/ in browser to access the frontend


### Lints and fixes files
```
yarn lint
```

After this, run a production build to incorporate the new iconset

### Debugging production build

The following is a good thread
https://stackoverflow.com/questions/45485262/how-to-debug-electron-production-binaries#45487191

Debugtron works well, but is by ByteDance

