import { Component, OnInit } from '@angular/core';

import { Album } from '../album';
import { ALBUMS } from '../mock-albums';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  titlePage: string = "Page Principale Albums Music";
  albums: Album[] = ALBUMS; // variable accessible dans le template

  albumSelected : Album = null;

  constructor() {}

  onSelected(album:Album) {
    //console.log(album);
    this.albumSelected = album;

  }

  ngOnInit() {
  }

}
