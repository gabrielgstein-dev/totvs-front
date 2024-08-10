import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contract } from '../models/contract.model';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private apiUrl = 'http://localhost:3000/contracts';

  constructor(private http: HttpClient) {}

  createContract(customerId: number, contract: Contract): Observable<Contract> {
    return this.http.post<Contract>(this.apiUrl, contract);
  }

  updateContract(customerId: number, contract: Contract): Observable<Contract> {
    return this.http.put<Contract>(
      `${this.apiUrl}/${contract.id}/user/${customerId}`,
      contract
    );
  }
}
