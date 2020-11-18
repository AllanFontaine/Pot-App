import { Component, OnInit } from '@angular/core';
import {CartService} from '../../service/cart.service'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {MatDialog} from '@angular/material/dialog';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  breakpoint: number;
  constructor(private cartService: CartService, public dialog: MatDialog) { }

  data = [{
    id: 1,
    product : "arroseur",
    title : "Arroseur automatique Pot'App",
    subTitle :  "Notre produit phare", 
    description : "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan\. A small\, agile dog that copes very well with mountainous terrain\, the Shiba Inu was originally bred for hunting ",
    price : 20,
    imgLink: "https://material.angular.io/assets/img/examples/shiba2.jpg"
  }, {
    id: 2,
    product :"vanne",
    title : "Vanne de rechange",
    subTitle :  "Au cas ou ça casse", 
    description : "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan\. A small\, agile dog that copes very well with mountainous terrain\, the Shiba Inu was originally bred for hunting ",
    price : 15,
    imgLink: "https://material.angular.io/assets/img/examples/shiba2.jpg"
  }, {
    id :3,
    product :"terreau  ",
    title : "Vanne de rechange",
    subTitle :  "Au cas ou ça casse", 
    description : "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan\. A small\, agile dog that copes very well with mountainous terrain\, the Shiba Inu was originally bred for hunting ",
    price : 15,
    imgLink: "https://material.angular.io/assets/img/examples/shiba2.jpg"
  }]

  ngOnInit(): void {
  }

  onResize(event) {
    if (window.innerWidth <= 900 && window.innerWidth >= 450) {
      this.breakpoint = 2
    } else {
      this.breakpoint = (window.innerWidth <= 900) ? 1 : 3;
    }
  }

  openCart(): void {
    let dialogRef = this.dialog.open(ShoppingCartComponent, {});
  }


  async addArticle(prod){
    let cart = this.cartService.getItems()
    let position;
    let alreadyInCart = false;
    for(let i = 0; i < cart.length; i++){
      if (cart[i].product === "arroseur" && cart[i].amount != 0){
        alreadyInCart = true;
    }
  }
    if (prod.product === "arroseur"){ 
      if(!alreadyInCart){
        let newPrice; 
          const { value: number } = await Swal.fire({
          title: 'Combien de parcelles désirez vous? (15€ supp par parcelle)',
          input: 'number',
          inputPlaceholder: 'Numéro',
        })
       if (number) {
          newPrice = prod.price + (number * 15);
          Swal.fire('Le produit a été ajouté au panier pour un total de ' + newPrice + '€' )

        }else{
          Swal.fire({
           title : 'Vous devez entrer un nombre de parcelles.', 
            icon : 'warning' })
        } 
        this.cartService.addToCart({prodId : prod.id, numberParcels: number, product : prod.product, price : newPrice});
      }else{
        Swal.fire({
          title : 'Vous avez déja un arroseur Pot\'App dans vote panier', 
           icon : 'warning' })
      }
    }else{
      this.cartService.addToCart({prodId : prod.id, product : prod.product, price : prod.price});
    }
    console.log(this.cartService.getItems())
    }
  }
