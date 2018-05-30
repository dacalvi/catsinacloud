import {
  Component,
  OnInit
} from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';

import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import * as xml2js from 'xml2js';
import { ActivatedRoute} from '@angular/router';

@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'home'.
   */
  selector: 'home',  // <home></home>
  /**
   * We need to tell Angular's Dependency Injection which providers are in our app.
   */
  providers: [
    Title
  ],
  /**
   * Our list of styles in our component. We may add more to compose many styles together.
   */
  styleUrls: [ './home.component.css' ],
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  /**
   * Set our default values
   */
  public localState = { value: '' };
  /**
   * TypeScript public modifiers
   */

  public list;
  public urlCats = 'http://thecatapi.com/api/images/get?format=xml&results_per_page=100';
  public urlCatsHats = 'http://thecatapi.com/api/images/get?format=xml&results_per_page=20&category=hats';
  public urlCatsSpace = 'http://thecatapi.com/api/images/get?format=xml&results_per_page=20&category=space';


   
  constructor(
    public appState: AppState,
    public title: Title,
    private http: HttpClient,
    private route:ActivatedRoute
  ) {}

  public ngOnInit() {
    this.route.url.subscribe(url => {
      
      if(typeof url != 'undefined' &&  typeof url[1] != 'undefined'){
        console.log('si');
        var myurl = url[1].path;
      }else{
        console.log('no');
        var myurl = this.urlCats;
      }

      if(myurl == 'hats'){
        //TODO use DRY
        this.http.get(this.urlCatsHats, {responseType: 'text'}).subscribe(res => {
          xml2js.parseString( res, (err, result) => {
            this.list = result.response.data[0].images[0].image;
          })
        });
      }else if(myurl == 'space'){
        this.http.get(this.urlCatsSpace, {responseType: 'text'}).subscribe(res => {
          xml2js.parseString( res, (err, result) => {
            this.list = result.response.data[0].images[0].image;
          })
        });
      }else{
        this.http.get(myurl, {responseType: 'text'}).subscribe(res => {
          xml2js.parseString( res, (err, result) => {
            this.list = result.response.data[0].images[0].image;
          })
        });
      }
    
    });
    
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
