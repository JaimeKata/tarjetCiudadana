import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { UserService } from 'src/app/services/user.service';
import { WalletIDService} from 'src/app/services/walletid.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { EventoComponent } from './pages/evento/evento.component';
import { ControladorComponent } from './pages/controlador/controlador.component';
import { AccesosComponent } from './pages/accesos/accesos.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { FormEventoComponent } from './pages/form-evento/form-evento.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HomeAdminComponent,
    EventoComponent,
    ControladorComponent,
    AccesosComponent,
    FormularioComponent,
    BusquedaComponent,
    FormEventoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ZXingScannerModule
  ],
  providers: [UserService, WalletIDService],
  bootstrap: [AppComponent]
})
export class AppModule { }
