import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

export const routes: Routes = [
  // { path: '', redirectTo: '/', pathMatch: 'full' }
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
          pathMatch: 'full',
          redirectTo: 'event-remote1'
        },
        // {
        //   path: '',
        //   redirectTo: 'event-remote1',
        //   pathMatch: 'full',
        // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
