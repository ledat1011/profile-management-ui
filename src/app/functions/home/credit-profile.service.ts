import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditProfileModel } from 'src/app/model/credit-profile.model';

@Injectable({
  providedIn: 'root'
})
export class CreditProfileService {

  url = '/profile';
  constructor(private httpClient: HttpClient) {

  }

  getAll(): Observable<CreditProfileModel[]> {
    return this.httpClient.get<CreditProfileModel[]>(`${this.url}/get-all`)
  }
}
