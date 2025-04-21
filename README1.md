1. Project Structure

event-mf/
│
├── node_modules/
├── projects/
│   ├── event-shell/              # Host application
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── event-child/           # Lazy-loaded child module
│   │   │   │   │   ├── event-child-routing.module.ts
│   │   │   │   │   ├── event-child.component.ts/html/css/spec.ts
│   │   │   │   │   └── event-child.module.ts
│   │   │   │   ├── app.component.ts/html/css/spec.ts
│   │   │   │   ├── app.module.ts
│   │   │   │   ├── app.module.server.ts
│   │   │   │   ├── app.routing.module.ts
│   │   │   │   └── app.routes.server.ts
│   │   │   ├── environments/
│   │   │   │   ├── environment.ts
│   │   │   │   └── environment.prod.ts
│   │   │   ├── assets/
│   │   │   ├── index.html
│   │   │   ├── main.ts
│   │   │   ├── main.server.ts
│   │   │   ├── bootstrap.ts
│   │   │   ├── server.ts
│   │   │   └── styles.css
│   │   ├── tsconfig.app.json
│   │   ├── tsconfig.spec.json
│   │   ├── webpack.config.js
│   │   └── webpack.prod.config.js
│   │
│   └── event-remote1/            # Remote application
│       ├── src/
│       │   ├── app/
│       │   │   ├── app.component.ts/html/css/spec.ts
│       │   │   ├── app.module.ts
│       │   │   ├── app.module.server.ts
│       │   │   ├── app.routing.module.ts
│       │   │   └── app.routes.server.ts
│       │   ├── environments/
│       │   │   ├── environment.ts
│       │   │   └── environment.prod.ts
│       │   ├── assets/
│       │   ├── index.html
│       │   ├── main.ts
│       │   ├── main.server.ts
│       │   ├── bootstrap.ts
│       │   ├── server.ts
│       │   └── styles.css
│       ├── public/               # Static files like favicon
│       │   └── favicon.ico
│       ├── tsconfig.app.json
│       ├── tsconfig.spec.json
│       ├── webpack.config.js
│       └── webpack.prod.config.js
│
├── .editorconfig
├── .gitignore
├── angular.json                 # Angular workspace config
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md

2. cmd used to create this app

npx @angular/cli new event-mf --create-application=false
cd event-mf
ng generate application event-shell --routing --style=css --no-standalone
ng generate application event-remote1 --routing --style=css --no-standalone
npm install @angular-architects/module-federation --save-dev
ng add @angular-architects/module-federation --project event-shell --type host
ng add @angular-architects/module-federation --project event-remote1 --type remote --host event-shell
### navigate to -> event-remote1/src/app(path)
ng generate module event-child --route event-child --module app.module
ng serve event-shell --configuration development

### Remove
outputMode,
ssr
from angular.json

src/main.server.ts
src/server.ts
from files in tsconfig.app.json (shell and remotes)

ng serve event-remote1 --configuration development

### To build app
ng build event-shell --configuration production
ng build event-remote1 --configuration production



3. To Create new Remote app

## Creating new remote
```bash
ng generate application event-remote2 --routing --style=css --no-standalone
ng add @angular-architects/module-federation --project event-remote2 --type remote --host event-shell
```
Enter Port 5222
### open terminal in -> projects/event-remote2/src/app/
```bash
cd projects/event-remote2/src/app/
ng generate module event-child --route event-child --module app.module
```
### Remove
outputMode,
ssr
from angular.json

src/main.server.ts
src/server.ts
from files in tsconfig.app.json (shell and remotes)

```bash
ng serve event-remote2 --configuration development
```

## Environment setup
Create a Environtement for Dev and Prod

## Add this code in angular.json under production of event-remote2
```json
"fileReplacements": [
	 {
		 "replace": "projects/event-remote2/src/environments/environment.ts",
		 "with": "projects/event-remote2/src/environments/environment.prod.ts"
	 }
 ],
```

## To link remote to shell
```ts

//webpack.config(event-remote2)
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'event-remote2',

  remotes: {
    event_shell: 'http://localhost:5220/remoteEntry.js', //Dev
    // event_shell: 'http://192.168.29.189:5420/remoteEntry.js', // Prod
  },

  exposes: {
    './Module': './projects/event-remote2/src/app/event-child/event-child.module.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});

//webpack.config(event-shell)
// add in remotes:
"eventRemote2": "http://localhost:5222/remoteEntry.js",

```

## Add environment in event-shell
```ts
//environment.ts
//In remoteEntries: 
eventremote2: 'http://localhost:5222/remoteEntry.js',

//environment.prod.ts
//In remoteEntries: 
eventremote2: 'http://192.168.29.189:5422/remoteEntry.js',
```

## Add route in app.route.ts(event-shell)
```ts
{
    path: 'event-remote2', // <== localhost:5220/event-remote2
      loadChildren: () =>
        loadRemoteModule({
          type: 'module',
          remoteEntry: environment.remoteEntries.eventremote2,
          exposedModule: './Module',
        }).then((m) => m.EventChildModule),
},
```


4. To Create a Shared fuction in shell to Access accross remote

### Create a Shared ts file
Path -> src/app/shared
File Name: ProjectInfo.ts
Function Name: DeveloperInfo
```ts
export function DeveloperInfo(): any {
    const info = {
      Name: "Nizar",
      Role: "Software Developer"
    }
    return info
  }
``

Goto -> tsconfig.app.json(event-shell)
## include the file that you want to share
"src/app/shared/ProjectInfo.ts"

Goto -> webpack.config.js(event-shell)
## Add this in expose to expose this from shell
'./DevInfo': './projects/event-shell/src/app/shared/ProjectInfo.ts',

## Create new file in the (event-remote2) inside -> src/decl.d.ts

//decl.d.ts
declare module 'event_shell/DevInfo' {
    export function DeveloperInfo(): any;
  }


Goto -> tsconfig.app.json(event-remote2)
## Add this in files to access in the event-remote2
"files": [
    "src/main.ts",
    "src/decl.d.ts"
  ],

Goto -> webpack.config(event-remote2)
## Add this code to access shell
```ts
name: 'event-remote2',

  remotes: {
    event_shell: 'http://localhost:5220/remoteEntry.js', //Dev
    // event_shell: 'http://192.168.29.189:5420/remoteEntry.js', // Prod
  },
  ```

## To Get data from Shell
```ts
const Devinfo = await import('event_shell/DevInfo');
    this.Info = Devinfo.DeveloperInfo();
    ```

## Change the scripts in angular.json to run with Environment
 "start:shell": "cross-env NODE_ENV=development ng serve event-shell --configuration development"
 "start:remote1": "cross-env NODE_ENV=development ng serve event-remote1 --configuration development"

## Change the scripts in angular.json to build with Environment
 "build:shell": "cross-env NODE_ENV=production ng build event-shell --configuration production"
 "build:remote1": "cross-env NODE_ENV=production ng build event-remote1 --configuration production"

## After Change Script Run this comment in root to run the Application
  ## To start shell
  ```bash
  npm run start:shell
  ```

    ## To start remote
  ```bash
  npm run start:remote1
  ```
