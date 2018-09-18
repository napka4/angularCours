import { Injectable } from '@angular/core';
import { Album, List, CallableAlbum } from '../app/album';
import { ALBUMS, ALBUM_LISTS } from '../app/mock-albums';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private _albums: Album[] = ALBUMS;
  private _albumList: List[] = ALBUM_LISTS;

  sendCurrentNumberPage = new Subject<number>(); // pour mettre à jour la pagination 

  constructor() { }

  getAlbums(): Album[] {
    return this._albums;
  }

  getAlbum(ref: string): Album | void {
    return this._albums.find(album => album.ref === ref);
  }

  getAlbumList(ref: string): List {
    return this._albumList.find(list => list.ref === ref);
  }

  order(callBack: CallableAlbum): AlbumService {
    this._albums = this._albums.sort(callBack);
    return this;
  }

  limit(start: number = 0, end: number = 10): AlbumService {
    this._albums = this._albums.slice(start, end);
    return this;
  }

  search(word: string) {
    return this._albums.filter(album => album.title.trim().toLowerCase().includes(word.trim().toLowerCase()));
  }

  paginate(start: number, end: number): Album[] {
    return this._albums.slice(start, end);
  }

  currentPage(page: number) {
    return this.sendCurrentNumberPage.next(page);
  }
}
