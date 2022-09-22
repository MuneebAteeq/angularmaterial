import { Component, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout'
import { query, state } from '@angular/animations';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { Direction } from '@angular/cdk/bidi';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public isScreenSmall:boolean;
  users: Observable<User[]>;
  isDarkTheme:boolean = false;
  dir: Direction = 'ltr';
  constructor(private breakpointObserver: BreakpointObserver,
    private userService: UserService, private router: Router) { }
    @ViewChild(MatSidenav) sidenav: MatSidenav;

    toggleTheme(){
      this.isDarkTheme = !this.isDarkTheme;
    }
    toggleDir(){
      this.dir = this.dir == 'ltr'? 'rtl' : 'ltr';
    }
  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      //.observe(['(max-width: ${SMALL_WIDTH_BREAKPOINT}px)' ])
      .subscribe((state: BreakpointState)=>{
        this.isScreenSmall = state.matches;
      })

      this.users = this.userService.users;
      this.userService.loadAll();
      this.users.subscribe(data=>{
        if(data.length > 0) this.router.navigate(['/contactmanager', data[0].id]);
      })
      this.router.events.subscribe(()=>{
        if(this.isScreenSmall){
          this.sidenav.close();
        }
      })
  }

}
