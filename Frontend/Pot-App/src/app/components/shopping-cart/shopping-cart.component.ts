import { Component, OnInit } from '@angular/core';
import { CartService } from "../../service/cart.service"
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  my_cart = [];
  mainObject;
  subTotal = 0;
  constructor(private cartService: CartService, public dialogRef: MatDialogRef<ShoppingCartComponent>) { }

  ngOnInit(): void {
    this.my_cart = this.cartService.getItems()
    this.subTotal = 0;
    for (let i = 0; i < this.my_cart.length; i++) {
      this.subTotal += this.my_cart[i].price * this.my_cart[i].amount;
    }
  }

  proceedCheckout() {
    this.dialogRef.close('SUCCESS');
  }

  emptyCart() {
    this.cartService.clearCart();
    this.ngOnInit()
  }
  incrementItem(index) {
    this.cartService.incrementItem(index);
    this.ngOnInit()
  }
  decrementItem(index) {
    this.cartService.decrementItem(index);
    this.ngOnInit()
  }
  removeItem(index) {
    this.cartService.removeItem(index);
    this.ngOnInit()
  }
  cancelClose() {
    this.dialogRef.close('CANCEL');
  }
}
