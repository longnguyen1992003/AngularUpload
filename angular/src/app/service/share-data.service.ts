import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {AccountResponse} from "../Authen/InforRespone";

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  private sharedData: Subject<any> = new Subject<any>();
  sharedData$: Observable<any> = this.sharedData.asObservable();
 

  constructor() { }
  setData(updatedData:any) {
    this.sharedData.next(updatedData);
  }
}
