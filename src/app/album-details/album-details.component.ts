import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Album, List } from '../album';
import { ALBUM_LISTS } from '../mock-albums';
 
@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit {

  @Input() album : Album;
  albumList: List[] = ALBUM_LISTS;
  albumSongs: List = null;


  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){

    if(this.album){
    this.albumSongs = this.albumList.find((list) => list.ref == this.album.ref)
    }
  }

}
