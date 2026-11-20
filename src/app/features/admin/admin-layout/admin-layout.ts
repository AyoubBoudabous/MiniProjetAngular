import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-admin-layout',
  styleUrl: './admin-layout.css',
  templateUrl: './admin-layout.html',
})
export class AdminLayout {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly isAuthenticated = this.auth.isAuthenticated;

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/shop']);
  }
}
