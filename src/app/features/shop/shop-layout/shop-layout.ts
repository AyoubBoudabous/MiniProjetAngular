import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-shop-layout',
  styleUrl: './shop-layout.css',
  templateUrl: './shop-layout.html',
})
export class ShopLayout {
  private readonly auth = inject(AuthService);
  readonly isAdmin = this.auth.isAuthenticated;
}
