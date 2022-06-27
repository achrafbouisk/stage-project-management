import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth.guard';
import { ProjectComponent } from './components/project/project.component';
import { TacheComponent } from './components/project/project-details/tache/tache.component';
import { MaterialComponent } from './components/project/project-details/material/material.component'
import { ProjectDetailsComponent } from './components/project/project-details/project-details.component';
import { EmployeeComponent } from './components/project/project-details/employee/employee.component';
import {DepartmentDetailsComponent} from './components/home/department-details/department-details.component'
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'departments', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'department/:id/projects', component: ProjectComponent, canActivate: [AuthGuard] },
  { path: 'department/:id/project/:id/taches', component: TacheComponent, canActivate: [AuthGuard] },
  { path: 'department/:id/project/:id/employees', component: EmployeeComponent, canActivate: [AuthGuard] },
  { path: 'department/:id/project/:id/materials', component: MaterialComponent, canActivate: [AuthGuard] },
  { path: 'department/:id/project/:id/details', component: ProjectDetailsComponent, canActivate: [AuthGuard] },
  { path: 'department/:id/details', component: DepartmentDetailsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
