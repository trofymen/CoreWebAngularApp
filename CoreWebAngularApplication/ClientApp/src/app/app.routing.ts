import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './product/product-list.component';
import { ProductCreateComponent } from './product/product-create.component';
import { ProductEditComponent } from './product/product-edit.component';
import { NotFoundComponent } from './not-found.component';
import { ProductDetailComponent } from './product/product-detail.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard] },
  //{ path: 'product-list', component: ProductListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create', component: ProductCreateComponent },
  { path: 'product-list/edit/:id', component: ProductEditComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
