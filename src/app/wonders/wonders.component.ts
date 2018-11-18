import { Component, OnInit } from '@angular/core';
import { WondersService } from '../services/wonders.service';
import { Wonders } from '../models/wonders.model';

@Component({
  selector: 'app-wonders',
  templateUrl: './wonders.component.html',
  styleUrls: ['./wonders.component.scss']
})
export class WondersComponent implements OnInit {

  constructor(public wondersService: WondersService) { }

  ngOnInit() {
    this.wondersService.getWonders();
    window.addEventListener('unload', () => {
      const wonderLikes = this.wondersService.likesRecord;
      const hits = this.wondersService.totalApiHits;
      localStorage.setItem('wonderLikes', JSON.stringify(wonderLikes));
      localStorage.setItem('wonderHits', JSON.stringify(hits));
    });
  }

  getRating(rating) {
    return `${+rating * 20}%`;
  }

  updateLike(wonder: Wonders) {
    const record = this.wondersService.likesRecord[wonder.id];
    console.log(record);
    if (!record.flag) {
      record.flag = true;
      record.likes += 1;
      wonder.likes += 1;
      wonder.flag = true;
      this.wondersService.totalLikes += 1;
    } else {
      record.flag = false;
      record.likes -= 1;
      wonder.likes -= 1;
      wonder.flag = false;
      this.wondersService.totalLikes -= 1;
    }
  }

}
