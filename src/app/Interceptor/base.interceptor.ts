import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const baseUrl = environment.SERVER_URL;
    const apiReq = request.clone({
      url: `${baseUrl}${request.url}`,
      headers: request.headers.set('Content-Type', 'application/json'),
    });
    return next.handle(apiReq);
  }
}
