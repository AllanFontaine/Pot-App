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

  incrementItem(index){
    this.items[index].amount += 1;
  }
  decrementItem(index){
    this.items[index].amount -= 1;
    if(this.items[index].amount <= 0){
      this.removeItem(index);
    }
  }
  removeItem(index){
    this.items.splice(index,1);
    console.log(this.items)
  }
  getItems() {
    return this.items;
  }

  isExist(product): boolean{
    for( let i = 0; i < this.items.length; i++){
      if(this.items[i].product === product.product){
        this.items[i].amount += 1
        return true;
      }
    }
    return false;
  }
  clearCart() {
    this.items = [];
    return this.items;
  }
}