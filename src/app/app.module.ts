import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TileComponent } from './tile/tile.component';
import { BoardComponent } from './board/board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbButton, NbButtonModule, NbInputModule, NbCardModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';


const dbConfig: DBConfig = {
  name: 'gamesDb',
  version: 1,
  objectStoresMeta: [{
    store: 'games',
    storeConfig: {keyPath: 'id', autoIncrement: true},
    storeSchema: [
      {name: 'xPlayer', keypath: 'xPlayer', options: { unique: false}},
      {name: 'oPlayer', keypath: 'oPlayer', options: { unique: false}},
      {name: 'winner', keypath: 'winner', options: { unique: false}},
      {name: 'date', keypath: 'date', options: { unique: false}}
    ]
  }]
};

@NgModule({
  declarations: [
    AppComponent,
    TileComponent,
    BoardComponent  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerImmediately'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
