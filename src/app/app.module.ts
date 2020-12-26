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
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
