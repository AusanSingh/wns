import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guard.guard';
import { Chart1Component, Chart2Component, Chart3Component } from './dashboard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: DashboardComponent,
    children: [
      { path: 'chart1', component: Chart1Component },
      { path: 'chart2', component: Chart2Component },
      { path: 'chart3', component: Chart3Component }
    ],
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: 'chart1', pathMatch: 'full', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
