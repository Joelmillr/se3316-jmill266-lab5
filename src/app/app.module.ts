import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { HeaderTitleComponent } from './layout/header/header-title/header-title.component';
import { HeaderSignInComponent } from './layout/header/header-sign-in/header-sign-in.component';
import { HeaderImageComponent } from './layout/header/header-image/header-image.component';
import { BodyComponent } from './layout/body/body.component';
import { AboutComponentComponent } from './layout/body/about-component/about-component.component';
import { ReferencesComponent } from './layout/references/references.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderTitleComponent,
    HeaderSignInComponent,
    HeaderImageComponent,
    BodyComponent,
    AboutComponentComponent,
    ReferencesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
