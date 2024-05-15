import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'employee', loadChildren: () => import('./pages/employee/employee.module').then(m => m.EmployeeModule) },
  { path: 'breakfast', loadChildren: () => import('./pages/breakfast/breakfast.module').then(m => m.BreakfastModule) },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
