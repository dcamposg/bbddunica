import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { Http, HttpModule, BrowserXhr } from '@angular/http';
import { Adal4Service, Adal4HTTPService } from 'adal-angular4';

import { NgProgressModule, NgProgressBrowserXhr } from 'ngx-progressbar';

import { AppRoutes } from './app.routing';
import { AuthenticationGuard } from './common/guards/authentication-guard';
import * as c from './';
import { DataFilterCentroPipe } from './pipes/data-filter-centro.pipe';
import { DataFilterContactoPipe } from './pipes/data-filter-contacto.pipe';
import { DataFilterFiscalEntitiesPipe } from './pipes/data-filter-fiscalEntities.pipe';
import { DataTableModule } from 'angular2-datatable';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AgmCoreModule } from '@agm/core';

import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';



@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    HttpModule,
    AppRoutes,
	DataTableModule,
	FormsModule,
	ChartsModule,
    HttpModule,
    NgProgressModule,
	AgmCoreModule.forRoot({
      apiKey: "AIzaSyBWOTxR1xlSvm6nqvaYjNi-WLMwGhwa1LA",
      libraries: ["places"]
    }),
    ReactiveFormsModule,
	MultiselectDropdownModule,
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
	DataFilterContactoPipe,
	DataFilterFiscalEntitiesPipe
  ],
  providers: [
    Adal4Service,
    {
        provide: Adal4HTTPService,
        useFactory: Adal4HTTPService.factory,
        deps: [Http, Adal4Service]
    },
    AuthenticationGuard,
	{ provide: BrowserXhr, useClass: NgProgressBrowserXhr }
  ],
  bootstrap: [c.AppComponent]
})
export class AppModule { }
