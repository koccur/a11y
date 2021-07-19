import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  navigationLink: string = 'Insurance';
  openMenuSwitch: boolean = false;

  constructor(private router: Router,
              private titleService:Title) {

  }

  ngOnInit(): void {
    //  todo: change navigationLink when change url
    this.router.events.pipe(filter(ev => ev instanceof NavigationEnd)).subscribe((res) => {
      // @ts-ignore
      this.navigationLink = res.url.split('/')[1];
      if(this.navigationLink==='insurer'){
        this.setTitle('A11y - Insurance')
      }
      if(this.navigationLink === 'claim-report'){
        this.setTitle('A11y - Claim report');
      }
    })

  }

  toggleMenu(): void {
    this.openMenuSwitch = !this.openMenuSwitch;
  }

  scrollToTop() {
    window.scroll(0,0);
  //  set focus on first elem
    document.getElementById('firstLink')?.focus();
  }

  private setTitle(newTitle:string){
    this.titleService.setTitle(newTitle);
  }
}

