# BNP Add it up test excercise using React Webpack Typescript
> Test excercise with minimal starter and HMR.

* **[React](https://facebook.github.io/react/)** (16.x)
* **[Webpack](https://webpack.js.org/)** (4.x)
* **[Typescript](https://www.typescriptlang.org/)** (3.x)
* **[Hot Module Replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/)** using [React Hot Loader](https://github.com/gaearon/react-hot-loader) (4.x)
* [Babel](http://babeljs.io/) (7.x)
* [SASS](http://sass-lang.com/)
* [Jest](https://facebook.github.io/jest/) - Testing framework for React applications
* Production build script
* Image loading/minification using [Image Webpack Loader](https://github.com/tcoopman/image-webpack-loader)
* Typescript compiling using [Awesome Typescript Loader](https://github.com/s-panferov/awesome-typescript-loader) (5.x)
* Code quality (linting) for Typescript.

## Installation
1. Clone/download repo
2. `yarn install` (or `npm install` for npm)

## Usage ( You must perform following two steps for the project to run successfully!!)

**1: Compile Common UI library project**
**This project references comon library using relative path of the compiled common Library functions**
**hence its imporant to Compile the common LIB first !**
**see Readme.md in ../../common/readme.md**

**2: Compile and run .Net API Library**
**Before running UI project, you must also start the .Net core Web API server, so that the API is available !!**
**Simplest way to make API available is to open the  'WebApi\WebApi.sln' in Visual studio 2017**
**Then Compile and Run the project with 'CTRL+F5'**
**Once compiled the API will be available on http://localhost:56000**
**for more information on compilation and running tests on web api, please read BNPP-AddItUp-React\WebApi\README.txt**

**Development**

`yarn run start-dev`

* Build app continuously (HMR enabled)
* App served @ `http://localhost:8080`

**Production**

`yarn run start-prod`

* Build app once (HMR disabled)
* App served @ `http://localhost:3000`

---

**All commands**

| Command                | Description                                                              |
| ---------------------- | ------------------------------------------------------------------------ |
| `yarn run start-dev`   | Build app continuously (HMR enabled) and serve @ `http://localhost:8080` |
| `yarn run start-prod`  | Build app once (HMR disabled) and serve @ `http://localhost:3000`        |
| `yarn run build`       | Build app to `/dist/`                                                    |
| `yarn run test`        | Run tests  in Watch mode                                                 |
| `yarn run test:update` | Run tests and updates snapshots in watch mode                            |
| `yarn run lint`        | Run Typescript linter                                                    |
| `yarn run start`       | (alias of `yarn run start-dev`)                                          |

**Note**: replace `yarn` with `npm` if you use npm.

## See also
