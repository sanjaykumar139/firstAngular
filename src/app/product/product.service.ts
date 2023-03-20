import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { IProduct } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl = 'api/product.json';
  constructor(private httpService: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.httpService.get<IProduct[]>(this.productUrl).pipe(
      tap((data) => console.log('All', JSON.stringify(data)))
      //catchError(this.handleError)
    );
  }
  private handleError(
    handleError: HttpErrorResponse
  ): import('rxjs').OperatorFunction<IProduct[], any> {
    throw new Error('Method not implemented.');
  }
}
