import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  API_URL = environment.apiUrl+"/login";
  constructor(private httpClient:HttpClient) {
    }
    login(payload:any): Observable<any>{
      return this.httpClient.post(this.API_URL,payload)
    }
  }

