import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import {Injectable} from "@angular/core";

import * as MyGlobals from 'app/service/globals'; //<== Globals variables

@Component({
  selector: 'app-centros',
  templateUrl: './centros.component.html',
  styleUrls: ['./centros.component.css']
})
export class CentrosComponent implements OnInit {

  public centers: object;
  public data: object;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "code";
  public sortOrder = "asc";
  private showId = false;
  
  private GoToCenter = "";
  private GoToCenterId = "";

  
  showTableCenter:boolean = true;
  showCenter:boolean = false;
  showBP:boolean = true;
  showOC:boolean = true;
  showAddress:boolean = true;

  constructor(private _http: Http, private actroute:ActivatedRoute, private router: Router) { }
  
    
  // CHART ***************************************************************************************************************
  public lineChartData1:Array<any> = [{data: [45, 50, 70], label: 'Nº alumnos'}];
  public lineChartLabels1:Array<any> = ['2018 / 2019', '2019 / 2020', '2020 / 2021'];
  
  public lineChartData2:Array<any> = [{data: [45, 50, 70, 95], label: 'Nº alumnos'}];
  public lineChartLabels2:Array<any> = ['2014 / 2015', '2015 / 2016', '2016 / 2017', '2017 / 2018'];
  
  
  
  public lineChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
 
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType1:string = 'bar';
  public lineChartType2:string = 'line';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  
    // FIN CHART ***************************************************************************************************************
  
  

    ngOnInit(): void {
	
	this.actroute.queryParams
    .subscribe(params => {
        this.GoToCenter = params['param']; 
		this.GoToCenterId = params['id'];
    });
	
	if(this.GoToCenter == null){
			//this._http.get("assets/data_center.json")
			this._http.get(MyGlobals['apiurl'] + "centers_view")
			  .subscribe((data)=> {
					this.data = data.json();
					console.log(this.data);						
			  });
	}
	else{
			console.log(this.GoToCenterId);
			this.showCenterFunction(this.GoToCenterId);
	}
  }
  
  showCenterFunction(centerId){
  
	this._http.get(MyGlobals['apiurl'] + "centers/" + centerId)
	  .subscribe((data)=> {
			this.centers = data.json();
			//this.centers['kids'] = 'N'; //Con esto vemos que podemos acceder al valor de un campo concreto. A partir de ello tendremos que hacer una funcion para interpretar los checkbox.
			console.log(this.centers);
	this.showCenter = true;
	this.showTableCenter = false;
	if(this.centers['addressSame'] == 'Y') this.showAddress = false;	
	  });
  }
  
  exportCSV(expcenter, expsimplesociety, expadvancedsociety, expcoordination, expmaster){
	//alert(expcenter + '-' + expsimplesociety + '-' + expadvancedsociety + '-' + expcoordination + '-' + expmaster );
		var options = { 
			fieldSeparator: ';',
			quoteStrings: '"',
			decimalseparator: '.',
			showLabels: true, 
			showTitle: false,
			useBom: true
		  };
		this._http.get(MyGlobals['apiurl'] + "centers_view")
			  .subscribe((data)=> {
					this.data = data.json();
				new Angular2Csv(this.data, 'My Report', options);					
			  });	
		//Para generar el Csv llamaremos a una funcion que nos devuelva el json especifico. Con la llamada de más arriba se genera el CSV.
  }
  
    showBPFunction(){
			this.showBP = !this.showBP;
  }
  
    showOCFunction(){
			this.showOC = !this.showOC;
  }
  
  sameAddress(){
			this.showAddress = !this.showAddress;
  }

}
