import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-centros',
  templateUrl: './centros.component.html',
  styleUrls: ['./centros.component.css']
})
export class CentrosComponent implements OnInit {

  public data: object;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "id";
  public sortOrder = "asc";
  private showId = false;
  
  private GoToCenter = "";

  
  showTableCenter:boolean = true;
  showCenter:boolean = false;
 

  constructor(private _http: Http, private actroute:ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
	
	this.actroute.queryParams
    .subscribe(params => {
        this.GoToCenter = params['param']; 
    });
	
	if(this.GoToCenter == null){
			this._http.get("assets/data_center.json")
			  .subscribe((data)=> {
					this.data = data.json();
					console.log(this.data);	
					  /*var options = { 
						fieldSeparator: ';',
						quoteStrings: '"',
						decimalseparator: '.',
						showLabels: true, 
						showTitle: false,
						useBom: true
					  };*/			
					//new Angular2Csv(this.data, 'My Report', options);	
					//Para generar el Csv llamaremos a una funcion que nos devuelva el json especifico. Con la llamada de más arriba se genera el CSV.
			  });
	}
	else{
			this.showCenterFunction();
	}
  }
  
  showCenterFunction(){
	this.showCenter = true;
	this.showTableCenter = false;
  }

}
