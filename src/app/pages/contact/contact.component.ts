import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm!: UntypedFormGroup;
  error: string = "";
  msg: string = "";

  isLoading: boolean = false;
  // options: AnimationOptions = {
  //   path: '/assets/animations/contact.json',
  // };

  constructor(private http: HttpClient) { }



  ngOnInit(): void {
    //init forms
    this.contactForm = new UntypedFormGroup(
      {
        name: new UntypedFormControl("", [Validators.required]),
        email: new UntypedFormControl("", [Validators.required, Validators.email]),
        subject: new UntypedFormControl("", [Validators.required]),
        message: new UntypedFormControl("", [Validators.required, Validators.maxLength(5000), Validators.minLength(20),]),
      }
    );
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.error = "";
      this.isLoading = true;
      // const email = contactForm.value;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post('https://formspree.io/f/xknyqpjw',
        // hna ta9dar tzid ay object brayti bi ay smiya 
        { name: this.name.value, email: this.email.value, subject: this.subject.value, message: this.message.value },
        // { name: email.name, replyto: email.email, message: email.messages },
        { 'headers': headers }).subscribe(
          (response: any) => {
            this.isLoading = false;
            this.contactForm.reset();
            this.msg = 'Your email sent successfully', 'success'
          }, (error: any) => {
            this.isLoading = false;
            this.msg = "There's some problems please retry", 'danger'
          }
        );
    } else {
      this.error = "Please check the fields";
      window.scroll(0, 0);
    }
  }

  get name() {
    return this.contactForm.get("name") as UntypedFormControl;
  }
  get email() {
    return this.contactForm.get("email") as UntypedFormControl;
  }
  get subject() {
    return this.contactForm.get("subject") as UntypedFormControl;
  }
  get message() {
    return this.contactForm.get("message") as UntypedFormControl;
  }

}
