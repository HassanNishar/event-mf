import { loadRemoteModule } from "@angular-architects/module-federation";
import { Injector } from "@angular/core";
import { Router } from '@angular/router';

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function testing(): string {
  return "Getting from Shell"
}

export function loadRemoteModuleWithErrorHandler(injector: Injector, config: Parameters<typeof loadRemoteModule>[0], exposedModuleExport: string) {
  return () =>
    loadRemoteModule(config)
      .then((m) => m[exposedModuleExport])
      .catch((err) => {
        console.error('Failed to load remote module:', err);
        const router = injector.get(Router);
        router.navigate(['/undermaintenace']);
        return new Promise(() => {});
      });
}