import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

export const routes: Routes = [
    {
        path: 'event-remote1', // <== localhost:5220/event-remote1
        loadChildren: () =>
          loadRemoteModule({
            type: 'module',
            remoteEntry: environment.remoteEntries.eventremote1,
            exposedModule: './Module',
          }).then((m) => m.EventChildModule),
      },
      {
        path: 'event-remote2', // <== localhost:5220/event-remote2
        loadChildren: () =>
          loadRemoteModule({
            type: 'module',
            remoteEntry: environment.remoteEntries.eventremote2,
            exposedModule: './Module',
          }).then((m) => m.EventChildModule),
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
        component: AppComponent
      }
];
