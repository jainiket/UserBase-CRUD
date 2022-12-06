import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUser(userId:any){
    return this.http.get(`http://localhost:9001/user/getUser/${userId}`);
  }
  
  addUser(body:any){
    return this.http.post('http://localhost:9001/user/createUser',body);
  }

  updateUser(userId:any,body:any){
    return this.http.post(`http://localhost:9001/user/updateUser/${userId}`,body);
  }

  removeUser(userId:any){
    return this.http.delete(`http://localhost:9001/user/removeUser/${userId}`);
  }

  getAllUser(){
    return this.http.get('http://localhost:9001/user/getAllUser');
  }
}
