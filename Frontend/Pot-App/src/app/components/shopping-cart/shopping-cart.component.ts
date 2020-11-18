import { Component, OnInit } from '@angular/core';
import { CartService } from "../../service/cart.service"
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
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.my_cart = this.cartService.getItems()
    this.subTotal = 0;
    for(let i = 0; i < this.my_cart.length; i++) {
      this.subTotal += this.my_cart[i].price * this.my_cart[i].amount;
    }
    }

    proceedCheckout(){

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Merci de votre achat! <br> Vos parcelles ont été ajoutées..'
      })
    }

    emptyCart(){
      this.cartService.clearCart();
      this.ngOnInit()
    }
    incrementItem(index){
      this.cartService.incrementItem(index);
      this.ngOnInit()
    }
    decrementItem(index){
      this.cartService.decrementItem(index);
      this.ngOnInit()
    }
    removeItem(index){
      this.cartService.removeItem(index);
      this.ngOnInit()
  }
}
