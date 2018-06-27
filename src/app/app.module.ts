import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SharedModule } from './shared/shared.module';
import { HomeRoutingModule } from './home/home.routing.module';
import { ImageUploadService } from './api/image-upload.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HomeRoutingModule,
    SharedModule
  ],
  providers: [ImageUploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
