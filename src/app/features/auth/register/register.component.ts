import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterRequest } from '../../../core/models/auth-user.model';

// PrimeNG UI Modules
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterLink,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    MessageModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  role: 'User' | 'Admin' = 'User';
  adminSecretKey = '';
  message = '';
  isSuccess = false;

  form: RegisterRequest = {
    fullName: '', email: '', tel: '', password: ''
  };

  selectRole(role: 'User' | 'Admin') {
  this.role = role;
  if (role === 'User') this.adminSecretKey = '';
  this.cdr.detectChanges();
}

  submit() {
    const body: RegisterRequest = { ...this.form };
    if (this.role === 'Admin' && this.adminSecretKey) {
      body.adminSecretKey = this.adminSecretKey;
    }

    this.authService.register(body).subscribe({
      next: (res) => {
        this.isSuccess = true;
        this.message = `Registered as ${res.role} successfully!`;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isSuccess = false;
        this.message = err.error?.message ?? 'Registration failed.';
      }
    });
  }
}