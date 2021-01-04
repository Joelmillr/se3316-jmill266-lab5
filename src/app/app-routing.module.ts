import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponentComponent } from "./layout/body/about-component/about-component.component";
import { AdminComponent } from "./layout/body/auth/admin/admin.component";
import { AuthAminGuard } from "./layout/body/auth/auth-admin.guard";
import { AuthGuard } from "./layout/body/auth/auth.guard";
import { ChangePasswordComponent } from "./layout/body/auth/change-password/change-password.component";
import { SignInComponentComponent } from "./layout/body/auth/sign-in-component/sign-in-component.component";
import { UserSchedulesComponent } from "./layout/body/auth/user-schedules/user-schedules.component";
import { PublicSchedulesComponent } from "./layout/body/public-schedules/public-schedules.component";
import { SearchCoursesComponentComponent } from "./layout/body/search-courses-component/search-courses-component.component";

const routes: Routes = [
  {path:'', component:AboutComponentComponent},
  {path:'search', component:SearchCoursesComponentComponent},
  {path: 'public-schedules', component:PublicSchedulesComponent},
  {path: 'sign-in-sign-up', component:SignInComponentComponent},
  {path: 'my-schedules', component:UserSchedulesComponent, canActivate: [AuthGuard]},
  {path: 'change-password', component:ChangePasswordComponent, canActivate: [AuthGuard]},
  {path: 'admin', component:AdminComponent, canActivate: [AuthAminGuard]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthAminGuard]
})
export class AppRoutingModule{}
