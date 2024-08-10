import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer, CustomerDTO } from './customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:3000/customers';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http
      .get<CustomerDTO[]>(this.apiUrl)
      .pipe(
        map((customers) =>
          customers.map((customer) => this.normalizeCustomer(customer))
        )
      );
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  private normalizeCustomer(customer: CustomerDTO): Customer {
    return {
      name: customer.name,
      phone: customer.phone,
      cpf_cnpj: customer.cpf || customer.cnpj || '',
    };
  }
}
