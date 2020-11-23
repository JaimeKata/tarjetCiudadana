import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { UserLoginGuard } from './guards/user-login.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home-admin', component: HomeAdminComponent},
  { path: 'home', component: HomeComponent, canActivate: [UserLoginGuard] }, // bajo control de guard
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
