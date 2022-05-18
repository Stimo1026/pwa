import { DOCUMENT } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  gameRunning: boolean = false;
  tiles: any[] = [];
  xIsNext: boolean = true;
  winner: any = null;
  xName: string = "";
  oName: string = "";
  moves: number = 0;
  playable: boolean = true;
  gamesDB: any;  

  constructor(
    private dbService: NgxIndexedDBService){

    }

  ngOnInit(): void {
    this.newGame();

  }

  newGame(){
    this.tiles = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
    this.gameRunning = false;
    this.moves = 0;
    this.playable = true;
  } 

  get player(){
    return this.xIsNext ? "X" : "O";
  }

  makeMove(i: number){
    if(!this.playable){
      return;
    }
    if(!this.tiles[i]){
      this.tiles.splice(i, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }
    this.moves++;
    this.winner = this.whoWin();
    if(this.winner != null){
      this.storeInDb();
    }
  }

  whoWin(){
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    for(let i = 0; i < lines.length; i++){
      const [a, b, c] = lines[i];
      if(
          this.tiles[a] &&
          this.tiles[a] === this.tiles[b] &&
          this.tiles[a] === this.tiles[c]
      ){
        this.playable = false;
        return String(this.tiles[a]);
      }
    }
    if(this.moves == 9){
      return "draw";
    }
    return null;
  }


  startGame(){
    this.xName = (<HTMLInputElement>document.getElementById("xName")).value;
    this.oName = (<HTMLInputElement>document.getElementById("oName")).value;
    if(this.xName === "" || this.oName === ""){
      console.log("try again");
    }else{
      this.gameRunning = true;
    }
  }

  storeInDb(){
    this.dbService
  .add('games', {
    xPlayer: this.xName,
    oPlayer: this.oName,
    winner: this.winner,
    date: Date()
  }).subscribe((key) => {});
  }

}

