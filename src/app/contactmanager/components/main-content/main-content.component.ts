import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  user:User;
  constructor(private root: ActivatedRoute, private service:UserService) { }

  ngOnInit(): void {
    this.root.params.subscribe(params=>{
      const id = params['id'];
      this.service.users.subscribe(users=>{
        if(users.length == 0) return;

        this.user = this.service.userById(id)!;

      })
    })
  }

}
