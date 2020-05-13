import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Http } from '@angular/http';
import { Location } from '@angular/common';
import "rxjs/Rx";
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  public movies: any;
  public afterSearch: any;
  public beforeSearch: any;
  public selectedMovie: boolean;

  public constructor(private router: Router, private http: HttpClient, private location: Location) {
      this.movies = [];
  }

  public ngOnInit() {
    this.location.subscribe(() => {
        this.refresh();
    });
    this.refresh();
  }

  public refresh(query?: any) {
    let url = "http://192.168.1.45:3000/movies";
    if(query && query.target.value) {
      console.log("Sono qui Dentro!!! : " + query.target.value);
      console.log(query);
      url = "http://192.168.1.45:3000/movies/" + query.target.value;
    }
    this.http.get(url)
        .pipe(map(result => result))
        .subscribe(result => {
            console.log(result);
            //this.movies = result;
            this.movies = result;
        });
  }

  public create() {
    this.router.navigate(["create"]);
  }
  public navigateToDetails() {
    this.router.navigate(["movie-details"]);
  }
  public onSelect(movie) {
    movie.selectedMovie = true;
  }
}