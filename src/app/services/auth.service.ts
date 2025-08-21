import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData, this.httpOptions);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, this.httpOptions).pipe(
      tap((response: any) => {
        if (response.success && response.user) {
          // Store user data and sessionId
          const userData = {
            ...response.user,
            sessionId: response.sessionId
          };
          localStorage.setItem('user', JSON.stringify(userData));
          this.currentUserSubject.next(userData);
        }
      })
    );
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`, this.httpOptions);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  getToken(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).token : null;
  }

  logout(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const logoutData = {
      userId: user.userId,
      sessionId: user.sessionId
    };
    
    return this.http.post(`${this.apiUrl}/logout`, logoutData, this.httpOptions).pipe(
      tap(() => {
        localStorage.removeItem('user');
        this.currentUserSubject.next(null);
      })
    );
  }
}
