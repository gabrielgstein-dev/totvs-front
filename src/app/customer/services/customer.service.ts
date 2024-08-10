import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer, CustomerDTO } from '../models/customer.model';

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

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${customer.id}`, customer);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private normalizeCustomer(customer: CustomerDTO): Customer {
    return {
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      cpf_cnpj: customer.cpf || customer.cnpj || '',
      contracts: customer.contracts || [],
    };
  }
}
