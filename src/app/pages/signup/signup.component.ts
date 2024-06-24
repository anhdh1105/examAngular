import { Component, inject } from '@angular/core';
import { ProductsService } from '../../products.service';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  productServices = inject(ProductsService);
  router = inject(Router);

  addForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  handleSubmit() {
    this.productServices.signup(this.addForm.value).subscribe({
      next: (data) => {
        alert('Signup Success');
        this.router.navigateByUrl('/signin');
      },
      error: (err) => {
        console.log(err);
        if (err.error == 'Email already exists') {
          alert('Tài khoản đã tồn tại');
        } else {
          alert('Vui lòng điền đầy đủ thông tin');
        }
      },
    });
  }
}
