import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'createUser', component: CreateUserComponent },
  { path: 'updateUser/:userId', component: UpdateUserComponent },
  { path: 'displayAllUser', component: UserListComponent },
  { path: 'displayUser/:userId', component: UserListComponent },
  { path: 'removeUser/:userId', component: UserListComponent },
  { path: '*', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
