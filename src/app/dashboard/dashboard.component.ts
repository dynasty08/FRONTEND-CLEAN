import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { DashboardData } from '../models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  dashboardData: DashboardData | null = null;
  loading = true;

  constructor(private userService: UserService) {}

  getCurrentDate(): Date {
    return new Date();
  }

  ngOnInit(): void {
    this.loadDashboardData();
    setInterval(() => this.loadDashboardData(), 30000);
  }

  loadDashboardData(): void {
    console.log('Loading dashboard data...');
    this.userService.getDashboardData().subscribe({
      next: (data) => {
        console.log('Dashboard data received:', data);
        this.dashboardData = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load dashboard data:', error);
        console.error('Error details:', error.error);
        console.error('Error status:', error.status);
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-success';
      case 'processing': return 'bg-warning';
      case 'failed': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }
}
