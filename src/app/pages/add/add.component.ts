import { Component, inject } from '@angular/core';
import { ProductsService } from '../../products.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent {
  productServices = inject(ProductsService);
  router = inject(Router);

  addForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required, Validators.min(1)]),
    active: new FormControl('false', [Validators.required]),
  });

  handleSubmit() {
    this.productServices.add(this.addForm.value).subscribe({
      next: (data) => {
        alert('Add Success');
        this.router.navigateByUrl('/admin/list');
      },
      error: (err) => {
        alert('Error to add, try again !');
        console.log(err);
      },
    });
  }
}
