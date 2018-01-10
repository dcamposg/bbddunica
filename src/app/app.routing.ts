import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AuthenticationGuard } from './common/guards/authentication-guard';
import { MainComponent, LoginComponent, LogoutComponent, CentrosComponent, ContactosComponent, EntidadesFiscalesComponent, SeguridadComponent, DummyComponent} from './';


const routes: Route[] = [
    { path: 'error', loadChildren: 'app/error-pages/error-pages.module#ErrorPagesModule'},
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: '', component: MainComponent, canActivate: [AuthenticationGuard], canActivateChild: [AuthenticationGuard], children: [
	  { path: '', redirectTo: 'centers', pathMatch: 'full'  },
	  { path: 'centers', component: CentrosComponent},
	  { path: 'contacts', component: ContactosComponent},
	  { path: 'fiscal-entities', component: EntidadesFiscalesComponent},
	  { path: 'security', component: SeguridadComponent},
	  { path: 'dummy', component: DummyComponent }
    ]},
    { path: '**', pathMatch: 'full', redirectTo: 'error/404' }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
