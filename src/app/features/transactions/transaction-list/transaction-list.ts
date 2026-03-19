import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlrajhiApiService } from '../../../core/services/alrajhi-api';
import { Account, Transaction } from '../../../core/models/transaction.model';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.scss',
  standalone: false
})
export class TransactionListComponent implements OnInit {
  accounts: Account[] = [];
  selectedAccountId = '';
  allTransactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  selectedTransaction: Transaction | null = null;

  loading = false;
  error = '';

  filterType = 'all';
  filterStatus = 'all';
  filterFrom = '';
  filterTo = '';
  searchText = '';

  transactionTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'KSAOB.POS', label: 'POS' },
    { value: 'KSAOB.ECommerce', label: 'E-Commerce' },
    { value: 'KSAOB.ATM', label: 'ATM' },
    { value: 'KSAOB.BillPayments', label: 'Bill Payments' },
    { value: 'KSAOB.LocalBankTransfer', label: 'Local Transfer' },
    { value: 'KSAOB.SameBankTransfer', label: 'Same Bank Transfer' },
    { value: 'KSAOB.InternationalTransfer', label: 'International' }
  ];

  constructor(
    private apiService: AlrajhiApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
    this.route.params.subscribe(params => {
      if (params['accountId']) {
        this.selectedAccountId = params['accountId'];
        this.loadTransactions();
      }
    });
  }

  loadAccounts(): void {
    this.apiService.getAccounts().subscribe({
      next: (res) => {
        this.accounts = res.Data.Account;
        if (!this.selectedAccountId && this.accounts.length > 0) {
          this.selectedAccountId = this.accounts[0].AccountId;
          this.loadTransactions();
        }
      }
    });
  }

  onAccountChange(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    if (!this.selectedAccountId) return;
    this.loading = true;
    this.error = '';

    this.apiService.getTransactions(this.selectedAccountId, this.filterFrom, this.filterTo).subscribe({
      next: (res) => {
        this.allTransactions = res.Data.Transaction;
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load transactions';
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    let result = [...this.allTransactions];

    if (this.filterType !== 'all') {
      result = result.filter(t => t.TransactionType === this.filterType);
    }

    if (this.filterStatus !== 'all') {
      result = result.filter(t => t.Status === `KSAOB.${this.filterStatus}`);
    }

    if (this.searchText.trim()) {
      const query = this.searchText.toLowerCase();
      result = result.filter(t =>
        (t.TransactionInformation || '').toLowerCase().includes(query) ||
        t.TransactionId.toLowerCase().includes(query) ||
        t.TransactionType.toLowerCase().includes(query) ||
        (t.MerchantDetails?.MerchantName || '').toLowerCase().includes(query)
      );
    }

    this.filteredTransactions = result;
  }

  resetFilters(): void {
    this.filterType = 'all';
    this.filterStatus = 'all';
    this.filterFrom = '';
    this.filterTo = '';
    this.searchText = '';
    this.applyFilters();
  }

  selectTransaction(txn: Transaction): void {
    this.selectedTransaction = this.selectedTransaction?.TransactionId === txn.TransactionId ? null : txn;
  }

  formatAmount(amount: string): string {
    return parseFloat(amount).toLocaleString('en-SA', { minimumFractionDigits: 2 });
  }

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-SA', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  formatDateTime(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleString('en-SA', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
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

  getTypeLabel(type: string): string {
    return type.replace('KSAOB.', '').replace(/([A-Z])/g, ' $1').trim();
  }

  getStatusClass(status: string): string {
    return 'status-' + status.replace('KSAOB.', '').toLowerCase();
  }

  getShortAccountLabel(account: Account): string {
    const iban = account.AccountIdentifiers?.find(i => i.IdentificationType === 'KSAOB.IBAN');
    if (iban) {
      const id = iban.Identification;
      return `${account.AccountSubType} — ****${id.slice(-4)}`;
    }
    return account.AccountId;
  }

  get totalCredit(): number {
    return this.filteredTransactions
      .filter(t => t.CreditDebitIndicator === 'KSAOB.Credit')
      .reduce((s, t) => s + parseFloat(t.Amount.Amount), 0);
  }

  get totalDebit(): number {
    return this.filteredTransactions
      .filter(t => t.CreditDebitIndicator === 'KSAOB.Debit')
      .reduce((s, t) => s + parseFloat(t.Amount.Amount), 0);
  }
}
