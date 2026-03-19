import { Injectable } from '@angular/core';
import { AccountResponse, BalanceResponse, TransactionResponse } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  getMockAccounts(): AccountResponse {
    return {
      Data: {
        Account: [
          {
            AccountId: 'CA_0000000003061961204000010006084040848',
            AccountHolderName: 'Mohammed Ahmed Al-Rashidi',
            AccountHolderShortName: 'محمد الراشدي',
            Status: 'Active',
            StatusUpdateDateTime: '2024-01-15T10:00:00+03:00',
            Currency: 'SAR',
            AccountType: 'KSAOB.Retail',
            AccountSubType: 'CurrentAccount',
            AccountIdentifiers: [
              {
                IdentificationType: 'KSAOB.IBAN',
                Identification: 'SA7180000204608014040848',
                Name: 'Mohammed Ahmed Al-Rashidi'
              },
              {
                IdentificationType: 'KSAOB.AccountNumber',
                Identification: '204000010006084040848',
                Name: 'Mohammed Ahmed Al-Rashidi'
              }
            ]
          },
          {
            AccountId: 'CA_0000000001601713308000010006080067493',
            AccountHolderName: 'Mohammed Ahmed Al-Rashidi',
            AccountHolderShortName: 'محمد الراشدي',
            Status: 'Active',
            StatusUpdateDateTime: '2024-01-15T10:00:00+03:00',
            Currency: 'SAR',
            AccountType: 'KSAOB.Corporate',
            AccountSubType: 'CurrentAccount',
            AccountIdentifiers: [
              {
                IdentificationType: 'KSAOB.IBAN',
                Identification: 'SA7080000308608010067493',
                Name: 'Mohammed Ahmed Al-Rashidi'
              }
            ]
          }
        ]
      },
      Links: {
        Self: 'https://sit.api.alrajhibank.com.sa/open-banking/account-information/2022.11.01-final-errata2/accounts'
      },
      Meta: { TotalPages: 1 }
    };
  }

  getMockBalances(accountId: string): BalanceResponse {
    return {
      Data: {
        AccountId: accountId,
        Balance: [
          {
            CreditDebitIndicator: 'KSAOB.Credit',
            Type: 'KSAOB.InterimAvailable',
            DateTime: '2024-03-19T10:00:00+03:00',
            Amount: { Amount: '125750.50', Currency: 'SAR' }
          },
          {
            CreditDebitIndicator: 'KSAOB.Credit',
            Type: 'KSAOB.InterimBooked',
            DateTime: '2024-03-19T10:00:00+03:00',
            Amount: { Amount: '125750.50', Currency: 'SAR' }
          },
          {
            CreditDebitIndicator: 'KSAOB.Credit',
            Type: 'KSAOB.ClosingBooked',
            DateTime: '2024-03-18T23:59:59+03:00',
            Amount: { Amount: '122000.00', Currency: 'SAR' }
          }
        ]
      },
      Links: {
        Self: `https://sit.api.alrajhibank.com.sa/open-banking/account-information/2022.11.01-final-errata2/accounts/${accountId}/balances`
      },
      Meta: { TotalPages: 1 }
    };
  }

  getMockTransactions(accountId: string): TransactionResponse {
    return {
      Data: {
        AccountId: accountId,
        Transaction: [
          {
            TransactionId: 'SAT_204000010006084040848202403190001',
            TransactionDateTime: '2024-03-19T09:30:00.000Z',
            LocalTimeZone: 'UTC+03:00',
            TransactionReference: '204000010006084040848202403190001',
            TransactionType: 'KSAOB.SameBankTransfer',
            SubTransactionType: 'KSAOB.MoneyTransfer',
            PaymentModes: 'KSAOB.Online',
            CreditDebitIndicator: 'KSAOB.Credit',
            Status: 'KSAOB.Booked',
            TransactionMutability: 'KSAOB.Immutable',
            BookingDateTime: '2024-03-19',
            ValueDateTime: '2024-03-19T09:30:00.000Z',
            TransactionInformation: 'Salary Transfer - March 2024',
            Amount: { Amount: '15000.00', Currency: 'SAR' },
            ChargeAmount: { Amount: '0', Currency: 'SAR' },
            Balance: {
              CreditDebitIndicator: 'KSAOB.Credit',
              Type: 'KSAOB.InterimAvailable',
              Amount: { Amount: '125750.50', Currency: 'SAR' }
            },
            CreditorAgent: { IdentificationType: 'KSAOB.BICFI', Identification: '00020400', Name: 'AlRajhi Bank' },
            CreditorAccount: { IdentificationType: 'KSAOB.AccountNumber', Identification: '204000010006084040848', Name: 'Mohammed Al-Rashidi' }
          },
          {
            TransactionId: 'SAT_204000010006084040848202403180001',
            TransactionDateTime: '2024-03-18T14:22:00.000Z',
            LocalTimeZone: 'UTC+03:00',
            TransactionReference: '204000010006084040848202403180001',
            TransactionType: 'KSAOB.POS',
            SubTransactionType: 'KSAOB.Purchase',
            PaymentModes: 'KSAOB.Offline',
            CreditDebitIndicator: 'KSAOB.Debit',
            Status: 'KSAOB.Booked',
            TransactionMutability: 'KSAOB.Immutable',
            BookingDateTime: '2024-03-18',
            ValueDateTime: '2024-03-18T14:22:00.000Z',
            TransactionInformation: 'Tamimi Markets - Grocery',
            Amount: { Amount: '347.80', Currency: 'SAR' },
            ChargeAmount: { Amount: '0', Currency: 'SAR' },
            Balance: {
              CreditDebitIndicator: 'KSAOB.Credit',
              Type: 'KSAOB.InterimAvailable',
              Amount: { Amount: '110750.50', Currency: 'SAR' }
            },
            MerchantDetails: { MerchantId: 5411, MerchantName: 'Tamimi Markets', MerchantCategoryCode: '5411' }
          },
          {
            TransactionId: 'SAT_204000010006084040848202403170001',
            TransactionDateTime: '2024-03-17T11:15:00.000Z',
            LocalTimeZone: 'UTC+03:00',
            TransactionReference: '204000010006084040848202403170001',
            TransactionType: 'KSAOB.BillPayments',
            SubTransactionType: 'KSAOB.Purchase',
            PaymentModes: 'KSAOB.Online',
            CreditDebitIndicator: 'KSAOB.Debit',
            Status: 'KSAOB.Booked',
            TransactionMutability: 'KSAOB.Immutable',
            BookingDateTime: '2024-03-17',
            ValueDateTime: '2024-03-17T11:15:00.000Z',
            TransactionInformation: 'STC Telecom Bill Payment',
            Amount: { Amount: '250.00', Currency: 'SAR' },
            ChargeAmount: { Amount: '0', Currency: 'SAR' },
            Balance: {
              CreditDebitIndicator: 'KSAOB.Credit',
              Type: 'KSAOB.InterimAvailable',
              Amount: { Amount: '111098.30', Currency: 'SAR' }
            }
          },
          {
            TransactionId: 'SAT_204000010006084040848202403160001',
            TransactionDateTime: '2024-03-16T08:45:00.000Z',
            LocalTimeZone: 'UTC+03:00',
            TransactionReference: '204000010006084040848202403160001',
            TransactionType: 'KSAOB.ATM',
            SubTransactionType: 'KSAOB.Withdrawal',
            PaymentModes: 'KSAOB.Offline',
            CreditDebitIndicator: 'KSAOB.Debit',
            Status: 'KSAOB.Booked',
            TransactionMutability: 'KSAOB.Immutable',
            BookingDateTime: '2024-03-16',
            ValueDateTime: '2024-03-16T08:45:00.000Z',
            TransactionInformation: 'ATM Cash Withdrawal - Olaya Branch',
            Amount: { Amount: '2000.00', Currency: 'SAR' },
            ChargeAmount: { Amount: '0', Currency: 'SAR' },
            Balance: {
              CreditDebitIndicator: 'KSAOB.Credit',
              Type: 'KSAOB.InterimAvailable',
              Amount: { Amount: '111348.30', Currency: 'SAR' }
            }
          },
          {
            TransactionId: 'SAT_204000010006084040848202403150001',
            TransactionDateTime: '2024-03-15T16:30:00.000Z',
            LocalTimeZone: 'UTC+03:00',
            TransactionReference: '204000010006084040848202403150001',
            TransactionType: 'KSAOB.LocalBankTransfer',
            SubTransactionType: 'KSAOB.MoneyTransfer',
            PaymentModes: 'KSAOB.Online',
            CreditDebitIndicator: 'KSAOB.Debit',
            Status: 'KSAOB.Booked',
            TransactionMutability: 'KSAOB.Immutable',
            BookingDateTime: '2024-03-15',
            ValueDateTime: '2024-03-15T16:30:00.000Z',
            TransactionInformation: 'Transfer to Ahmed Ali - Rent Payment',
            Amount: { Amount: '5500.00', Currency: 'SAR' },
            ChargeAmount: { Amount: '0', Currency: 'SAR' },
            Balance: {
              CreditDebitIndicator: 'KSAOB.Credit',
              Type: 'KSAOB.InterimAvailable',
              Amount: { Amount: '113348.30', Currency: 'SAR' }
            },
            CreditorAgent: { IdentificationType: 'KSAOB.BICFI', Identification: '00020400', Name: 'Saudi National Bank' },
            CreditorAccount: { IdentificationType: 'KSAOB.IBAN', Identification: 'SA4420000001234567890123' }
          },
          {
            TransactionId: 'SAT_204000010006084040848202403140001',
            TransactionDateTime: '2024-03-14T20:10:00.000Z',
            LocalTimeZone: 'UTC+03:00',
            TransactionReference: '204000010006084040848202403140001',
            TransactionType: 'KSAOB.ECommerce',
            SubTransactionType: 'KSAOB.Purchase',
            PaymentModes: 'KSAOB.Online',
            CreditDebitIndicator: 'KSAOB.Debit',
            Status: 'KSAOB.Booked',
            TransactionMutability: 'KSAOB.Immutable',
            BookingDateTime: '2024-03-14',
            ValueDateTime: '2024-03-14T20:10:00.000Z',
            TransactionInformation: 'Amazon.sa - Online Purchase',
            Amount: { Amount: '899.00', Currency: 'SAR' },
            ChargeAmount: { Amount: '0', Currency: 'SAR' },
            Balance: {
              CreditDebitIndicator: 'KSAOB.Credit',
              Type: 'KSAOB.InterimAvailable',
              Amount: { Amount: '118848.30', Currency: 'SAR' }
            },
            MerchantDetails: { MerchantId: 5999, MerchantName: 'Amazon.sa', MerchantCategoryCode: '5999' }
          },
          {
            TransactionId: 'SAT_204000010006084040848202403130001',
            TransactionDateTime: '2024-03-13T12:00:00.000Z',
            LocalTimeZone: 'UTC+03:00',
            TransactionReference: '204000010006084040848202403130001',
            TransactionType: 'KSAOB.SameBankTransfer',
            SubTransactionType: 'KSAOB.MoneyTransfer',
            PaymentModes: 'KSAOB.Online',
            CreditDebitIndicator: 'KSAOB.Credit',
            Status: 'KSAOB.Booked',
            TransactionMutability: 'KSAOB.Immutable',
            BookingDateTime: '2024-03-13',
            ValueDateTime: '2024-03-13T12:00:00.000Z',
            TransactionInformation: 'Freelance Project Payment - Tech Solutions',
            Amount: { Amount: '8500.00', Currency: 'SAR' },
            ChargeAmount: { Amount: '0', Currency: 'SAR' },
            Balance: {
              CreditDebitIndicator: 'KSAOB.Credit',
              Type: 'KSAOB.InterimAvailable',
              Amount: { Amount: '119747.30', Currency: 'SAR' }
            }
          },
          {
            TransactionId: 'SAT_204000010006084040848202403120001',
            TransactionDateTime: '2024-03-12T09:00:00.000Z',
            LocalTimeZone: 'UTC+03:00',
            TransactionReference: '204000010006084040848202403120001',
            TransactionType: 'KSAOB.POS',
            SubTransactionType: 'KSAOB.Purchase',
            PaymentModes: 'KSAOB.Offline',
            CreditDebitIndicator: 'KSAOB.Debit',
            Status: 'KSAOB.Booked',
            TransactionMutability: 'KSAOB.Immutable',
            BookingDateTime: '2024-03-12',
            ValueDateTime: '2024-03-12T09:00:00.000Z',
            TransactionInformation: 'Starbucks Coffee - Mall of Arabia',
            Amount: { Amount: '65.00', Currency: 'SAR' },
            ChargeAmount: { Amount: '0', Currency: 'SAR' },
            Balance: {
              CreditDebitIndicator: 'KSAOB.Credit',
              Type: 'KSAOB.InterimAvailable',
              Amount: { Amount: '111247.30', Currency: 'SAR' }
            },
            MerchantDetails: { MerchantId: 5812, MerchantName: 'Starbucks Coffee', MerchantCategoryCode: '5812' }
          },
          {
            TransactionId: 'SAT_204000010006084040848202403110001',
            TransactionDateTime: '2024-03-11T15:45:00.000Z',
            LocalTimeZone: 'UTC+03:00',
            TransactionReference: '204000010006084040848202403110001',
            TransactionType: 'KSAOB.BillPayments',
            SubTransactionType: 'KSAOB.Purchase',
            PaymentModes: 'KSAOB.Online',
            CreditDebitIndicator: 'KSAOB.Debit',
            Status: 'KSAOB.Booked',
            TransactionMutability: 'KSAOB.Immutable',
            BookingDateTime: '2024-03-11',
            ValueDateTime: '2024-03-11T15:45:00.000Z',
            TransactionInformation: 'SEC Electricity Bill',
            Amount: { Amount: '480.00', Currency: 'SAR' },
            ChargeAmount: { Amount: '0', Currency: 'SAR' },
            Balance: {
              CreditDebitIndicator: 'KSAOB.Credit',
              Type: 'KSAOB.InterimAvailable',
              Amount: { Amount: '111312.30', Currency: 'SAR' }
            }
          },
          {
            TransactionId: 'SAT_204000010006084040848202403100001',
            TransactionDateTime: '2024-03-10T18:30:00.000Z',
            LocalTimeZone: 'UTC+03:00',
            TransactionReference: '204000010006084040848202403100001',
            TransactionType: 'KSAOB.ATM',
            SubTransactionType: 'KSAOB.Deposit',
            PaymentModes: 'KSAOB.Offline',
            CreditDebitIndicator: 'KSAOB.Credit',
            Status: 'KSAOB.Booked',
            TransactionMutability: 'KSAOB.Immutable',
            BookingDateTime: '2024-03-10',
            ValueDateTime: '2024-03-10T18:30:00.000Z',
            TransactionInformation: 'ATM Cash Deposit',
            Amount: { Amount: '3000.00', Currency: 'SAR' },
            ChargeAmount: { Amount: '0', Currency: 'SAR' },
            Balance: {
              CreditDebitIndicator: 'KSAOB.Credit',
              Type: 'KSAOB.InterimAvailable',
              Amount: { Amount: '111792.30', Currency: 'SAR' }
            }
          },
          {
            TransactionId: 'SAT_204000010006084040848202403090001',
            TransactionDateTime: '2024-03-09T13:20:00.000Z',
            LocalTimeZone: 'UTC+03:00',
            TransactionReference: '204000010006084040848202403090001',
            TransactionType: 'KSAOB.ECommerce',
            SubTransactionType: 'KSAOB.Purchase',
            PaymentModes: 'KSAOB.Online',
            CreditDebitIndicator: 'KSAOB.Debit',
            Status: 'KSAOB.Pending',
            TransactionMutability: 'KSAOB.Mutable',
            BookingDateTime: '2024-03-09',
            ValueDateTime: '2024-03-09T13:20:00.000Z',
            TransactionInformation: 'Noon.com - Electronics',
            Amount: { Amount: '1250.00', Currency: 'SAR' },
            ChargeAmount: { Amount: '0', Currency: 'SAR' },
            Balance: {
              CreditDebitIndicator: 'KSAOB.Credit',
              Type: 'KSAOB.InterimAvailable',
              Amount: { Amount: '108792.30', Currency: 'SAR' }
            },
            MerchantDetails: { MerchantId: 5732, MerchantName: 'Noon.com', MerchantCategoryCode: '5732' }
          },
          {
            TransactionId: 'SAT_204000010006084040848202403080001',
            TransactionDateTime: '2024-03-08T07:30:00.000Z',
            LocalTimeZone: 'UTC+03:00',
            TransactionReference: '204000010006084040848202403080001',
            TransactionType: 'KSAOB.InternationalTransfer',
            SubTransactionType: 'KSAOB.MoneyTransfer',
            PaymentModes: 'KSAOB.Online',
            CreditDebitIndicator: 'KSAOB.Debit',
            Status: 'KSAOB.Booked',
            TransactionMutability: 'KSAOB.Immutable',
            BookingDateTime: '2024-03-08',
            ValueDateTime: '2024-03-08T07:30:00.000Z',
            TransactionInformation: 'International Transfer - Family Support',
            Amount: { Amount: '5000.00', Currency: 'SAR' },
            ChargeAmount: { Amount: '15.00', Currency: 'SAR' },
            Balance: {
              CreditDebitIndicator: 'KSAOB.Credit',
              Type: 'KSAOB.InterimAvailable',
              Amount: { Amount: '110042.30', Currency: 'SAR' }
            }
          }
        ]
      },
      Links: {
        Self: `https://sit.api.alrajhibank.com.sa/open-banking/account-information/2022.11.01-final-errata2/accounts/${accountId}/transactions`,
        First: `https://sit.api.alrajhibank.com.sa/open-banking/account-information/2022.11.01-final-errata2/accounts/${accountId}/transactions`,
        Last: `https://sit.api.alrajhibank.com.sa/open-banking/account-information/2022.11.01-final-errata2/accounts/${accountId}/transactions?pg=1`
      },
      Meta: { TotalPages: 1 }
    };
  }
}
