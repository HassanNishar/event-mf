# 🧩 Event Micro Frontends (event-mf)

A micro frontend architecture in Angular using [@angular-architects/module-federation](https://www.npmjs.com/package/@angular-architects/module-federation).  
This project includes:
- **Host application:** `event-shell`
- **Remote applications:** `event-remote1`, `event-remote2`, ...

---

## 🗂️ Project Structure

event-mf/ ├── node_modules/ ├── projects/ │ ├── event-shell/ │ │ ├── src/ │ │ │ ├── app/ │ │ │ │ ├── event-child/ │ │ │ │ │ ├── event-child-routing.module.ts │ │ │ │ │ ├── event-child.component.ts/html/css/spec.ts │ │ │ │ │ └── event-child.module.ts │ │ │ │ ├── shared/ │ │ │ │ │ └── ProjectInfo.ts │ │ │ │ ├── app.component.ts/html/css/spec.ts │ │ │ │ ├── app.module.ts │ │ │ │ ├── app.routing.module.ts │ │ │ │ └── app.routes.server.ts │ │ │ ├── environments/ │ │ │ ├── assets/ │ │ │ ├── main.ts │ │ │ ├── bootstrap.ts │ │ │ ├── styles.css │ │ │ └── index.html │ │ ├── webpack.config.js │ └── event-remote1/ │ └── event-remote2/ ├── angular.json ├── package.json ├── tsconfig.json └── README.md


---

## 🛠️ Commands Used to Create the Setup

```bash
npx @angular/cli new event-mf --create-application=false
cd event-mf

ng generate application event-shell --routing --style=css --no-standalone
ng generate application event-remote1 --routing --style=css --no-standalone

npm install @angular-architects/module-federation --save-dev

ng add @angular-architects/module-federation --project event-shell --type host
ng add @angular-architects/module-federation --project event-remote1 --type remote --host event-shell

# Add lazy module in remote
cd projects/event-remote1/src/app/
ng generate module event-child --route event-child --module app.module

```

# Cleanup (Required for Micro-Frontend Only)
In angular.json for each app, remove:

outputPath

ssr

In tsconfig.app.json, remove:

src/main.server.ts

src/server.ts

# Serve Apps (Dev Mode)
```bash
ng serve event-shell --configuration development
ng serve event-remote1 --configuration development
```

# Build for Production
```bash
ng build event-shell --configuration production
ng build event-remote1 --configuration production

```

# Add a New Remote (event-remote2)
```bash
ng generate application event-remote2 --routing --style=css --no-standalone
ng add @angular-architects/module-federation --project event-remote2 --type remote --host event-shell
```
Port: 5222

    # Create a lazy-loaded route inside event-remote2:
```bash
cd projects/event-remote2/src/app/
ng generate module event-child --route event-child --module app.module
```
    # Then, repeat the cleanup steps (remove ssr, server.ts, etc.).
```bash
ng serve event-remote2 --configuration development
```

# Environment Setup
Inside angular.json > configurations.production of event-remote2:
```json
"fileReplacements": [
  {
    "replace": "projects/event-remote2/src/environments/environment.ts",
    "with": "projects/event-remote2/src/environments/environment.prod.ts"
  }
]
```

# Link Remote to Host
    # projects/event-remote2/webpack.config.js
```js
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'event-remote2',
  remotes: {
    event_shell: 'http://localhost:5220/remoteEntry.js', // Dev
  },
  exposes: {
    './Module': './projects/event-remote2/src/app/event-child/event-child.module.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
```

    # projects/event-shell/webpack.config.js
```js
remotes: {
  eventRemote2: 'http://localhost:5222/remoteEntry.js'
}
```

# Host App Environment Configuration
    # projects/event-shell/src/environments/environment.ts
```ts
remoteEntries: {
  eventremote2: 'http://localhost:5222/remoteEntry.js',
}
```

    # environment.prod.ts
```ts
remoteEntries: {
  eventremote2: 'http://192.168.29.189:5422/remoteEntry.js',
}
```

# Add Route in event-shell to Load Remote
    # app.routes.ts
```ts
{
  path: 'event-remote2',
  loadChildren: () =>
    loadRemoteModule({
      type: 'module',
      remoteEntry: environment.remoteEntries.eventremote2,
      exposedModule: './Module',
    }).then((m) => m.EventChildModule),
},
```

# Share Code from Host (event-shell) to Remotes
    # Create Shared File
    # Path: projects/event-shell/src/app/shared/ProjectInfo.ts
```ts
export function DeveloperInfo(): any {
  return {
    Name: "Nizar",
    Role: "Software Developer"
  };
}
```

    # Expose it in webpack.config.js (event-shell)
```js
exposes: {
  './DevInfo': './projects/event-shell/src/app/shared/ProjectInfo.ts',
}
```

    # Declare Module in Remote App
    # Create: projects/event-remote2/src/decl.d.ts
```ts
declare module 'event_shell/DevInfo' {
  export function DeveloperInfo(): any;
}
```

    # Update tsconfig.app.json (event-remote2)
```json
"files": [
  "src/main.ts",
  "src/decl.d.ts"
]
```

    # Import in Remote App
```ts
const Devinfo = await import('event_shell/DevInfo');
this.Info = Devinfo.DeveloperInfo();
```

# NPM Scripts (Add to package.json)
```json
"scripts": {
  "start:shell": "cross-env NODE_ENV=development ng serve event-shell --configuration development",
  "start:remote1": "cross-env NODE_ENV=development ng serve event-remote1 --configuration development",
  "start:remote2": "cross-env NODE_ENV=development ng serve event-remote2 --configuration development",

  "build:shell": "cross-env NODE_ENV=production ng build event-shell --configuration production",
  "build:remote1": "cross-env NODE_ENV=production ng build event-remote1 --configuration production",
  "build:remote2": "cross-env NODE_ENV=production ng build event-remote2 --configuration production"
}
```

# Run the Applications
    # Start Host App
```bash
npm run start:shell
```

    # Start Remotes
```bash
npm run start:remote1
npm run start:remote2
```