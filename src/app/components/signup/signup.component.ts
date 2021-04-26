import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

 
declare var $:any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  
  isClicked = false;
  alertMessage = "";
  isSuccess = false;
  emailResponse = ""
  emailAlert = false

  constructor(private _AuthService:AuthService) { }

  signUp = new FormGroup({
    first_name : new FormControl('',[Validators.required,Validators.pattern(/^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/)]),
    last_name : new FormControl('',[Validators.required,Validators.pattern(/^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/)]),
    email : new FormControl('',[Validators.required,Validators.email]),
    age : new FormControl('',[Validators.required, Validators.min(10),Validators.max(80)]),
    password : new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]),
  })


  formData()
  {
this.isClicked = true;

//this.isSuccess = false;


    if(this.signUp.valid)
    {
      //console.log(this.signUp)
      this._AuthService.signUp(this.signUp.value).subscribe(res=>{
        if(res.message == 'success')
        {
           this.isClicked = false
           this.emailAlert =false
           this.isSuccess = true
           this.alertMessage = res.message
           this.signUp.reset();


        }else
        {
           this.emailResponse = res.errors.email.message
           this.emailAlert =true
           this.isSuccess = false
           this.isClicked = false


        }
        console.log(res);
        
      })

    }
  }

  ngOnInit(): void {
    $("#signup").particleground();
  }

}
