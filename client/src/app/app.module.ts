
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AuthModule } from './modules/auth.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CreateIncidentComponent } from './create-incident/create-incident.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';

import { IncidentsService } from './services/incidents.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminService } from './services/admin.service';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { IncidentDetailsComponent } from './incident-details/incident-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IncidentsComponent,
    NavbarComponent,
    NotFoundComponent,
    CreateIncidentComponent,
    LoginComponent,
    AdminComponent,
    AdminEditComponent,
    IncidentDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AuthModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'incidents/new', component: CreateIncidentComponent },
      { path: 'incidents', component: IncidentsComponent },
      { path: 'incident/:id', component: IncidentDetailsComponent },
      { path: 'admin/:id', component: AdminEditComponent, canActivate: [AuthGuardService] },
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService] },
      { path: 'login', component: LoginComponent },
      { path: '**', component: NotFoundComponent }
    ])
  ],
  providers: [
    IncidentsService,
    AuthService,
    AdminService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
