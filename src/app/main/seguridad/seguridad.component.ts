import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
  styleUrls: ['./seguridad.component.css']
})
export class SeguridadComponent implements OnInit {

	public data: any[];

  constructor(private _http: Http) {}

      ngOnInit(): void {
	this._http.get("assets/data_contact.json")
      .subscribe((data)=> {
        setTimeout(()=> {
          this.data = data.json();
        }, 2000);
      });
	  
  }
  
  public ngForCallback() {
		alert('ngFor finish');
  }
  


}
