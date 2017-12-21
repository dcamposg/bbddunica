import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { Http, HttpModule } from '@angular/http';
import { Adal4Service, Adal4HTTPService } from 'adal-angular4';

import { AppRoutes } from './app.routing';
import { AuthenticationGuard } from './common/guards/authentication-guard';
import * as c from './';
import { DataFilterCentroPipe } from './pipes/data-filter-centro.pipe';
import { DataFilterContactoPipe } from './pipes/data-filter-contacto.pipe';
import { DataTableModule } from 'angular2-datatable';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';



@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    HttpModule,
    AppRoutes,
	DataTableModule,
	FormsModule,
	ChartsModule
  ],
  declarations: [
    c.AppComponent,
    c.MainComponent,
    c.LoginComponent,
    c.LogoutComponent,
    c.CentrosComponent,
    c.ContactosComponent,
    c.EntidadesFiscalesComponent,
	c.SeguridadComponent,
	c.DummyComponent,
	DataFilterCentroPipe,
	DataFilterContactoPipe
  ],
  providers: [
    Adal4Service,
    {
        provide: Adal4HTTPService,
        useFactory: Adal4HTTPService.factory,
        deps: [Http, Adal4Service]
    },
    AuthenticationGuard
  ],
  bootstrap: [c.AppComponent]
})
export class AppModule { }
