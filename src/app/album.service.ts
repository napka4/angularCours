import { Injectable } from '@angular/core';

import { Album, List, CallableAlbum } from './album';
import { ALBUM_LISTS, ALBUMS } from './mock-albums';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private _albums: Album[] = ALBUMS;
  private _albumList: List[] = ALBUM_LISTS;
  private _count: number = 0;

  sendCurrentNumberPage = new Subject<number>(); // pour mettre à jour la pagination
  subjectAlbum = new Subject<Album>(); // pour émettre des informations de l'écoute d'un Album

  constructor(private http : HttpClient) { this._count = ALBUMS.length; }

  getAlbums(): Album[] {

    return this._albums;
  }

  // retourne un album ou rien
  getAlbum(ref: string): Album {

    return this._albums.find(album => album.ref === ref);
  }

  // recherche d'une référence dans la liste
  getAlbumList(ref: string): List {

    return this._albumList.find(list => list.ref === ref);
  }

  order(callable: CallableAlbum): AlbumService {
    this._albums = this._albums.sort(callable);

    return this;
  }

  limit(start: number = 0, end: number = 10): AlbumService {
    this._albums = this._albums.slice(start, end);

    return this;
  }

  // méthode search
  search(word: string): Album[] {
    let re = new RegExp(word.trim(), 'g');

    // filter permet de filter un tableau avec un test dans le test ci-dessous on vérifie 
    // deux choses : 1/ que album.title.match(re) n'est pas vide si c'est le contraire alors c'est pas faux
    // et 2/ si on a trouver des titres qui matchaient/t avec la recherche
    return this._albums.filter(album => album.title.match(re) && album.title.match(re).length > 0);
  }

  paginate(start: number, end: number): Album[] {
    return this._albums.slice(start, end);
  }

  currentPage(page: number) {
    return this.sendCurrentNumberPage.next(page);
  }

  // retourne le nombre d'albums 
  count(): number { return this._count; }

  emitAlbumSubject(album : Album){
    this.subjectAlbum.next(album); // Le Subject est également un Observer
  }

  // Audio-player 
  switchOn(album: Album) {

    this._albums.forEach(
      a => {
        if (a.ref === album.ref) album.status = 'on';
        else
          a.status = 'off';
      }
    );

    this.subjectAlbum.next(album); // Observer puscher les informations
  }

  // Cette méthode n'a pas besoin d'émettre une information à l'Observable
  switchOff(album: Album) {
    this._albums.forEach(
      a => {
        a.status = 'off';
      }
    );
  }
}