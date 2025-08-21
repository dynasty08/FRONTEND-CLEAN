import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiService } from './api.service';
import { DashboardData } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apiService: ApiService) {}

  getDashboardData(): Observable<DashboardData> {
    console.log('UserService: Calling dashboard API...');
    return this.apiService.get<any>('/dashboard').pipe(
      map(response => {
        console.log('UserService: Raw API response:', response);
        
        // Handle the response structure
        if (response && response.data) {
          console.log('UserService: Extracted data:', response.data);
          return response.data;
        } else if (response && response.totalUsers !== undefined) {
          // Direct response format
          console.log('UserService: Direct response format:', response);
          return response;
        } else {
          console.error('UserService: Unexpected response format:', response);
          // Return mock data as fallback
          return {
            totalUsers: 0,
            activeUsers: 0,
            activeSessions: 0,
            processedData: []
          };
        }
      }),
      catchError(error => {
        console.error('UserService: API call failed:', error);
        // Return mock data on error
        return of({
          totalUsers: 0,
          activeUsers: 0,
          activeSessions: 0,
          processedData: []
        });
      })
    );
  }

  getUserProfile(): Observable<any> {
    return this.apiService.get('/user/profile');
  }
}
