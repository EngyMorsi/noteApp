import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  

  constructor(public _AuthService:AuthService, private _Router:Router) { 

    //this._AuthService.isLoggedIn()
  }

  logout()
  {
    localStorage.clear()
    this._Router.navigate(['/signin'])
  }

  ngOnInit(): void {
  }

}
