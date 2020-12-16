import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service'
import { PersonalGardenService } from '../../service/personal-garden.service'
import { AuthService } from '../../service/auth.service'
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

  constructor(private cartService: CartService, public dialog: MatDialog, private garden: PersonalGardenService, private auth: AuthService) { }

  data = [{
    id: 1,
    product: "arroseur",
    title: "Arroseur automatique Pot'App",
    subTitle: "Pour plus d'informations voir 'A propos'",
    description: "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan\. A small\, agile dog that copes very well with mountainous terrain\, the Shiba Inu was originally bred for hunting ",
    price: 99.99,
    imgLink1: "https://material.angular.io/assets/img/examples/shiba2.jpg",
    imgLink2: "https://material.angular.io/assets/img/examples/shiba2.jpg",
    imgLink3: "https://material.angular.io/assets/img/examples/shiba2.jpg"
  }, {
    id: 2,
    product: "vanne",
    title: "Vanne de rechange",
    subTitle: "Au cas ou ça casse",
    description: "Une vanne 12v de la marque © U.S Solid, le bon nombre de vanne est envoyé avec votre arroseur. Vous devez en acheter seulement en cas de dysfonctionnement de celles-ci. Il suffit de la brancher et HOP on reccommence!",
    price: 14.99,
    imgLink1: "../../../assets/img/vanne1.jpg",
    imgLink2: "https://i.ebayimg.com/images/g/QP8AAOSwc15ef84v/s-l300.png",
    imgLink3: "https://cdn11.bigcommerce.com/s-ige284rpwh/images/stencil/1280x1280/products/799/5435/41__97812.1591585897.JPG?c=2"
  },
  {
    id: 3,
    product: "soilmoisture",
    title: "Sonde d'humidité",
    subTitle: "Car après un certain temps elles perdent de leur efficacité",
    description: "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan\. A small\, agile dog that copes very well with mountainous terrain\, the Shiba Inu was originally bred for hunting ",
    price: 3.49,
    imgLink1: "https://hackster.imgix.net/uploads/attachments/849600/soil-moisture-tutorial-teaser_BrDxyHKCQE.jpg?auto=compress%2Cformat&w=900&h=675&fit=min",
    imgLink2: "https://images-na.ssl-images-amazon.com/images/I/71iq8ZXOTcL._SX342_.jpg",
  }, {
    id: 4,
    product: "protection",
    title: "Kit de protection supplémentaire",
    subTitle: "Pour les zones à grosses intempéries",
    description: "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan\. A small\, agile dog that copes very well with mountainous terrain\, the Shiba Inu was originally bred for hunting ",
    price: 5.29,
    imgLink1: "https://content.instructables.com/ORIG/FDK/506A/H0OIUBER/FDK506AH0OIUBER.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=14aa66d7fa2f11d4eef4272224869bac",
    imgLink2: "https://image.tubefr.com/upload/1/0e/10e6f54f980b0bf1d70944a41b281dec.jpg",
    imgLink3: "https://cf.shopee.ph/file/381ead9f5780449a5b7c25eec6c9419f"
  }, {
    id: 5,
    product: "graine",
    title: "Kit de graine débutant",
    subTitle: "Pour vos première plantaisons!",
    description: "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan\. A small\, agile dog that copes very well with mountainous terrain\, the Shiba Inu was originally bred for hunting ",
    price: 29.49,
    imgLink1: "https://cdn.shopify.com/s/files/1/0063/5972/products/10-Best-Beginner-Plants-Seed-Bundle_large.jpg?v=1475127353",
    imgLink2: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  }, {
    id: 6,
    product: "terreau",
    title: "Terreau haute qualité",
    subTitle: "Pour donner toutes les chances aux plantes",
    description: "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan\. A small\, agile dog that copes very well with mountainous terrain\, the Shiba Inu was originally bred for hunting ",
    price: 9.49,
    imgLink1: "https://www.intradel.be/files/library/Images/Types-de-dechets/sac-terreau.jpg",
    imgLink2: "https://img-3.journaldesfemmes.fr/TUboM8i-qG4fBF74AdtU0lrxAqA=/910x607/smart/ee18a117d3074205a495c64676df6604/ccmcms-jdf/12167888.jpg",
    imgLink3: "https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },]

  ngOnInit(): void {
    if (!!localStorage.getItem('token')) {
      this.auth.get_profile().subscribe(
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
        this.userProfile[0].nombre_parcelle = this.cartService.findProduct("arroseur").numberParcels
        this.auth.modify_profile(this.userProfile[0]).subscribe(
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
          title: 'Merci de votre achat! <br> Vos parcelles ont été ajoutées dans l\'onglet "Mon potager".'
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
          title: 'Merci de votre achat! <br> Vos produits seront bientôt expédiés'
        })
        this.cartService.clearCart();
      }
      this.ifBadge();
    });
  }


  async addArticle(prod) {
    let cart = this.cartService.getItems()
    console.log(cart)
    let position;
    this.alreadyInCart = false;
    for (let i = 0; i < cart.length; i++) {
      console.log(cart[i])
      if (cart[i].product === "arroseur") {
        this.alreadyInCart = true;

      }
    }

    if (prod.product === "arroseur") {
      if (!localStorage.getItem('token')) {
        Swal.fire({
          title: 'Vous devez posséder un compte ou être connecté pour commander ce produit.',
          icon: 'warning'
        })
      } else if (this.userProfile[0].nombre_parcelle === 0) {
        console.log("jes suis lm")
        if (!this.alreadyInCart) {
          let newPrice;
          const { value: number } = await Swal.fire({
            title: 'Combien de parcelles désirez-vous? (15€ supplémentaire par parcelle)',
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
