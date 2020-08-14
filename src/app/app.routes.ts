import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';


const routes: Routes = [
    { path: ' ', component: LoginComponent },
    { path: 'login', component: LoginComponent } ,
    { path: 'home', component: HomeComponent, canActivate: [AngularFireAuthGuard] } ,
    { path: 'home/:user', component: HomeComponent, canActivate: [AngularFireAuthGuard] } ,
    { path: '**', pathMatch: 'full', redirectTo: 'login' }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
