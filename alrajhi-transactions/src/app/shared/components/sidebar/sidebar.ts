import { Component, OnInit } from '@angular/core';
import { AlrajhiApiService } from '../../../core/services/alrajhi-api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  standalone: false
})
export class SidebarComponent implements OnInit {
  isConfigured = false;
  isSandboxMode = true;

  constructor(private apiService: AlrajhiApiService) {}

  ngOnInit(): void {
    this.isConfigured = this.apiService.isConfigured();
    this.isSandboxMode = this.apiService.getConfig().sandboxMode;
  }
}
