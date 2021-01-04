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
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatDialogModule} from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { HeaderTitleComponent } from './layout/header/header-title/header-title.component';
import { HeaderImageComponent } from './layout/header/header-image/header-image.component';
import { AboutComponentComponent } from './layout/body/about-component/about-component.component';
import { ReferencesComponent } from './layout/references/references.component';
import { SignInComponentComponent } from './layout/body/auth/sign-in-component/sign-in-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmailContainerComponent } from './layout/body/auth/sign-in-component/email-container/email-container.component';
import { PasswordContainerComponent } from './layout/body/auth/sign-in-component/password-container/password-container.component';
import { SearchCoursesComponentComponent } from './layout/body/search-courses-component/search-courses-component.component';
import { NameContainerComponent } from './layout/body/auth/sign-in-component/name-container/name-container.component';
import { SearchCoursesResultsComponent } from './layout/body/search-courses-component/search-courses-results/search-courses-results.component';
import { PublicSchedulesComponent } from './layout/body/public-schedules/public-schedules.component';
import { ScheduleComponent } from './layout/body/public-schedules/schedule/schedule.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserSchedulesComponent } from './layout/body/auth/user-schedules/user-schedules.component';
import { CreateScheduleComponent } from './layout/body/auth/user-schedules/create-schedule/create-schedule.component';
import { EditSchedulesComponent } from './layout/body/auth/user-schedules/edit-schedules/edit-schedules.component';
import { TimetableComponent } from './layout/body/auth/user-schedules/edit-schedules/timetable/timetable.component'
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './layout/body/auth/auth-interceptor';
import { ErrorInterceptor  } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { ChangePasswordComponent } from './layout/body/auth/change-password/change-password.component';
import { ViewUsersComponent } from './layout/body/auth/admin/view-users/view-users.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderTitleComponent,
    HeaderImageComponent,
    AboutComponentComponent,
    ReferencesComponent,
    SignInComponentComponent,
    EmailContainerComponent,
    PasswordContainerComponent,
    SearchCoursesComponentComponent,
    NameContainerComponent,
    SearchCoursesResultsComponent,
    PublicSchedulesComponent,
    ScheduleComponent,
    UserSchedulesComponent,
    CreateScheduleComponent,
    EditSchedulesComponent,
    TimetableComponent,
    ErrorComponent,
    ChangePasswordComponent,
    ViewUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    HttpClientModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
