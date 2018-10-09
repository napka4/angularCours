import { Component, OnInit } from '@angular/core';

import { Album } from '../album';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  titlePage: string = "Page princiaple Albums Music";
  albums: Album[] = [];
  selectedAlbum: Album;

  constructor(private ablumService: AlbumService) { }

  ngOnInit() {
    // this.albums = this.ablumService.getAlbums();

    // ordonner le album par rapport à la durée
    // this.albums = this.ablumService.order((a, b) => {
    //   return a.duration - b.duration
    // }).limit(0, 2).getAlbums();

    // localCompare permet de trier un tableau de chaîne de caractères sans se soucier de la casse
    this.albums = this.ablumService
      .order(
        (a, b) => a.title.localeCompare(b.title)
      )
      .paginate(0, 2); // ne modifie pas le tableau d'albums
  }

  onSelect(album: Album) {
    this.selectedAlbum = album;
  }

  playParent($event) {
    this.ablumService.switchOn($event);
  }

  search($event) {
    // vous pouvez également appliquer de l'ordre dans le résultat.
    if ($event) this.albums = $event;
  }

  paginate($event) {
    this.albums = this.ablumService.paginate($event.start, $event.end);
  }

}