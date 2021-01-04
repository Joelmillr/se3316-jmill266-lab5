import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponentComponent } from "./layout/body/about-component/about-component.component";
import { AuthGuard } from "./layout/body/auth/auth.guard";
import { SignInComponentComponent } from "./layout/body/auth/sign-in-component/sign-in-component.component";
import { UserSchedulesComponent } from "./layout/body/auth/user-schedules/user-schedules.component";
import { PublicSchedulesComponent } from "./layout/body/public-schedules/public-schedules.component";
import { SearchCoursesComponentComponent } from "./layout/body/search-courses-component/search-courses-component.component";

const routes: Routes = [
  {path:'', component:AboutComponentComponent},
  {path:'search', component:SearchCoursesComponentComponent},
  {path: 'public-schedules', component:PublicSchedulesComponent},
  {path: 'sign-in-sign-up', component:SignInComponentComponent},
  {path: 'my-schedules', component:UserSchedulesComponent, canActivate: [AuthGuard]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule{}
