import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/services/auth.guard';
import { NonAuthGuard } from 'src/services/non-auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchRateAttractionsComponent } from './search-rate-attractions/search-rate-attractions.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NonAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NonAuthGuard] },
  { path: '', component: SearchRateAttractionsComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
