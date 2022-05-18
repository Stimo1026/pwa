import { Component } from '@angular/core';
import{ GetapiService } from './getapi.service'
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tictactoe';
  data:any=[];
  dbData:any=[];
  constructor(private user: GetapiService, private dbService: NgxIndexedDBService){
      this.user.getData().subscribe(data => {
        this.data=data;
      });
      this.dbService.getAll('games').subscribe((games) => {
        this.dbData=games;
      });
  
    }
  }
