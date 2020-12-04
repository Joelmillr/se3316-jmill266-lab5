import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button';

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
    HeaderSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
