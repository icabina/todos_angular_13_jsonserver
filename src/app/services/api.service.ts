import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postTodo(data:any){
    return this.http.post<any>("http://localhost:3000/todoList/", data );
  }

  getTodos(){
    return this.http.get<any>("http://localhost:3000/todoList/");  }

  putProduct(data:any, id: number){
    return this.http.put<any>("http://localhost:3000/todoList/"+ id, data );

  }
  deleteProduct(id:number){
    return this.http.delete<any>("http://localhost:3000/todoList/"+ id );
  }
}