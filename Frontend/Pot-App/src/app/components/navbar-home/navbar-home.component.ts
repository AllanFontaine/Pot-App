    import { Component, OnInit, ElementRef } from '@angular/core';
    import { ROUTES } from '../sidebar/sidebar.component';
    import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
    import { Router } from '@angular/router';
    import {AuthService} from '../../service/auth.service';
    import { ViewportScroller } from '@angular/common';
    import { FormBuilder, FormGroup, Validators } from '@angular/forms';


    @Component({
      selector: 'app-navbar-home',
      templateUrl: './navbar-home.component.html',
      styleUrls: ['./navbar-home.component.css']
    })
    export class NavbarHomeComponent implements OnInit{
      public isCollapsed = true;

      constructor(private viewportScroller: ViewportScroller, private formBuilder: FormBuilder) {
      }

      showModal: boolean;
      registerForm: FormGroup;
      submitted = false;
      show()
      {
        this.showModal = true; // Show-Hide Modal Check
        
      }
      //Bootstrap Modal Close event
      hide()
      {
        this.showModal = false;
      }
      ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }
    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        if(this.submitted)
        {
          this.showModal = false;
        }
      
    }

      public onClick(elementId: string): void {
        /*console.log($(this));
        var target = document.getElementById(elementId);
        $("html, body").animate(
          {
            scrollTop: target.top - 70,
          },
          1000000,
          "easeInOutExpo"
        );
        $(".navbar-collapse").collapse("hide");*/
        document.getElementById(elementId).scrollIntoView({behavior: "smooth"})
      }

    }
