import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {

  imageUrl: any = "../../assets/user.png";
  userId: any;
  isCreated: boolean = false;
  imageFile: any;
  constructor(private formbuilder: FormBuilder, private userService: UserService, private activRoute: ActivatedRoute) {
    this.activRoute.params.subscribe((resp: any) => {
      this.userId = resp.userId;
    })
  }
  updateUserForm = this.formbuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    profileImg: ['', Validators.required]
  })

  ngOnInit() {
    this.userService.getUser(this.userId).subscribe((userData: any) => {
      this.updateUserForm.controls['firstName'].patchValue(userData.data.firstName);
      this.updateUserForm.controls['email'].patchValue(userData.data.email);
      this.updateUserForm.controls['lastName'].patchValue(userData.data.lastName);
      this.updateUserForm.controls['phoneNumber'].patchValue(userData.data.phoneNumber);
    })
  }

  submitUserForm() {
    let body :any = this.updateUserForm.value;
    let formData: FormData = new FormData();
    formData.append("firstName", body.firstName);
    formData.append("lastName", body.lastName);
    formData.append("email", body.email);
    formData.append("phoneNumber", body.phoneNumber);
    formData.set("profileImg", this.imageFile);
    this.userService.updateUser(this.userId, formData).subscribe(
      (success: any) => {
        console.log(success);
        if (success.status == 200) {
          this.isCreated = true;
        }
      },
      error => console.log(error)
    );
  }

  previewImage(event:any){
    this.imageFile = event.target.files[0];
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      this.imageUrl = event.target?.result
    }
  }
}
