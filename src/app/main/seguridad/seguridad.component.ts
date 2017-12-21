import { Component, OnInit, AfterViewChecked } from '@angular/core';
import {Http} from "@angular/http";

//declare var myExtObject: any;

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
  styleUrls: ['./seguridad.component.css']
})
export class SeguridadComponent implements OnInit {
	
   public data: any[];	
	
  showTableCenter:boolean = true;
  showCenter:boolean = false;

  constructor(private _http: Http) { }

    ngOnInit(): void {
    this._http.get("assets/data_center.json")
      .subscribe((data)=> {
          this.data = data.json();
      });
	  
	   //myExtObject.func1();
  }
  
  
  showCenterFunction(){
	this.showCenter = true;
	this.showTableCenter = false;
  }

}
