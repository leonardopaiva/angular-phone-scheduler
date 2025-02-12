# angular-phone-scheduler

This is a demonstration application for a basic phone scheduling system built with Angular.

Users can create new contacts, edit existing ones, mark them as favorites, disable them, and view a list of contacts.

Some requests in the application are made solely for demonstration purposes, as there is no back-end. When an error is received, the app returns mocked data.

A live preview link will be available soon.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```
```bash
ng build --configuration production
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

To test local: 

```bash
http-server-spa dist/agenda-app/browser
```

install http-server-spa if you dont have it
```bash
npm install -g http-server-spa 
```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```
```bash
npx compodoc -p tsconfig.app.json -s
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Compodoc Documentation

Install it first 
```bash
npm install --save-dev @compodoc/compodoc
```
Check the tsconfig.app.json file and modify the include section as described in the commented instructions. Then, run the command to generate the documentation folder.
```bash
npx compodoc -p tsconfig.app.json -s
```
Run to serve the documentation on localhost:
```bash
http-server-spa documentation
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
