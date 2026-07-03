import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./features/auth/forgot-password/forgot-password').then((m) => m.ForgotPassword),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'members',
    loadComponent: () =>
      import('./features/members/member-list/member-list').then((m) => m.MemberList),
  },
  {
    path: 'members',
    loadComponent: () =>
      import('./features/members/member-list/member-list').then((m) => m.MemberList),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
