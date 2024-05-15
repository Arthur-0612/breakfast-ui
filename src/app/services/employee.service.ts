import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Employee } from "../models/employee";

@Injectable()
export class ClienteService {
  getClientes() {
    throw new Error('Method not implemented.');
  }
  private readonly URL: string = `${environment.urlApi}/api/v1/employee`

  constructor(private httpClient: HttpClient) { }

  findById(id: number){
    return this.httpClient.get<Employee>(`${this.URL}/${id}`);
  }
}
