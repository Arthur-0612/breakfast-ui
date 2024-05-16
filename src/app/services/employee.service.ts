import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Employee } from "../models/employee";
import { Observable } from "rxjs";

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

  findByStatus(status: string): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.URL}/status/${status}`)
  }

  save(employee: Employee) {
    return this.httpClient.post<Employee>(`${this.URL}/save`, employee)
  }

  update(employee: Employee) {
    return this.httpClient.put<Employee>(`${this.URL}/update/${employee.id}`, employee)
  }

  delete(employee: Employee) {
    return this.httpClient.patch<Employee>(`${this.URL}/delete/${employee.id}`, employee)
  }
}

