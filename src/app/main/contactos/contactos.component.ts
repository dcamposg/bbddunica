import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";

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

  constructor(private _http: Http) { }

    ngOnInit(): void {
    this._http.get("assets/data_contact.json")
      .subscribe((data)=> {
        setTimeout(()=> {
          this.data = data.json();
        }, 2000);
      });
  }
  
  showContactFunction(){
	this.showContact = true;
	this.showTableContacts = false;
  }

}
