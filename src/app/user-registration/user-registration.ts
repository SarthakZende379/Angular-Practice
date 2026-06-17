import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

function formValidator(group: AbstractControl) {
  const errors: any = {};

  const pass = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  if (pass !== confirm) errors['passwordMismatch'] = true;

  const contactMethod = group.get('contactMethod')?.value;
  const phone = group.get('phone')?.value;
  if (contactMethod === 'phone' && !phone) errors['phoneRequired'] = true;

  return Object.keys(errors).length > 0 ? errors : null;
}

@Component({
  selector: 'app-user-registration',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-registration.html',
  styleUrl: './user-registration.css'
})
export class UserRegistration {

  http = inject(HttpClient);

  checkUsername = (control: AbstractControl) => {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/users').pipe(
      map((users: any[]) => {
        const taken = users.find(u => u.username.toLowerCase() === control.value.toLowerCase());
        return taken ? { usernameTaken: true } : null;
      })
    );
  }

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)], [this.checkUsername]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', Validators.required),
    phone: new FormControl(''),
    contactMethod: new FormControl('email')
  }, { validators: formValidator });

  onSubmit() {
    if (this.form.valid) {
      console.log('submitted:', this.form.value);
      this.form.reset();
    }
  }
}