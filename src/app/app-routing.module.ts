import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { ControladorComponent } from './pages/controlador/controlador.component';
import { EventoComponent } from './pages/evento/evento.component';
import { AccesosComponent } from './pages/accesos/accesos.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { FormEventoComponent } from './pages/form-evento/form-evento.component';
import { UserLoginGuard } from './guards/user-login.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home-admin', component: HomeAdminComponent},
  { path: 'controlador', component: ControladorComponent},
  { path: 'evento', component: EventoComponent},
  { path: 'accesos', component: AccesosComponent},
  { path: 'formulario', component: FormularioComponent},
  { path: 'busqueda', component: BusquedaComponent},
  { path: 'form-evento', component: FormEventoComponent},
  { path: 'home', component: HomeComponent, canActivate: [UserLoginGuard] }, // bajo control de guard
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
