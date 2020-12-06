import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service'
import { PersonalGardenService } from '../../service/personal-garden.service'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MatDialog } from '@angular/material/dialog'
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  userProfile;
  amountArticle: number;

  alreadyInCart: boolean;
  hidden: boolean;

  constructor(private cartService: CartService, public dialog: MatDialog, private garden: PersonalGardenService) { }

  data = [{
    id: 1,
    product: "arroseur",
    title: "Arroseur automatique Pot'App",
    subTitle: "Notre produit phare",
    description: "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan\. A small\, agile dog that copes very well with mountainous terrain\, the Shiba Inu was originally bred for hunting ",
    price: 19.99,
    imgLink: "https://material.angular.io/assets/img/examples/shiba2.jpg"
  }, {
    id: 2,
    product: "vanne",
    title: "Vanne de rechange",
    subTitle: "Au cas ou ça casse",
    description: "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan\. A small\, agile dog that copes very well with mountainous terrain\, the Shiba Inu was originally bred for hunting ",
    price: 14.99,
    imgLink: "../../../assets/img/vanne1.jpg"
  }, {
    id: 3,
    product: "terreau",
    title: "Terreau haute qualité",
    subTitle: "Pour donner toutes les chances aux plantes",
    description: "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan\. A small\, agile dog that copes very well with mountainous terrain\, the Shiba Inu was originally bred for hunting ",
    price: 9.49,
    imgLink: "https://material.angular.io/assets/img/examples/shiba2.jpg"
  },
  {
    id: 4,
    product: "terreau",
    title: "Terreau haute qualité",
    subTitle: "Pour donner toutes les chances aux plantes",
    description: "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan\. A small\, agile dog that copes very well with mountainous terrain\, the Shiba Inu was originally bred for hunting ",
    price: 9.49,
    imgLink: "https://material.angular.io/assets/img/examples/shiba2.jpg"
  }]

  ngOnInit(): void {
    if (!!localStorage.getItem('token')) {
      this.garden.get_profile().subscribe(
        (res) => {
          this.userProfile = res
        },
        (err) => {
          console.log(err)
        }
      );
    }
    this.ifBadge();
  }

  ifBadge() {
    this.amountArticle = (this.cartService.getItems()).length;
    this.amountArticle === 0 ? this.hidden = true : this.hidden = false;
  }

  openCart(): void {
    let dialogRef = this.dialog.open(ShoppingCartComponent, {});

    dialogRef.afterClosed().subscribe((res) => {
      if (this.alreadyInCart && res === "SUCCESS") {
        this.userProfile.nombre_parcelle = this.cartService.findProduct("arroseur").numberParcels
        this.garden.modify_profile(this.userProfile).subscribe(
          (res) => {
            console.log(res)
            this.cartService.clearCart();
          },
          (err) => {
            console.log(err)
          }

        );
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
          title: 'Merci de votre achat! <br> Vos parcelles ont été ajoutées dans l\'onglet Dashboard..'
        })

      } else if (!this.alreadyInCart && res === "SUCCESS") {
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
          title: 'Merci de votre achat! <br> Vos produits seront bientot expédiés'
        })
        this.cartService.clearCart();
      }
      this.ifBadge();
    });
  }


  async addArticle(prod) {
    let cart = this.cartService.getItems()
    let position;
    this.alreadyInCart = false;
    for (let i = 0; i < cart.length; i++) {
      console.log(cart[i])
      if (cart[i].product === "arroseur" && cart[i].amount != 0) {
        this.alreadyInCart = true;
      }
    }
    if (prod.product === "arroseur") {
      if (!localStorage.getItem('token')) {
        Swal.fire({
          title: 'Vous devez posséder un compte ou être connecté pour commander ce produit.',
          icon: 'warning'
        })
      } else if (this.userProfile.nombre_parcelle === 0) {
        if (!this.alreadyInCart) {
          let newPrice;
          const { value: number } = await Swal.fire({
            title: 'Combien de parcelles désirez vous? (15€ supp par parcelle)',
            input: 'number',
            inputPlaceholder: 'Numéro',
            showCancelButton: true
          })
          if (number) {
            newPrice = prod.price + (number * 15);
            Swal.fire('Le produit a été ajouté au panier pour un total de ' + newPrice + '€')
            this.alreadyInCart = true;
            this.cartService.addToCart({ prodId: prod.id, name: prod.title, amount: 1, numberParcels: number, product: prod.product, price: newPrice });
          } else {
            Swal.fire({
              title: 'Vous devez entrer un nombre de parcelles.',
              icon: 'warning'
            })
          }

        } else {
          Swal.fire({
            title: 'Vous avez déja un arroseur Pot\'App dans vote panier',
            icon: 'warning'
          })
        }
      } else {
        Swal.fire({
          title: 'Votre compte est déja lié à un arroseur automatique Pot\'App',
          icon: 'warning'
        })
      }
    } else {
      if (!this.cartService.isExist(prod)) {
        this.cartService.addToCart({ prodId: prod.id, name: prod.title, product: prod.product, price: prod.price, amount: 1 });
      }
    }
    this.ifBadge();
  }
}
