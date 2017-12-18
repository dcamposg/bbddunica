import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";

@Component({
  selector: 'app-centros',
  templateUrl: './centros.component.html',
  styleUrls: ['./centros.component.css']
})
export class CentrosComponent implements OnInit {

  public data: any[];
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "id";
  public sortOrder = "asc";
  private showId = false;
  
  showTableCenter:boolean = true;
  showCenter:boolean = false;

  constructor(private _http: Http) { }

    ngOnInit(): void {
    this._http.get("assets/data_center.json")
      .subscribe((data)=> {
        setTimeout(()=> {
          this.data = data.json();
        }, 2000);
      });
  }
  
  showCenterFunction(){
	this.showCenter = true;
	this.showTableCenter = false;
  }

}
