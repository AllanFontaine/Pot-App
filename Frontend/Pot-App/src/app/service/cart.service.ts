import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {}

  items = [];
  id = 1
  addToCart(product) {
    product.id = this.id;
    this.id ++;
    this.items.push(product);
  }

  incrementItem(product: string){
    for( let i = 0; i < this.items.length; i++){
      if(this.items[i].product === product){
        this.items[i].amount += 1
      }
    }
  }
  decrementItem(product: string){
    for( let i = 0; i < this.items.length; i++){
      if(this.items[i].product === product){
        this.items[i].amount -= 1
      }
    }
  }
  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}