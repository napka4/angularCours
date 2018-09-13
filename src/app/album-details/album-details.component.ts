import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Album, List } from '../album';
import { AlbumService } from '../album.service';


@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit {

  @Input() album : Album;

  albumLists: List[] = [];
  list: List;
  songs:Array<string> = [];

  @Output() onPlay: EventEmitter<Album> = new EventEmitter();


  constructor(private albumService: AlbumService) { }

  ngOnInit() {}

  ngOnChanges(){

    if(this.album){
    this.list = this.albumService.getAlbumList(this.album.ref);
    this.songs = this.list.list;
    }
  }


}
