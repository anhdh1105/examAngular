import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../../products.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
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
    this.productServices.signin(this.addForm.value).subscribe({
      next: (data) => {
        alert('Signin Success');
        window.localStorage.setItem(
          'token',
          (data as { accessToken: string }).accessToken
        );
        this.router.navigateByUrl('/admin/list');
      },
      error: (err) => {
        console.log(err);
        if (err.error == 'Incorrect password') {
          alert('Mật khẩu không đúng');
        } else if (err.error == 'Cannot find user') {
          alert('Tài khoản không tồn tại, vui lòng kiểm tra lại');
        } else {
          alert('Vui lòng điền đầy đủ thông tin');
        }
      },
    });
  }
}
