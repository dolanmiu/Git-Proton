[![Chat on Gitter][gitter-image]][gitter-url]
[![dependencies Status][daviddm-image]][daviddm-url]
[![Build Status][travis-image]][travis-url]
[![Greenkeeper badge][greenkeeper-image]][greenkeeper-url]
[![code style: prettier][prettier-image]][prettier-url]

# GitProton

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Development

For MacOS, you need `libgcrypt` for `nodegit` to install, https://github.com/nodegit/nodegit/issues/1156:

```bash
$ brew install libgcrypt
```

## Quirks

`webpack-cli` is needed for `npm run build.electron.after` to work, as webpack migrated their CLI to that package.

---

Made with 💖

[gitter-image]: https://badges.gitter.im/dolanmiu/awesome-alexa.svg
[gitter-url]: https://gitter.im/awesome-alexa/Lobby
[travis-image]: https://travis-ci.org/dolanmiu/Git-Proton.svg?branch=master
[travis-url]: https://travis-ci.org/dolanmiu/Git-Proton
[daviddm-image]: https://david-dm.org/dolanmiu/Git-Proton/status.svg
[daviddm-url]: https://david-dm.org/dolanmiu/Git-Proton
[greenkeeper-image]: https://badges.greenkeeper.io/dolanmiu/Git-Proton.svg
[greenkeeper-url]: https://greenkeeper.io/
[prettier-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[prettier-url]: https://github.com/prettier/prettier
