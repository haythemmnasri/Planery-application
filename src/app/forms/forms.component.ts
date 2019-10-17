import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  profileForm: FormGroup;
  tabsSelectedIndex = 0;
  infos: {}[]= [];

  constructor(private formBuilder: FormBuilder) {
   }


  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      adress: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern( '[+43 ] |[0-9]+'), Validators.minLength(13  )]]
    });

  }

  onSubmit(form: FormGroup){
    let categories = ['First Name', 'Last Name', 'Address', 'Email', 'Phone Number']
    Object.keys(form.controls).forEach((formControl:any, key) =>{
      this.infos.push({'category':categories[key], 'value':form.controls[formControl].value });
    })
    this.tabsSelectedIndex = 1;
  }

  resetHandler(){
    this.tabsSelectedIndex = 0;
    this.profileForm.reset();
    this.infos = [];
    for(var name in this.profileForm.controls) {
      (this.profileForm.controls[name] as FormControl).setValue('');
      
      this.profileForm.controls[name].setErrors(null);
    }

  }

}
