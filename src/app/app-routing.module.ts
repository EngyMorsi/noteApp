import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';



const routes: Routes = [
  {path:"" ,redirectTo:"signin", pathMatch:"full"},
  {path:"signin",component:SigninComponent},
  {path:"signup",component:SignupComponent}, 
  {path:"profile",canActivate:[AuthGuard],component:ProfileComponent},
  {path:"**",component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
exports: [RouterModule]
})
export class AppRoutingModule { }
