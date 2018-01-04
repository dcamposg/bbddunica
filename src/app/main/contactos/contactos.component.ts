import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import { Router, NavigationEnd } from '@angular/router';

import * as MyGlobals from 'app/service/globals'; //<== Globals variables

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {

  public contact: object;
  public data: any[];
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "idinternal";
  public sortOrder = "asc";
  private showId = false;
  
  showTableContacts:boolean = true;
  showContact:boolean = false;

  constructor(private _http: Http, private router: Router) { }

    ngOnInit(): void {
    this._http.get(MyGlobals['apiurl'] + "contacts_view")
      .subscribe((data)=> {
          this.data = data.json();
		  console.log(this.data);
      });
  }
  
  showContactFunction(contactId){
  
  	this._http.get(MyGlobals['apiurl'] + "contacts/" + contactId)
	  .subscribe((data)=> {
			this.contact = data.json();
			console.log(this.contact);
			this.showContact = true;
			this.showTableContacts = false;			
	  });
  }
  
  goCenter(id_center){
		this.router.navigate(['/centros'], { queryParams: { param: 'gotocenter', id: id_center } });
  }

}
