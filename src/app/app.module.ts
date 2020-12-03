import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { HeaderTitleComponent } from './layout/header/header-title/header-title.component';
import { SignInTableComponent } from './layout/header/sign-in-table/sign-in-table.component';
import { HeaderImageComponent } from './layout/header/header-image/header-image.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderTitleComponent,
    SignInTableComponent,
    HeaderImageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
