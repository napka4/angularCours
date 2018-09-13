import { Component, OnInit } from '@angular/core';

import { Album } from '../album';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  titlePage: string = "Page Principale Albums Music";
  albums: Album[] = [];
  albumSelected : Album;
  status: string = null; 

  constructor(private albumService: AlbumService) {}

/*   playParent($event) {
    console.log(event);
    this.status = $event.ref;
  } */
  ngOnInit() {
    //this.albums = this.albumService.getAlbums();
    this.albums = this.albumService.order((a,b) => { return b.duration - a.duration}).limit(0,3).getAlbums();
  }

  onSelected(album:Album) {
    //console.log(album);
    this.albumSelected = album;
  }

  playParent($event) {
    this.status = $event.ref;
  }

  mySearch($event) {
   if ($event) this.albums = $event;
  }
}
