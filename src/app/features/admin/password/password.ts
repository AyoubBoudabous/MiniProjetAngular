import { Component, inject, signal } from '@angular/core';
import { FormField, form, minLength, required, schema } from '@angular/forms/signals';
import { AuthService } from '../../../core/services/auth';

@Component({
  imports: [FormField],
  selector: 'app-password',
  styleUrl: './password.css',
  templateUrl: './password.html',
})
export class Password {
  private readonly auth = inject(AuthService);
  readonly message = signal('');

  readonly passwordModel = signal({ password: '', confirmation: '' });
  readonly passwordSchema = schema<{ password: string; confirmation: string }>(path => {
    required(path.password);
    minLength(path.password, 6);
    required(path.confirmation);
  });
  readonly passwordForm = form(this.passwordModel, this.passwordSchema);

  submit(): void {
    const { password, confirmation } = this.passwordModel();

    if (!this.passwordForm().valid()) {
      this.passwordForm().markAsTouched();
      return;
    }

    if (password !== confirmation) {
      this.message.set('Les deux mots de passe ne correspondent pas.');
      return;
    }

    this.auth.getAccount().subscribe(accounts => {
      const account = accounts[0];
      if (!account) {
        this.message.set('Compte administrateur introuvable.');
        return;
      }

      this.auth.updatePassword(account, password).subscribe({
        next: () => {
          this.message.set('Mot de passe modifié avec succès.');
          this.passwordModel.set({ password: '', confirmation: '' });
        },
        error: () => this.message.set('Échec de la modification du mot de passe.')
      });
    }, () => this.message.set('Impossible de contacter le serveur JSON.'));
  }
}
