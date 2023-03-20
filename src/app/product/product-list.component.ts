import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product List';
  imageWidth: number = 40;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string = '';
  //listFilter: string ='Cart';
  sub: Subscription | undefined;

  constructor(private prodService: ProductService) {}

  ngOnInit(): void {
   this.sub= this.prodService.getProducts().subscribe({
      next: (products) => {
        (this.products = products);
        this.filteredProduct = this.products;
      },
      error: (err) => (this.errorMessage = err),
    });

  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  products: IProduct[] = [];

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  private _listFilter: string = '';

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProduct = this.performFilter(value);
  }
  filteredProduct: IProduct[] = [];

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();

    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().includes(filterBy)
    );
  }
  onRatingClicked(message: string): void {
    this.pageTitle = 'Prodduct list:' + message;
  }
}
