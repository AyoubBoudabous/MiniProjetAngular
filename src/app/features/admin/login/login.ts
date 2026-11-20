import { Component, inject, signal } from '@angular/core';
import { FormField, form, required, minLength, schema } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  imports: [FormField],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly errorMessage = signal('');

  readonly loginModel = signal({ username: '', password: '' });
  readonly loginSchema = schema<{ username: string; password: string }>(path => {
    required(path.username);
    minLength(path.password, 6);
  });
  readonly loginForm = form(this.loginModel, this.loginSchema);

  submit(): void {
    if (!this.loginForm().valid()) {
      this.loginForm().markAsTouched();
      return;
    }

    const { username, password } = this.loginModel();
    this.auth.login(username, password).subscribe(success => {
      if (success) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.errorMessage.set('Nom d’utilisateur ou mot de passe incorrect.');
      }
    }, () => this.errorMessage.set('Impossible de contacter le serveur JSON sur le port 3000.'));
  }
}
