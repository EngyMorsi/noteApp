import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


declare var $:any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {


  constructor(private _AuthService:AuthService, private _Router:Router) {


   }

  signIn = new FormGroup({

    email : new FormControl('',[Validators.required,Validators.min(10),Validators.max(80)]),
    password : new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]),
  })

  formData()
  {

    if(this.signIn.valid)
    {

      this._AuthService.signIn(this.signIn.value).subscribe(res=>{
        //console.log(res)

        if(res.message == "success")
        {
          this._Router.navigate(['/profile'])
          localStorage.setItem("TOKEN",res.token)
        }

      })


    }
  }

  ngOnInit(): void {

    $("#signin").particleground();
  }
}
