import { Component, OnInit} from '@angular/core';
import { MainService } from '../share/main.service';
import { Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';  

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private _main: MainService) { }

  url = 'http://localhost:3000/product'


  ngOnInit() {
    this._main.products$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => this._main.searchProduct(term,this.url)),
    );

  }

  private searchTerms = new Subject<string>();

  search(term: string): void {
    this.searchTerms.next(this.toTitleCase(term));
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

  ngOnDestroy() {
    
    this.searchTerms.unsubscribe();
  }

}
