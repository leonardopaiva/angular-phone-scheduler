import { Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/layout.component').then(m => m.LayoutComponent),
    children: [
        {
          path: 'home',
          loadComponent: () => import('./views/home/home.component').then(m => m.HomeComponent),
        },
        {
            path: 'contacts',
            loadChildren: () =>
            import('./views/contacts/contacts.module').then(m => m.ContactsModule),
            canActivate: [AuthGuard] 
        },
        {
            path: 'about',
            loadChildren: () =>
            import('./views/about/about.module').then(m => m.AboutModule),
             
        },
        { path: '', redirectTo: 'contacts', pathMatch: 'full' },
        { path: '**', redirectTo: 'contacts' }
    ]
  }
];
