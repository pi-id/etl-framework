import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  simpleForm: FormGroup;

  constructor(public fb: FormBuilder) {
    this.simpleForm = fb.group({
      simpleFormEmailEx: ['', [Validators.required, Validators.email]],
      simpleFormPasswordEx: ['', Validators.required],
    });
  }

}
