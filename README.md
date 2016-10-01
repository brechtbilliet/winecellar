# winecellar
This is the repository of an angular2 course written by Brecht Billiet.
You can check the course at http://workshop.brecht.io
The backend of this application is available on https://github.com/brechtbilliet/WineCellarBackend

### make an account at the wine.com api and get an api key
https://api.wine.com/signup

### demo
http://winecellar.surge.sh

### Install

```sh
git clone git@github.com/brechtbilliet/winecellar.git
cd winecellar
npm install
npm start --apikey=<yourapikeyforwine.com> --backendenv=http://localhost:3000/api
```

### Build for production

```sh
npm run build --apikey=<yourapikeyforwine.com> --backendenv=http://localhost:3000/api
```

### Deploy with surge

```sh
npm run deploy --apikey=<yourapikeyforwine.com> --backendenv=http://localhost:3000/api
```

### Technology stack

- [x] Angular2
- [x] Webpack
- [x] Typescript
- [x] Rxjs
- [x] @ngrx/store
- [x] redux architecture

### Features

- [x] Build an angular2 application with webpack
- [x] fully tested with Jasmine
- [x] sass support
- [x] Typescript support
- [x] ES6 modules support
- [x] Wallaby.js support
- [x] Optimized build package
- [x] Minimal and straightforward setup
- [x] Watches code and refreshes browser with latest changes automatically