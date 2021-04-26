import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';
import jwt_decode from "jwt-decode";
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare var $:any

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  AllNotes:any;
  data:any;
  token:any;
  decoded:any;
  // noteID:any;
  //userID:any;
  

  constructor(private _Router:Router ,private _NotesService:NotesService) { 
    
    
     this.token = localStorage.getItem('TOKEN');
     this.decoded = jwt_decode(this.token);
     console.log(this.decoded);
     
   
   /*
    if(!localStorage.getItem('TOKEN'))
    {
      this._Router.navigate(['/signin'])
    }
    */
  }


 getNotes()
 {

  let data = {

    token:this.token,
    userID:this.decoded._id,
  }
    this._NotesService.getUserNotes(data).subscribe(res=>{
     // console.log("notes" , res)
     if(res.message == 'success')
     {
       this.AllNotes = res.Notes;
     }
     else
     {
       this.AllNotes = [];
     }
    })
 }
 AddNotes = new FormGroup({
   title:new FormControl("",Validators.required),
   desc:new FormControl("",Validators.required),
   
 });

 editForm = new FormGroup({
  title:new FormControl("",Validators.required),
  desc:new FormControl("",Validators.required),
  
});

 addData(){

  let data ={
    title:this.AddNotes.controls.title.value,
    desc:this.AddNotes.controls.desc.value,
    token:this.token,
    citizenID:this.decoded._id 
  }
  this._NotesService.addNote(data).subscribe(res=>{
    if(res.message == 'success')
    {
      $("#addNote").modal("hide");
      this.getNotes();
      this.AddNotes.reset();
    }
    //console.log(res);
    
  })
   //console.log(this.AddNotes.value);
   
 }

 //=======delete========//
 noteID:any;
 getID(id:any)
 {
     this.noteID = id
     console.log(id);
     
 }


 deleteNote()
 {
   let data = {
    
    token:this.token,
    NoteID:this.noteID
    
   }
   this._NotesService.deleteNote(data).subscribe(res=>{
     console.log(res );

     if(res.message == "deleted")
    {
      $("#deleteNote").modal("hide");
       this.getNotes();
    }
     
   })
 }
 //==========edit========//
  setValue()
  {
    for(let i = 0 ;i < this.AllNotes.length; i++) 
    {
      if(this.AllNotes[i]._id == this.noteID)
      {
        
        console.log(this.AllNotes[i]._id);
        this.AddNotes.controls.title.setValue(this.AllNotes[i].title);
        this.AddNotes.controls.desc.setValue(this.AllNotes[i].desc);
        
      }
    }
  }

  editNote()
  {
  
    let data = {
      title:this.AddNotes.value.title,
      desc:this.AddNotes.value.desc,
      token:this.token,
      NoteID:this.noteID
    }
    this._NotesService.updateNote(data).subscribe(res=>{

      console.log(res);
      if(res.message == "updated")
      {
        $("#editNote").modal("hide");
        this.getNotes();
        this.AddNotes.reset();
      }
      
    })

    
  }

  ngOnInit(): void {
    
  this.getNotes();
  }

}
