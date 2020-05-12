import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public movie: any;
  constructor(private http: HttpClient, private location: Location) {
    this.movie = {
      "movieTitle": "",
      "movieGenre": "",
      "formats": {
          "digital": false,
          "bluRay": false,
          "dvd": false
      }
    };
  }

  public ngOnInit() { }

  public save() {
    //console.log(this.movie);
    if(this.movie.movieTitle) {
        let options = { headers:new HttpHeaders({ "Content-Type": "application/json" })};
        this.http.post("http://192.168.1.45:3000/movies", JSON.stringify(this.movie), options)
            .subscribe(result => {
                this.location.back();
            });
    }
}
}
