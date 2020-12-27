import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms'
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { HeaderTitleComponent } from './layout/header/header-title/header-title.component';
import { HeaderSignInComponent } from './layout/header/header-sign-in/header-sign-in.component';
import { HeaderImageComponent } from './layout/header/header-image/header-image.component';
import { BodyComponent } from './layout/body/body.component';
import { AboutComponentComponent } from './layout/body/about-component/about-component.component';
import { ReferencesComponent } from './layout/references/references.component';
import { SignInComponentComponent } from './layout/body/sign-in-component/sign-in-component.component';
import { HeaderSearchComponent } from './layout/header/header-search/header-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmailContainerComponent } from './layout/body/sign-in-component/email-container/email-container.component';
import { PasswordContainerComponent } from './layout/body/sign-in-component/password-container/password-container.component';
import { SearchCoursesComponentComponent } from './layout/body/search-courses-component/search-courses-component.component';
import { NameContainerComponent } from './layout/body/sign-in-component/name-container/name-container.component';
import { SearchCoursesResultsComponent } from './layout/body/search-courses-component/search-courses-results/search-courses-results.component';
import { PublicSchedulesComponent } from './layout/body/public-schedules/public-schedules.component';
import { ScheduleComponent } from './layout/body/public-schedules/schedule/schedule.component';
import { CoursesComponent } from './layout/courses/courses.component';
import { SchedulesComponent } from './layout/schedules/schedules.component';
import { ScheduleCreateComponent } from './layout/schedules/schedule-create/schedule-create.component';
import { CourseListComponent } from './layout/courses/course-list/course-list.component';
import { ScheduleListComponent } from './layout/schedules/schedule-list/schedule-list.component';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderTitleComponent,
    HeaderSignInComponent,
    HeaderImageComponent,
    BodyComponent,
    AboutComponentComponent,
    ReferencesComponent,
    SignInComponentComponent,
    HeaderSearchComponent,
    EmailContainerComponent,
    PasswordContainerComponent,
    SearchCoursesComponentComponent,
    NameContainerComponent,
    SearchCoursesResultsComponent,
    PublicSchedulesComponent,
    ScheduleComponent,
    CoursesComponent,
    SchedulesComponent,
    ScheduleCreateComponent,
    CourseListComponent,
    ScheduleListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatTabsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
