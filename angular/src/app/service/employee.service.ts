import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {LocalStorageUlti} from "../ulti/local-storage-ulti";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient : HttpClient) { }
  apiUrl = environment.apiUrl
  addEmployeeUrl = environment.apiUrl+"/add-employee"
  getEmployeeListUrl = environment.apiUrl+"/employees"
  getManagerListUrl = environment.apiUrl+"/managers"
  updateEmployeeUrl = environment.apiUrl+"/update-employee"
  deletedEmployeeUrl = environment.apiUrl+"/deleted-employee"
  searchEmployees = environment.apiUrl+"/search"
  getCurrent = environment.apiUrl+"/current"
  checkEmployeeExist = environment.apiUrl+"/check"

  getEmployeeCurrent() :Observable<any>{
    return this.httpClient.get(`${this.getCurrent}`)
  }
  checkExist() :Observable<any>{
  return this.httpClient.get(`${this.checkEmployeeExist}`)
  }
  searchEmployee(param:string,page:number,size:number):Observable<any>{
    return this.httpClient.get(`${this.searchEmployees}?param=${param}&page=${page}&size=${size}`)
  }
  addEmployee(object:any):Observable<any>{
    return this.httpClient.post(`${this.addEmployeeUrl}`,object)
  }
  getListEmployeeWithEmployee(page:number,size:number):Observable<any>{
    return this.httpClient.get(`${this.getEmployeeListUrl}?page=${page}&size=${size}`,)
  }
  getListEmployeeWithManager(page:number,size:number):Observable<any>{
    return this.httpClient.get(`${this.getManagerListUrl}?page=${page}&size=${size}`)
  }
  // getEmployeeByAccount():Observable<any>{
  //   return  this.httpClient.get(`${this.getEmployeeUrlByAccount}`)
  // }
  updateEmployee(object:any,account:string):Observable<any>{
    return this.httpClient.put(`${this.updateEmployeeUrl}/${account}`,object)
  }
  deletedEmployee(account:string):Observable<any>{
    return this.httpClient.delete(`${this.deletedEmployeeUrl}/${account}`)
  }
}
