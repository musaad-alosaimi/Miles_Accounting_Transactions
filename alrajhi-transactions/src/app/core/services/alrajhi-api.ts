import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AccountResponse, BalanceResponse, TransactionResponse, ApiConfig } from '../models/transaction.model';
import { MockDataService } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class AlrajhiApiService {
  private readonly SANDBOX_BASE = 'https://sit.api.alrajhibank.com.sa/open-banking/account-information/2022.11.01-final-errata2';
  private readonly PROD_BASE = 'https://api.alrajhibank.com.sa/open-banking/account-information/2022.11.01-final-errata2';

  private config: ApiConfig = {
    clientId: '',
    accessToken: '',
    baseUrl: this.SANDBOX_BASE,
    sandboxMode: true
  };

  constructor(
    private http: HttpClient,
    private mockData: MockDataService
  ) {
    this.loadConfig();
  }

  private loadConfig(): void {
    const stored = localStorage.getItem('alrajhi_config');
    if (stored) {
      this.config = JSON.parse(stored);
    }
  }

  saveConfig(config: ApiConfig): void {
    this.config = config;
    this.config.baseUrl = config.sandboxMode ? this.SANDBOX_BASE : this.PROD_BASE;
    localStorage.setItem('alrajhi_config', JSON.stringify(this.config));
  }

  getConfig(): ApiConfig {
    return { ...this.config };
  }

  isConfigured(): boolean {
    return !!this.config.accessToken;
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.config.accessToken}`,
      'Content-Type': 'application/json',
      'x-fapi-interaction-id': this.generateUUID()
    });
  }

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  getAccounts(): Observable<AccountResponse> {
    if (!this.isConfigured()) {
      return of(this.mockData.getMockAccounts());
    }
    return this.http.get<AccountResponse>(
      `${this.config.baseUrl}/accounts`,
      { headers: this.getHeaders() }
    ).pipe(
      catchError(() => of(this.mockData.getMockAccounts()))
    );
  }

  getAccount(accountId: string): Observable<AccountResponse> {
    if (!this.isConfigured()) {
      return of(this.mockData.getMockAccounts());
    }
    return this.http.get<AccountResponse>(
      `${this.config.baseUrl}/accounts/${accountId}`,
      { headers: this.getHeaders() }
    ).pipe(
      catchError(() => of(this.mockData.getMockAccounts()))
    );
  }

  getBalances(accountId: string): Observable<BalanceResponse> {
    if (!this.isConfigured()) {
      return of(this.mockData.getMockBalances(accountId));
    }
    return this.http.get<BalanceResponse>(
      `${this.config.baseUrl}/accounts/${accountId}/balances`,
      { headers: this.getHeaders() }
    ).pipe(
      catchError(() => of(this.mockData.getMockBalances(accountId)))
    );
  }

  getTransactions(
    accountId: string,
    fromDate?: string,
    toDate?: string
  ): Observable<TransactionResponse> {
    if (!this.isConfigured()) {
      return of(this.mockData.getMockTransactions(accountId));
    }

    let url = `${this.config.baseUrl}/accounts/${accountId}/transactions`;
    const params: string[] = [];
    if (fromDate) params.push(`fromBookingDateTime=${fromDate}`);
    if (toDate) params.push(`toBookingDateTime=${toDate}`);
    if (params.length) url += '?' + params.join('&');

    return this.http.get<TransactionResponse>(url, { headers: this.getHeaders() }).pipe(
      catchError(() => of(this.mockData.getMockTransactions(accountId)))
    );
  }
}
