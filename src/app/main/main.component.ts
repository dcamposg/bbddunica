import { Component, OnInit } from '@angular/core';
import { Adal4HTTPService, Adal4Service } from 'adal-angular4';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    constructor(
    private http: Adal4HTTPService,
	private service: Adal4Service,
	private router: Router
  ) { }

  ngOnInit() {
  }
  
changeRoute(link){ // Function 'reload' --> cuando se vuelve a pulsar sobre el link recarga el html. Pasa por el componet DUMMY y vulve al link pulsado
     this.router.navigateByUrl('/dummy', { skipLocationChange: true });
     setTimeout(()=>this.router.navigate([link]));
}


}
