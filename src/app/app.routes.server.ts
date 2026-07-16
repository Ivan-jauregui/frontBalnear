import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'balneario/:id/imagen',
    renderMode: RenderMode.Client 
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
