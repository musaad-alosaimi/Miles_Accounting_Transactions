import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlrajhiApiService } from '../../core/services/alrajhi-api';
import { Account, Balance, Transaction } from '../../core/models/transaction.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: false
})
export class DashboardComponent implements OnInit {
  accounts: Account[] = [];
  selectedAccount: Account | null = null;
  balances: Balance[] = [];
  recentTransactions: Transaction[] = [];
  loading = true;
  error = '';

  totalCredit = 0;
  totalDebit = 0;

  constructor(
    private apiService: AlrajhiApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.loading = true;
    this.apiService.getAccounts().subscribe({
      next: (res) => {
        this.accounts = res.Data.Account;
        if (this.accounts.length > 0) {
          this.selectAccount(this.accounts[0]);
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load accounts';
        this.loading = false;
      }
    });
  }

  selectAccount(account: Account): void {
    this.selectedAccount = account;
    this.loadBalances(account.AccountId);
    this.loadRecentTransactions(account.AccountId);
  }

  loadBalances(accountId: string): void {
    this.apiService.getBalances(accountId).subscribe({
      next: (res) => {
        this.balances = res.Data.Balance;
      }
    });
  }

  loadRecentTransactions(accountId: string): void {
    this.apiService.getTransactions(accountId).subscribe({
      next: (res) => {
        const txns = res.Data.Transaction;
        this.recentTransactions = txns.slice(0, 5);
        this.totalCredit = txns
          .filter(t => t.CreditDebitIndicator === 'KSAOB.Credit')
          .reduce((sum, t) => sum + parseFloat(t.Amount.Amount), 0);
        this.totalDebit = txns
          .filter(t => t.CreditDebitIndicator === 'KSAOB.Debit')
          .reduce((sum, t) => sum + parseFloat(t.Amount.Amount), 0);
      }
    });
  }

  getAvailableBalance(): string {
    const b = this.balances.find(b => b.Type === 'KSAOB.InterimAvailable');
    return b ? parseFloat(b.Amount.Amount).toLocaleString('en-SA', { minimumFractionDigits: 2 }) : '—';
  }

  getBookedBalance(): string {
    const b = this.balances.find(b => b.Type === 'KSAOB.InterimBooked');
    return b ? parseFloat(b.Amount.Amount).toLocaleString('en-SA', { minimumFractionDigits: 2 }) : '—';
  }

  formatAmount(amount: string): string {
    return parseFloat(amount).toLocaleString('en-SA', { minimumFractionDigits: 2 });
  }

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-SA', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  getTransactionIcon(type: string): string {
    const icons: Record<string, string> = {
      'KSAOB.POS': '🛍️',
      'KSAOB.ECommerce': '🛒',
      'KSAOB.ATM': '🏧',
      'KSAOB.BillPayments': '📄',
      'KSAOB.LocalBankTransfer': '🏦',
      'KSAOB.SameBankTransfer': '↔️',
      'KSAOB.InternationalTransfer': '🌍',
      'KSAOB.Teller': '👤',
      'KSAOB.Cheque': '📝',
      'KSAOB.Other': '💳'
    };
    return icons[type] || '💳';
  }

  getTransactionLabel(type: string): string {
    return type.replace('KSAOB.', '').replace(/([A-Z])/g, ' $1').trim();
  }

  getMaskedIban(account: Account): string {
    const iban = account.AccountIdentifiers?.find(i => i.IdentificationType === 'KSAOB.IBAN');
    if (!iban) return '—';
    const id = iban.Identification;
    return id.substring(0, 6) + ' **** **** ' + id.slice(-4);
  }

  viewAllTransactions(): void {
    if (this.selectedAccount) {
      this.router.navigate(['/transactions', this.selectedAccount.AccountId]);
    }
  }
}
