import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Breakfast } from "../models/breakfast";

@Injectable()
export class BreakfastService {
  getBreakfast() {
    throw new Error('Method not implemented.');
  }
  private readonly URL: string = `${environment.urlApi}/api/v1/breakfast`

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get<Breakfast[]>(`${this.URL}/all`)
  }

  save(breakfast: Breakfast) {
    return this.httpClient.post<Breakfast>(`${this.URL}/save`, breakfast)
  }

}

