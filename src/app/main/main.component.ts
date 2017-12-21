import { Component, OnInit } from '@angular/core';
import { Adal4HTTPService, Adal4Service } from 'adal-angular4';
import { Router, NavigationEnd } from '@angular/router';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  options = { //Opciones de la barra de progreso
    minimum: 0.15,
    maximum: 1,
    ease: 'easeOutCubic',
    speed: 200,
    trickleSpeed: 300,
    direction: 'leftToRightIncreased',
	spinner: true,
    color: '#000',
    thick: true
  };

    constructor(
    private http: Adal4HTTPService,
	private service: Adal4Service,
	private router: Router
  ) { }
  
  private allGroups: Array<any[]> = new Array();
  private allGroupInfo: Array<any[]> = new Array();
  private arrayAux: Array<any[]> = new Array();
  private GroupName: Array<Array<any[]>> = new Array();
  private i: number = 0;

  ngOnInit() {		
	//this.getGroups();
	
  }
  
      /*public getGroups(){
	// Log the user information to the console
	/*console.log(this.service);
	
    console.log('username ' + this.service.userInfo.username);

    console.log('authenticated: ' + this.service.userInfo.authenticated);

    console.log('name: ' + this.service.userInfo.profile.name);

    console.log('token: ' + this.service.userInfo.token);

    console.log(this.service.userInfo.profile);*/
  
  
    /*this.http.get(`${environment.apiUrl}users/`+this.service.userInfo.username+`/$links/memberOf?api-version=1.6`)
			.map(res => {
				this.allGroups = res.json().value;
				for(this.i; this.i<this.allGroups.length; this.i++){
					this.getGroupName(this.allGroups[this.i]['url']);
				}
            })
            .subscribe(res => {
                //console.log('Conseguido!');
            });
  }
  
    public getGroupName(url){
  
    this.http.get(url+`?api-version=1.6`)
			.map(res => {
				this.allGroupInfo = res.json();
				//console.log(this.allGroupInfo['displayName'] + '	' + this.allGroupInfo['objectId']);
				console.log(this.allGroupInfo);
				
				
				this.arrayAux.push(this.allGroupInfo['objectId']); 
				this.arrayAux.push(this.allGroupInfo['displayName']);
					
				this.GroupName.push(this.arrayAux);
				//console.log(this.GroupName);
				
				this.arrayAux = [];
            })
            .subscribe(res => {
                //console.log('Conseguido!');
            });
			
  }*/


  
	changeRoute(link){ // Function 'reload' --> cuando se vuelve a pulsar sobre el link recarga el html. Pasa por el componet DUMMY y vulve al link pulsado
		 this.router.navigateByUrl('/dummy', { skipLocationChange: true });
		 setTimeout(()=>this.router.navigate([link]));
	}


}
