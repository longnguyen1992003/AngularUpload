import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient : HttpClient) { }
  apiUrl = environment.apiUrl
  addEmployeeUrl = environment.apiUrl+"/add-employee"
  getEmployeeUrl = environment.apiUrl+"/employee"
  getEmployeeListUrl = environment.apiUrl+"/employees"
  getManagerListUrl = environment.apiUrl+"/managers"
  updateEmployeeUrl = environment.apiUrl+"/update-employee"
  deletedEmployeeUrl = environment.apiUrl+"/deleted-employee"


  addEmployee(object:any):Observable<any>{
    return this.httpClient.post(`${this.addEmployeeUrl}`,object)
  }
  getListEmployeeWithEmployee():Observable<any>{
    return this.httpClient.get(`${this.getEmployeeListUrl}`)
  }
  getListEmployeeWithManager():Observable<any>{
    return this.httpClient.get(`${this.getManagerListUrl}`)
  }
  getEmployee(id:number):Observable<any>{
    return  this.httpClient.get(`${this.getEmployeeUrl}/${id}`)
  }
  getEmployeeList():Observable<any>{
    return  this.httpClient.get(`${this.getEmployeeUrl}`)
  }
  updateEmployee(id:number,object:any):Observable<any>{
    return this.httpClient.put(`${this.updateEmployeeUrl}/${id}`,object)
  }
  deletedEmployee(id:number):Observable<any>{
    return this.httpClient.delete(`${this.deletedEmployeeUrl}/${id}`)
  }
}
