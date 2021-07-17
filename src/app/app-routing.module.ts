import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { UsersTableComponent } from './users-table/users-table.component';

const routes: Routes = [
  {
    path:'dynamic', component:UsersTableComponent
  },
  {
    path:'register', component:RegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
