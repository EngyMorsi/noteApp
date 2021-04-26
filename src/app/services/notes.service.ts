import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  baseUrl="https://routeegypt.herokuapp.com/"

  constructor(private _HttpClient:HttpClient) { }

  getUserNotes(data:any):Observable<any>
  {
   return this._HttpClient.post(this.baseUrl+'getUserNotes',data)
  }
  addNote(data:any):Observable<any>
  {
   return this._HttpClient.post(this.baseUrl+'addNote',data)
  }
  updateNote(data:any):Observable<any>
  {
   return this._HttpClient.put(this.baseUrl+'updateNote',data)
  }

  deleteNote(data:any):Observable<any>
  {
    let option ={
      headers:new HttpHeaders({
      }),
      
      body:{
        
         token:data.token,
         NoteID:data.NoteID
      }
    }
    return this._HttpClient.delete(this.baseUrl+'deleteNote', option)
  }
 
}

