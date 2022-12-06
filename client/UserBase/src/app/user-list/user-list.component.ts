import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  userData: any = [];
  constructor(private userService: UserService,private router:Router) { }

  ngOnInit() {
    this.userService.getAllUser().subscribe(
      (success: any) => {
        console.log(success.data);
        this.userData = success.data;
      },
      error => console.log(error)
    );
  }

  removeUser(userId: any) {
    this.userService.removeUser(userId).subscribe(
      (success) => {
        console.log(success);
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      })
  }
}
