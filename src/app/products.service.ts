import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IProduct } from './interfaces/product';
import { IUsers } from './interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  api = 'http://localhost:3000/products';
  apiAuth = 'http://localhost:3000';
  htpp = inject(HttpClient);

  getAll() {
    return this.htpp.get<IProduct[]>(this.api);
  }
  getOne(id: string) {
    return this.htpp.get<IProduct>(`${this.api}/${id}`);
  }
  update(id: string, data: IProduct) {
    return this.htpp.patch(`${this.api}/${id}`, data);
  }
  delete(id: string) {
    return this.htpp.delete(`${this.api}/${id}`);
  }
  add(data: IProduct) {
    return this.htpp.post(this.api, data);
  }
  signin(data: any) {
    // apiAuth = 'http://localhost:3000
    return this.htpp.post(`${this.apiAuth}/signin`, data);
  }
  
  signup(data: IUsers) {
    return this.htpp.post(`${this.apiAuth}/signup`, data);
  }
}
