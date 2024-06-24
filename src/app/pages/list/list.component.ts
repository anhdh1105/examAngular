import { Component, inject } from '@angular/core';
import { ProductsService } from '../../products.service';
import { NgFor, NgIf } from '@angular/common';
import { IProduct } from '../../interfaces/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  productServices = inject(ProductsService);
  products: IProduct[] = [];

  ngOnInit() {
    this.productServices.getAll().subscribe({
      next: (data) => {
        this.products = data;
      },
    });
  }

  handleSubmit(id: string) {
    if (window.confirm('Are you sure to delete ?')) {
      this.productServices.delete(id).subscribe({
        next: () => {
          alert('Delete Success');
          this.ngOnInit();
        },
        error: (err) => {
          alert('Error to delete, try again !');
          console.log(err);
        },
      });
    }
  }
}
