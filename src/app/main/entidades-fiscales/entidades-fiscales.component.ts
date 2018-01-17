import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import {Http,  Headers, RequestOptions, Response} from "@angular/http";
import { Router, NavigationEnd } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MapsAPILoader, AgmMap } from '@agm/core';
import * as MyGlobals from 'app/service/globals'; //<== Globals variables

@Component({
  selector: 'app-entidades-fiscales',
  templateUrl: './entidades-fiscales.component.html',
  styleUrls: ['./entidades-fiscales.component.css']
})
export class EntidadesFiscalesComponent implements OnInit {

public latitude: number;
	public longitude: number;
	public searchControl: FormControl;
	public zoom: number;

	@ViewChild("search")
	public searchElementRef: ElementRef;
  
	@ViewChild(AgmMap)
	public agmMap: AgmMap
	
	public data: any[];
	public fiscalEntity: any[];
	public entidad:any[];
	public share: any[];
	public filterQuery = "";
	public rowsOnPage = 10;
	public sortBy = "id";
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
	showTableFiscalEntities:boolean = true;
	showFiscalEntity:boolean = false;
	//contactshare:boolean=true;
	//entity:boolean=true;
	
	constructor(private _http: Http, private router: Router, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

	ngOnInit(): void {
		this._http.get(MyGlobals['apiurl'] + "fiscalentitities_view")
		.subscribe((data)=> {
			this.data = data.json();
			console.log(this.data);
		}); 
	}
	
	showFiscalEntityFunction(entityId){
	  
			if(entityId){
				this._http.get(MyGlobals['apiurl'] + "fiscalentities/" + entityId)
				.subscribe((data)=> {
					this.fiscalEntity = data.json();
					console.log(this.fiscalEntity);
					
					
					if(this.fiscalEntity['address']){
							this.address['addressName'] = this.fiscalEntity['address'].addressName;
							this.address['addressNumber'] = this.fiscalEntity['address'].addressNumber;
							this.address['floorDoor'] = this.fiscalEntity['address'].floorDoor;
							this.address['sendName'] = this.fiscalEntity['address'].sendName;
							this.address['sendBusinessName'] = this.fiscalEntity['address'].sendBusinessName;
							this.address['postalcode'] = this.fiscalEntity['address'].postalcode;
							this.address['town'] = this.fiscalEntity['address'].town;
							this.address['province'] = this.fiscalEntity['address'].province;
							this.address['district'] = this.fiscalEntity['address'].district;
							this.address['country'] = this.fiscalEntity['address'].country;
							this.address['latitude'] = this.fiscalEntity['address'].latitude;
							this.address['longitude'] = this.fiscalEntity['address'].longitude;
						}
						
						this.showFiscalEntity = true;
						this.showTableFiscalEntities = false;
					});

			}else{
				this.fiscalEntity = [];
				this.fiscalEntity['id'] = "0";
				
				this.showFiscalEntity = true;
				this.showTableFiscalEntities = false;
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
	
    saveFiscalEntity(entityId){

		if(entityId != '0'){ //PUT
			console.log(this.encodeJSON(this.fiscalEntity));
			console.log(this.encodeJSON(this.fiscalEntity['address']));
			
			var urlupdateentity = MyGlobals['apiurl'] + "fiscalentities/" +this.fiscalEntity['id'];
		  
			let headers = new Headers({
				'Content-Type': 'application/x-www-form-urlencoded'
			});
			let options = new RequestOptions({
				headers: headers
			});

			console.log(headers);
			this._http.post(urlupdateentity, this.encodeJSON(this.fiscalEntity), options)
					.subscribe(data=>{
							console.log('Update entity!!!!');
						
					});
			
		}

		else{ //POST
			console.log(this.fiscalEntity);
			console.log(this.encodeJSON(this.fiscalEntity));
			
			var url = MyGlobals['apiurl'] + "fiscalentities";
		  
			let headers = new Headers({
				'Content-Type': 'application/x-www-form-urlencoded'
			});
			let options = new RequestOptions({
				headers: headers
			});

			this._http.post(url, this.encodeJSON(this.fiscalEntity), options)
				.map((response: Response) =>response.json())
				.subscribe(data=>{
					console.log(data);
				}); 
			
			
		}	
	
	}
	
	saveFiscalEntityAddress(addressname, addressnumber, floordoor, postalcode, town, province, district, country, sendname, sendbusinessname, lat, lng){
			
			if(!this.fiscalEntity['address']){
				this.fiscalEntity['address'] = Object.assign(this.address);
			}
			
				this.fiscalEntity['address'].addressName = addressname;
				this.fiscalEntity['address'].addressNumber = addressnumber;
				this.fiscalEntity['address'].floorDoor = floordoor;
				this.fiscalEntity['address'].sendName = sendname;
				this.fiscalEntity['address'].sendBusinessName = sendbusinessname;
				this.fiscalEntity['address'].postalcode = postalcode;
				this.fiscalEntity['address'].town = town;
				this.fiscalEntity['address'].province = province;
				this.fiscalEntity['address'].district = district;
				this.fiscalEntity['address'].country = country;
				this.fiscalEntity['address'].latitude = lat;
				this.fiscalEntity['address'].longitude = lng;
				console.log(this.fiscalEntity);

	}
	
	goShare(id){
		this.router.navigate(['/fiscalentities'], { queryParams: { param: 'gotoshare', id: id } });
		this.share
		//console.log(this.fiscalEntity['share'].percentage)
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


}
