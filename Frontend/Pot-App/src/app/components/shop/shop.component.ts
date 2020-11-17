import { Component, OnInit } from '@angular/core';
import {CartService} from '../../service/cart.service'
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  breakpoint: number;
  pute = '';
  constructor(private cartService: CartService) { }

  data = [{
    produit : "arroseur",
    title : "Arroseur automatique Pot'App",
    subTitle :  "Notre produit phare", 
    description : "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan\. A small\, agile dog that copes very well with mountainous terrain\, the Shiba Inu was originally bred for hunting ",
    price : "20",
    imgLink: "https://material.angular.io/assets/img/examples/shiba2.jpg"
  }, {
    produit :"vanne",
    title : "Vanne de rechange",
    subTitle :  "Au cas ou ça casse", 
    description : "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan\. A small\, agile dog that copes very well with mountainous terrain\, the Shiba Inu was originally bred for hunting ",
    price : "15",
    imgLink: "https://material.angular.io/assets/img/examples/shiba2.jpg"
  }, {
    produit :"vanne",
    title : "Vanne de rechange",
    subTitle :  "Au cas ou ça casse", 
    description : "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan\. A small\, agile dog that copes very well with mountainous terrain\, the Shiba Inu was originally bred for hunting ",
    price : "15",
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

  async addArticle(product){
    if (product === "arroseur"){  
      const { value: number } = await Swal.fire({
        title: this.pute,
        input: 'number',
        inputPlaceholder: 'Numéro',
        onOpen: () => {
          const input = Swal.getInput()
          input.oninput = () => {
            this.pute = Swal.getInput() + ''
          }
        }
      
      })
      
      }
    }
  }

