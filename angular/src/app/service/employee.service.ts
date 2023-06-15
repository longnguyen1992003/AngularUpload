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
  getEmployeeUrlByAccount = environment.apiUrl+"/employee/"+LocalStorageUlti.getAccount()
  getEmployeeListUrl = environment.apiUrl+"/employees"
  getManagerListUrl = environment.apiUrl+"/managers"
  updateEmployeeUrl = environment.apiUrl+"/update-employee/"+LocalStorageUlti.getAccount()
  deletedEmployeeUrl = environment.apiUrl+"/deleted-employee"
  searchEmployees = environment.apiUrl+"/search"

  searchEmployee(param:string):Observable<any>{
    return this.httpClient.get(`${this.searchEmployees}?param=`+param)
  }
  addEmployee(object:any):Observable<any>{
    return this.httpClient.post(`${this.addEmployeeUrl}`,object)
  }
  getListEmployeeWithEmployee():Observable<any>{
    return this.httpClient.get(`${this.getEmployeeListUrl}`)
  }
  getListEmployeeWithManager():Observable<any>{
    return this.httpClient.get(`${this.getManagerListUrl}`)
  }
  getEmployeeByAccount():Observable<any>{
    return  this.httpClient.get(`${this.getEmployeeUrlByAccount}`)
  }
  updateEmployee(object:any):Observable<any>{
    return this.httpClient.put(`${this.updateEmployeeUrl}`,object)
  }
  deletedEmployee(account:string):Observable<any>{
    return this.httpClient.delete(`${this.deletedEmployeeUrl}/${account}`)
  }
}
