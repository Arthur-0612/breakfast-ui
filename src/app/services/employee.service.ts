import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Employee } from "../models/employee";

@Injectable()
export class EmployeeService {
  getEmployee() {
    throw new Error('Method not implemented.');
  }
  private readonly URL: string = `${environment.urlApi}/api/v1/employee`

  constructor(private httpClient: HttpClient) { }

  findById(id: number) {
    return this.httpClient.get<Employee>(`${this.URL}/${id}`)
  }

  findAll() {
    return this.httpClient.get<Employee[]>(`${this.URL}/all`)
  }

  save(employee: Employee) {
    return this.httpClient.post<Employee>(`${this.URL}/save`, employee)
  }

  update(employee: Employee) {
    return this.httpClient.post<Employee>(`${this.URL}/update/${employee.id}`, employee)
  }

  delete(id: number) {
    return this.httpClient.delete<Employee>(`${this.URL}/${id}`)
  }
}

