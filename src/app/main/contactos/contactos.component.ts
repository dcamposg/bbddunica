import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import {Http,  Headers, RequestOptions, Response} from "@angular/http";
import { Router, NavigationEnd } from '@angular/router';

import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

import * as MyGlobals from 'app/service/globals'; //<== Globals variables

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;
  
  public contact: object;
  public data: any[];
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "idinternal";
  public sortOrder = "asc";
  private showId = false;
  public place: google.maps.places.PlaceResult;
  public address : object[] = [
								  {
									"StreetNumber": "",
									"StreetName ": "",
									"City ": "",
									"State1 ": "",
									"State2 ": "",									
									"Country ": "",
									"Zip ": " ",
									"Lat ": "",
									"Lng ": "",
								  }
								];
  
  showTableContacts:boolean = true;
  showContact:boolean = false;

  constructor(private _http: Http, private router: Router, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

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
	  
	  
	      //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          this.place = autocomplete.getPlace();

          //verify result
          if (this.place.geometry === undefined || this.place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = this.place.geometry.location.lat();
          this.longitude = this.place.geometry.location.lng();
          this.zoom = 12;
		  
		  console.log(this.place);
		  
		  this.address = [];
		  this.place.address_components.forEach(item => {
				switch(item.types[0]){
						case 'street_number':
							this.address['StreetNumber'] = item.long_name;
							break;
						case 'route':
							this.address['StreetName'] = item.long_name;
							break;
						case 'neighborhood': case 'locality':
							this.address['City'] = item.long_name;
							break;
						case 'administrative_area_level_2':
							this.address['State1'] = item.long_name;
							break;							
						case 'administrative_area_level_1':
							this.address['State2'] = item.long_name;
							break;
						case 'country':
							this.address['Country'] = item.long_name;
							break;
						case 'postal_code':
							this.address['Zip'] = item.long_name;
							break;
            }
			  });
				 this.address['Lat'] = this.latitude;
				 this.address['Lng'] = this.longitude;
				 console.log(this.address);
		  
        });
      });
    });
  }
  
  goCenter(id_center){
		this.router.navigate(['/centros'], { queryParams: { param: 'gotocenter', id: id_center } });
  }
  
  resizeTrigger(){	  
	  setTimeout(()=>{    //<<<---    using ()=> syntax
				   window.dispatchEvent(new Event('resize'))
			 },1000);
  }
  
    private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
  
  
  
  
  
  
	  addContactFunction(){
		  let body = JSON.stringify({
						idinternal: 0,
						dninif: "",
						firstname: "",
						lastname1: "",
						lastname2: "",
						gender: "",
						birthdate: "",
						contactaddress: "",
						languagecommunication: "",
						telephoneoffice: "",
						telephonepersonal: "",
						mobile: "",
						skype: "",
						emailoffice: "",
						emailpersonal: "",
						observations: "",
						alexuser: "",
						clothingsize: "",
						imagepath: ""
			}); 
		  let headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
		  var url = MyGlobals['apiurl'] + "contacts";
		  this._http.post(url, body, {headers: headers}).map((response: Response) =>response.text()).subscribe(res => {console.log(res);});
		  console.log(body);          
	  }

  
  
  

}
