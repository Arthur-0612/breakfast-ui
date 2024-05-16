import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Item } from "../models/items";
import { Injectable } from "@angular/core";

@Injectable()
export class ItemService {
    getEmployee() {
        throw new Error('Method not implemented.');
    }
    private readonly URL: string = `${environment.urlApi}/api/v1/item`

    constructor(private httpClient: HttpClient) { }

    findById(id: number) {
        return this.httpClient.get<Item>(`${this.URL}/${id}`)
    }

    findAll() {
        return this.httpClient.get<Item[]>(`${this.URL}/all`)
    }

    save(employee: Item) {
        return this.httpClient.post<Item>(`${this.URL}/save`, employee)
    }

}