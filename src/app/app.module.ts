import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeModule } from './functions/home/home.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BaseUrlInterceptor } from './Interceptor/base.interceptor';
import { GroupButtonComponent } from './shared/group-button/group-button.component';
import { HeadLineComponent } from './functions/head-line/head-line.component';
import { UserDetailModalComponent } from './shared/user-detail-modal/user-detail-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupButtonComponent,
    HeadLineComponent,
    UserDetailModalComponent,
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
