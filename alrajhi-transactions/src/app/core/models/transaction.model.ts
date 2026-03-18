export interface TransactionAmount {
  Amount: string;
  Currency: string;
}

export interface TransactionBalance {
  CreditDebitIndicator: string;
  Type: string;
  Amount: TransactionAmount;
}

export interface CreditorAgent {
  IdentificationType: string;
  Identification: string;
  Name?: string;
}

export interface CreditorAccount {
  IdentificationType: string | string[];
  Identification: string | string[];
  Name?: string | string[];
}

export interface Transaction {
  TransactionId: string;
  TransactionDateTime: string;
  LocalTimeZone?: string;
  TransactionReference?: string;
  TransactionType: string;
  SubTransactionType: string;
  PaymentModes: string;
  CreditDebitIndicator: string;
  Status: string;
  TransactionMutability?: string;
  BookingDateTime: string;
  ValueDateTime?: string;
  TransactionInformation?: string;
  Amount: TransactionAmount;
  ChargeAmount?: TransactionAmount;
  Balance?: TransactionBalance;
  CreditorAgent?: CreditorAgent;
  CreditorAccount?: CreditorAccount;
  MerchantDetails?: {
    MerchantId?: number;
    MerchantName?: string;
    MerchantCategoryCode?: string;
  };
  Flags?: any[];
}

export interface TransactionData {
  AccountId: string;
  Transaction: Transaction[];
}

export interface TransactionLinks {
  Self: string;
  First?: string;
  Prev?: string;
  Next?: string;
  Last?: string;
}

export interface TransactionMeta {
  TotalPages: number;
}

export interface TransactionResponse {
  Data: TransactionData;
  Links: TransactionLinks;
  Meta: TransactionMeta;
}

export interface AccountIdentifier {
  IdentificationType: string;
  Identification: string;
  Name?: string;
}

export interface Account {
  AccountId: string;
  AccountHolderName?: string;
  AccountHolderShortName?: string;
  Status?: string;
  StatusUpdateDateTime?: string;
  Currency?: string;
  AccountType?: string;
  AccountSubType?: string;
  AccountIdentifiers?: AccountIdentifier[];
}

export interface AccountResponse {
  Data: {
    Account: Account[];
  };
  Links: TransactionLinks;
  Meta: TransactionMeta;
}

export interface BalanceAmount {
  Amount: string;
  Currency: string;
}

export interface Balance {
  CreditDebitIndicator: string;
  Type: string;
  DateTime?: string;
  Amount: BalanceAmount;
}

export interface BalanceResponse {
  Data: {
    AccountId: string;
    Balance: Balance[];
  };
  Links: TransactionLinks;
  Meta: TransactionMeta;
}

export interface ApiConfig {
  clientId: string;
  accessToken: string;
  baseUrl: string;
  sandboxMode: boolean;
}
