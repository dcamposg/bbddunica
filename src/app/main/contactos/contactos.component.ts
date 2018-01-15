import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import {Http,  Headers, RequestOptions, Response} from "@angular/http";
import { Router, NavigationEnd } from '@angular/router';

import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader, AgmMap } from '@agm/core';

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
  
  @ViewChild(AgmMap)
public agmMap: AgmMap
  
  public contact: any[];
  public data: any[];
  public languages: any[];
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "idinternal";
  public sortOrder = "asc";
  private showId = false;
  public place: google.maps.places.PlaceResult;
  public address : object = {
									"addressNumber": "",
									"addressName": "",
									"town": "",
									"district": "",
									"province": "",									
									"country": "",
									"postalcode": " ",
									"latitude": "",
									"longitude": "",
									"floorDoor": "",
									"sendName": "",
									"sendBusinessName": ""
								  };
  /*public language : object = {
									"id": "",
									"name": ""
								  };*/	//****************************************************************************************************************				
  
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
	
	this._http.get(MyGlobals['apiurl'] + "languages")
      .subscribe((data)=> {
          this.languages = data.json();
		  console.log(this.languages);
      });
  }
  
	  showContactFunction(contactId){
	  
			  if(contactId){
					this._http.get(MyGlobals['apiurl'] + "contacts/" + contactId)
				  .subscribe((data)=> {
						this.contact = data.json();
						console.log(this.contact);
						
						if(this.contact['address']){
							this.address['addressName'] = this.contact['address'].addressName;
							this.address['addressNumber'] = this.contact['address'].addressNumber;
							this.address['floorDoor'] = this.contact['address'].floorDoor;
							this.address['sendName'] = this.contact['address'].sendName;
							this.address['sendBusinessName'] = this.contact['address'].sendBusinessName;
							this.address['postalcode'] = this.contact['address'].postalcode;
							this.address['town'] = this.contact['address'].town;
							this.address['province'] = this.contact['address'].province;
							this.address['district'] = this.contact['address'].district;
							this.address['country'] = this.contact['address'].country;
							this.address['latitude'] = this.contact['address'].latitude;
							this.address['longitude'] = this.contact['address'].longitude;
						}
						
						this.showContact = true;
						this.showTableContacts = false;			
				  });
			  
			  }
	  
			  else{
				this.contact = [];
				//this.contact['address'] = Object.assign(this.address);
				//this.contact['language'] = this.language;	//**********************************************************************************************
				this.contact['idinternal'] = "0";
				this.contact['idlanguagecommunication'] = MyGlobals['idLanguage'];
				this.contact['gender'] = "M";
				this.showContact = true;
				this.showTableContacts = false;	
			  }
	  

			//set google maps defaults
			this.zoom = 10;
			this.latitude = 41.7291693;
			this.longitude = 1.8209664;

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
				  
				  //this.address = [];
				  this.place.address_components.forEach(item => {
						switch(item.types[0]){
								case 'street_number':
									this.address['addressNumber'] = item.long_name;
									break;
								case 'route':
									this.address['addressName'] = item.long_name;
									break;
								case 'neighborhood': case 'locality':
									this.address['town'] = item.long_name;
									break;
								case 'administrative_area_level_2':
									this.address['district'] = item.long_name;
									break;							
								case 'administrative_area_level_1':
									this.address['province'] = item.long_name;
									break;
								case 'country':
									this.address['country'] = item.long_name;
									break;
								case 'postal_code':
									this.address['postalcode'] = item.long_name;
									break;
					}
					  });
						 this.address['latitude'] = this.latitude;
						 this.address['longitude'] = this.longitude;
						 console.log(this.address);
				  
				});
			  });
			});
	  }
	  
	  saveContact(contactId){
	  
			if(contactId != '0'){ //PUT
			
				//alert('Editar contacto ' + contactId);
				//console.log(this.address);
				//console.log(this.contact);
				//console.log(this.contact['address']);
				//console.log(this.encodeJSON(this.contact));
				//console.log(this.encodeJSON(this.contact['address']));
				//console.log(this.encodeJSON(this.contact['address']));
				//this.contact['address'].idAuxCenter = "";
				//this.contact['idcontactaddress'] = null;
				//console.log(this.encodeJSON(this.contact));
				
				var urlupdatecontactaddress = MyGlobals['apiurl'] + "addresses/" + this.contact['address'].id;
				var urlupdatecontact = MyGlobals['apiurl'] + "contacts/" +this.contact['idinternal'];
			  
				let headers = new Headers({
					'Content-Type': 'application/x-www-form-urlencoded'
				});
				let options = new RequestOptions({
					headers: headers
				});
					  
			/*this._http.post(urlupdatecontactaddress, this.encodeJSON(this.contact['address']), options)
					.map((response: Response) =>response.json())
					.subscribe(data=>{
						console.log(data);
						//this.contact['address'] = [];
								this._http.post(urlupdatecontact, this.encodeJSON(this.contact), options)
								.map((response: Response) =>response.json())
								.subscribe(data=>{
									console.log(data);
								}); 
							
						
					});*/
					
					this._http.post(urlupdatecontact, this.encodeJSON(this.contact), options)
					.map((response: Response) =>response.json())
					.subscribe(data=>{
						console.log(data);
					}); 					
				
			}
	  
			else{ //POST
			
				//alert('Nuevo contacto');
				console.log(this.contact);
				console.log(this.encodeJSON(this.contact));
				
				var url = MyGlobals['apiurl'] + "contacts";
			  
				let headers = new Headers({
					'Content-Type': 'application/x-www-form-urlencoded'
				});
				let options = new RequestOptions({
					headers: headers
				});

			//EXAMPLE x-www-form-urlencoded ==> 'email=' + 'email1' + '&password=' + 'password1' + ...;
			
			  
			this._http.post(url, this.encodeJSON(this.contact), options)
					.map((response: Response) =>response.json())
					.subscribe(data=>{
						console.log(data);
					}); 
				
				
			}	
			
	  }
	  
	  /*genderChange(){
		if(this.contact['gender'] == 'M'){this.contact['gender']  = 'F';}
		else{this.contact['gender']  = 'M';}
	  }*/
	  
	  saveContactAddress(addressname, addressnumber, floordoor, postalcode, town, province, district, country, sendname, sendbusinessname, lat, lng){
			//alert(addressname + '-' + addressnumber + '-' + floordoor + '-' + postalcode + '-' + town + '-' + province + '-' + district +'-' + country + '-' + lat + '-' + lng);
			
			if(!this.contact['address']){
					//this.contact['address'] = this.address;
					this.contact['address'] = Object.assign(this.address);
			}
			
				this.contact['address'].addressName = addressname;
				this.contact['address'].addressNumber = addressnumber;
				this.contact['address'].floorDoor = floordoor;
				this.contact['address'].sendName = sendname;
				this.contact['address'].sendBusinessName = sendbusinessname;
				this.contact['address'].postalcode = postalcode;
				this.contact['address'].town = town;
				this.contact['address'].province = province;
				this.contact['address'].district = district;
				this.contact['address'].country = country;
				this.contact['address'].latitude = lat;
				this.contact['address'].longitude = lng;
				console.log(this.contact);

	  }
  
  
	  
	  goCenter(id_center){
			this.router.navigate(['/centers'], { queryParams: { param: 'gotocenter', id: id_center } });
	  }
	  
	  
  
	  resizeTrigger(){	  
		  setTimeout(()=>{
					   this.agmMap.triggerResize();
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
	  
	
	encodeJSON(toConvert) {
		const formBody = [];
		for (const property in toConvert) {
		//console.log(toConvert[property]);
		if(typeof toConvert[property] !== "object"){
			const encodedKey = encodeURIComponent(property);
			const encodedValue = encodeURIComponent(toConvert[property]);
			formBody.push(encodedKey + '=' + encodedValue);
		}
		else if(toConvert[property] == null){	
			const encodedKey = encodeURIComponent(property);
			const encodedValue = encodeURIComponent("");
			formBody.push(encodedKey + '=' + encodedValue);
		}
		else{	
			for (const property2 in toConvert[property]) {
					if(toConvert[property][property2] == null){	
						const encodedKey = encodeURIComponent(property + '[' + property2 + ']');
						const encodedValue = encodeURIComponent("");
						formBody.push(encodedKey + '=' + encodedValue);
						}
					else{
						const encodedKey =  encodeURIComponent(property + '[' + property2 + ']');
						const encodedValue = encodeURIComponent(toConvert[property][property2]);
						formBody.push(encodedKey + '=' + encodedValue);
						}
			}
		}
		}
		return formBody.join('&');
	}
	
		/*encodeJSON(toConvert) {
		const formBody = [];
		for (const property in toConvert) {
			//console.log(toConvert[property]);
			//const encodedKey = encodeURIComponent(property);
			//const encodedValue = encodeURIComponent(toConvert[property]);
			formBody.push(property + '-' + toConvert[property] + '-' + typeof toConvert[property]);
		}
		return formBody.join('&&&&&&&&');
	}*/
  

}
