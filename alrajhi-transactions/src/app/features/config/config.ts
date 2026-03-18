import { Component, OnInit } from '@angular/core';
import { AlrajhiApiService } from '../../core/services/alrajhi-api';
import { ApiConfig } from '../../core/models/transaction.model';

@Component({
  selector: 'app-config',
  templateUrl: './config.html',
  styleUrl: './config.scss',
  standalone: false
})
export class ConfigComponent implements OnInit {
  config: ApiConfig = {
    clientId: '',
    accessToken: '',
    baseUrl: '',
    sandboxMode: true
  };

  saved = false;

  constructor(private apiService: AlrajhiApiService) {}

  ngOnInit(): void {
    this.config = this.apiService.getConfig();
  }

  save(): void {
    this.apiService.saveConfig(this.config);
    this.saved = true;
    setTimeout(() => this.saved = false, 3000);
  }

  clearConfig(): void {
    this.config = {
      clientId: '',
      accessToken: '',
      baseUrl: '',
      sandboxMode: true
    };
    this.apiService.saveConfig(this.config);
    localStorage.removeItem('alrajhi_config');
  }
}
