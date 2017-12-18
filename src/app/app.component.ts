import { Component, OnInit } from '@angular/core';
import { Adal4Service } from 'adal-angular4';
import { Router, NavigationEnd } from '@angular/router';

import { Location } from '@angular/common';


import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private adalSvc: Adal4Service, private router: Router, private location: Location) {
    this.adalSvc.init(environment.adalConfig);
  }

  ngOnInit(): void {
		this.adalSvc.handleWindowCallback();
	
		var urlFragments = window.location.href.split("#id_token")
			if (urlFragments.length > 1)
			{
				console.log('#id_token SPLIT');
				this.location.go(this.location.path());
			}
  }
  
}
