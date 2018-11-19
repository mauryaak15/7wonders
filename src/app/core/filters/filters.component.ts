import { Component, OnInit, Renderer2 } from '@angular/core';
import { WondersService } from 'src/app/services/wonders.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  sortOptions = [{
    name: 'Select',
    value: ''
  }, {
    name: 'Ratings',
    value: 'ratings'
  }, {
    name: 'Likes',
    value: 'likes'
  }];
  dropDownstate = false;
  order = '';

  constructor(public wondersService: WondersService,
              private renderer: Renderer2) { }

  ngOnInit() {
    // document.addEventListener('click', () => {
    //   this.renderer.addClass(document.querySelector('.select-options'), 'hide');
    // });
  }

  onSearch(query) {
    this.wondersService.onSearch.emit(query);
    if (this.order) {
      this.wondersService.sortWonders(this.order);
    }
  }

  toggleDropDown() {
    this.dropDownstate = !this.dropDownstate;
  }

  chooseOption(value) {
    this.dropDownstate = !this.dropDownstate;
    this.order = value;
    this.wondersService.sortWonders(value);
  }

}
