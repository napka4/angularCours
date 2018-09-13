import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AlbumService } from '../album.service';
import { Album } from '../album';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private albumService: AlbumService) { }

  albums: Album[] = [];

  ngOnInit() {}

  @Output() onSearch: EventEmitter<Album[]> = new EventEmitter();

  onSubmit(form: NgForm): void {

    let results = this.albumService.search(form.value['word']);
    if (results.length > 0) {
      this.onSearch.emit(results);
    }
    //console.log(this.albumService.search['word']); //on recup l'objet formulaire et l'input 'word'
  }
}
