import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  submit(): void {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.authService.login(this.form.getRawValue()).subscribe({
    next: (userResponse) => {
      console.log('Login successful API payload received:', userResponse);
      
      // Double check that our token is explicitly set before we run the router
      if (this.authService.isLoggedIn()) {
        console.log('Token confirmed in storage. Navigating now...');
        this.router.navigate(['/shop']);
      } else {
        console.warn('Token missing from localStorage, trying to navigate anyway...');
        this.router.navigate(['/shop']);
      }
    },
    error: (err) => {
      console.error('Login error:', err);
    }
  });
}
}
