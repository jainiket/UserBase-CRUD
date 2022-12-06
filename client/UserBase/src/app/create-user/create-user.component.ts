import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  providers: []
})
export class CreateUserComponent {
  constructor(private formbuilder: FormBuilder, private userService: UserService) {
  }

  imageUrl: any = "../../assets/user.png";
  isCreated: boolean = false;
  isDuplicate: boolean = false;
  imageFile: any;
  createUserForm = this.formbuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    profileImg: ['', Validators.required]
  })

  submitUserForm() {
    let body: any = this.createUserForm.value;
    console.log(body);
    let formData: FormData = new FormData();
    formData.append("firstName", body.firstName);
    formData.append("lastName", body.lastName);
    formData.append("email", body.email);
    formData.append("phoneNumber", body.phoneNumber);
    formData.set("profileImg", this.imageFile);
    this.userService.addUser(formData).subscribe(
      (success: any) => {
        console.log(success);
        if (success.status == 200) {
          this.isCreated = true;
        }
        if (success.code == 11000) {
          this.isDuplicate = true;
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  previewImage(event: any) {
    this.imageFile = event.target.files[0];
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      this.imageUrl = event.target?.result
    }
  }
}
