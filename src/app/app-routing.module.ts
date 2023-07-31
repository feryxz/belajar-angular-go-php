import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dasboard',
        pathMatch: 'full'
      },
      {
        path: 'dasboard',
        component: DashboardComponent,
      },
      {
        path: 'page2',
        component: Page2Component
      }, {
        path: 'contoh',
        loadChildren: () => import('./contoh/contoh.module').then(m => m.ContohModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)
      },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
