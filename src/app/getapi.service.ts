import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetapiService {
  constructor(private http: HttpClient) {
  }

  getData(){
    let url = "https://jsonplaceholder.typicode.com/todos/";
    return this.http.get(url);
  }
}