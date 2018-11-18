import { Wonders } from './../models/wonders.model';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WondersService {

  wonders: Wonders[] = [];
  url = 'https://www.mocky.io/v2/5bdd28dd32000075008c6227';
  loading = true;
  likesRecord = {};
  totalLikes = 0;
  totalApiHits = 0;
  onSearch: EventEmitter<string> = new EventEmitter();
  originalWonders: Wonders[] = [];

  constructor(private http: HttpClient) {
    this.onSearch.subscribe((query: string) => {
      if (!this.loading) {
        if (this.originalWonders.length) {
          this.wonders = this.originalWonders.filter(wonder => wonder.place.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
        }
      }
    });
  }

  getWonders() {
    this.loading = true;
    this.http.get(this.url).subscribe((res: any) => {
      this.loading = false;
      this.wonders = res && res.data;
      this.originalWonders = [...this.wonders];
      this.updateApiHits();
      this.updateLikes();
      console.log(this.wonders);
    }, (err) => {
      this.loading = false;
      console.log('error', err.statusText);
    });
  }

  updateLikes() {
    const wonderLikes = localStorage.getItem('wonderLikes');
    if (wonderLikes) {
      this.likesRecord = JSON.parse(wonderLikes);
      this.wonders.forEach((wonder) => {
        wonder.likes = this.likesRecord[wonder.id].likes;
        wonder.flag = this.likesRecord[wonder.id].flag;
      });
    } else {
      if (this.wonders) {
        console.log('eeeee');
        this.wonders.forEach((wonder) => {
          this.likesRecord[wonder.id] = {
            likes: wonder.likes,
            flag: false
          };
        });
      }
    }
    Object.keys(this.likesRecord).forEach((wonderId) => {
      this.totalLikes += this.likesRecord[wonderId].likes;
    });
  }

  updateApiHits() {
    const hits = localStorage.getItem('wonderHits');
    if (hits) {
      this.totalApiHits = JSON.parse(hits);
    }
    this.totalApiHits += 1;
  }

  sortWonders(type) {
    switch (type) {
      case '':
        this.wonders = [...this.originalWonders];
      break;
      case 'ratings':
        this.wonders.sort((a, b) => {
          return (+b.ratings - +a.ratings);
        });
      break;
      case 'likes':
        this.wonders.sort((a, b) => {
          return (+b.likes - +a.likes);
        });
    }
  }

}
