import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {

  public data: any[];
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "id";
  public sortOrder = "asc";
  private showId = false;
  
  showTableContacts:boolean = true;
  showContact:boolean = false;

  constructor(private _http: Http, private router: Router) { }

    ngOnInit(): void {
    this._http.get("assets/data_contact.json")
      .subscribe((data)=> {
          this.data = data.json();
      });
  }
  
  showContactFunction(){
	this.showContact = true;
	this.showTableContacts = false;
  }
  
  goCenter(id_center){
		this.router.navigate(['/centros'], { queryParams: { param: 'gotocenter', id: id_center } });
  }

}
