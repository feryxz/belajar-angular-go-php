import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Login2Component } from './login2/login2.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guards';

const routes: Routes = [
  {
    path: 'login',
    component: Login2Component,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
        canActivate: [AuthGuard]
      },
      {
        path: 'dasboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'page2',
        component: Page2Component,
        canActivate: [AuthGuard]
      }, {
        path: 'contoh',
        loadChildren: () => import('./contoh/contoh.module').then(m => m.ContohModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'component',
        loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule),
        canActivate: [AuthGuard]
      },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
