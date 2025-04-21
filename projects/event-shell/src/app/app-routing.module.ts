import { NgModule, Injector } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { UnderMaintenanceComponent } from './404/under-maintenance/under-maintenance.component';
import { loadRemoteModuleWithErrorHandler } from './shared/utils';

export function getRoutes(injector: Injector): Routes {
  return [
    {
      path: 'event-remote1',
      loadChildren: loadRemoteModuleWithErrorHandler(injector, {
        type: 'module',
        remoteEntry: environment.remoteEntries.eventremote1,
        exposedModule: './Module',
      }, 'EventChildModule'),
    },
    {
      path: 'event-remote2',
      loadChildren: loadRemoteModuleWithErrorHandler(injector, {
        type: 'module',
        remoteEntry: environment.remoteEntries.eventremote2,
        exposedModule: './Module',
      }, 'EventChildModule'),
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'event-remote1',
    },
    {
      path: 'undermaintenace',
      component: UnderMaintenanceComponent,
    },
  ];
}

@NgModule({
  imports: [RouterModule.forRoot([])],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private injector: Injector) {
    const router = this.injector.get(Router);
    const routes = getRoutes(this.injector);
    router.resetConfig(routes);
  }
}
