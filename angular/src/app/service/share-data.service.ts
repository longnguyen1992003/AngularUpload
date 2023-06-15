import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {AccountResponse} from "../Authen/InforRespone";

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  private sharedData = new BehaviorSubject<any>({})
  sharedData$: Observable<any> = this.sharedData.asObservable();


  constructor() { }
  setData(updatedData:any) {
    this.sharedData.next(updatedData);
    console.log(this.sharedData+"dadasd")
  }
}
