import { Component, inject } from '@angular/core';
import { ProductsService } from '../../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  productServices = inject(ProductsService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  productId!: string;

  addForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required, Validators.min(1)]),
    active: new FormControl('false', [Validators.required]),
  });

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.productId = param['id'];
      this.productServices.getOne(this.productId).subscribe({
        next: (data) => {
          this.addForm.patchValue(data);
        },
      });
    });
  }

  handleSubmit() {
    this.productServices.update(this.productId, this.addForm.value).subscribe({
      next: (data) => {
        alert('Update Success');
        this.router.navigateByUrl('/admin/list');
      },
      error: (err) => {
        alert('Error to update, try again !');
        console.log(err);
      },
    });
  }
}
