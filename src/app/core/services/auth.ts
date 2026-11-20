import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AdminAccount } from '../models/admin.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/admins';
  readonly isAuthenticated = signal(sessionStorage.getItem('techtown-admin') === 'true');

  login(username: string, password: string): Observable<boolean> {
    const params = `?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    return this.http.get<AdminAccount[]>(
      `${this.apiUrl}${params}`
    ).pipe(
      map(admins => admins.length > 0),
      tap(success => {
        this.isAuthenticated.set(success);
        sessionStorage.setItem('techtown-admin', String(success));
      })
    );
  }

  logout(): void {
    this.isAuthenticated.set(false);
    sessionStorage.removeItem('techtown-admin');
  }

  getAccount(): Observable<AdminAccount[]> {
    return this.http.get<AdminAccount[]>(this.apiUrl);
  }

  updatePassword(account: AdminAccount, password: string): Observable<AdminAccount> {
    return this.http.patch<AdminAccount>(`${this.apiUrl}/${account.id}`, { password });
  }
}
