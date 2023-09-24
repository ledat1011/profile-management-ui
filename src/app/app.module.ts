import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseUrlInterceptor } from './Interceptor/base.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadLineComponent } from './functions/head-line/head-line.component';
import { HomeModule } from './functions/home/home.module';
import { CommonModalComponent } from './shared/common-modal/common-modal.component';
import { DialogModalComponent } from './shared/dialog-modal/dialog-modal.component';
import { GroupButtonComponent } from './shared/group-button/group-button.component';
import { UserDetailModalComponent } from './shared/user-detail-modal/user-detail-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupButtonComponent,
    HeadLineComponent,
    UserDetailModalComponent,
    CommonModalComponent,
    DialogModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HomeModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
