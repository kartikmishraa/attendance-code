import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent {
  constructor(private fb: FormBuilder) {}

  // @TODO: Add PHONE VALIDATION
  /**
   * @description: FormGroup for controlling the form
   */
  addStudentForm = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
  });

  /**
   * @description: Function that handles form submission
   */
  handleSubmit(): void {
    if (this.addStudentForm.valid) {
      console.log('form submitted');
      console.log(this.addStudentForm.value);
    } else {
      console.log('invalid form');
    }
  }

  /**
   * @description: Function to reset form values
   */
  handleReset(): void {
    this.addStudentForm.reset();
  }

  /**
   * @description: Helper function to allow only number input in phone input field
   * @param event Keydown event object
   */
  validateNumber(event: KeyboardEvent) {
    const keyCode = event.keyCode;
    const excludedKeys = [8, 37, 39, 46];

    if (
      !(
        (keyCode >= 48 && keyCode <= 57) ||
        (keyCode >= 96 && keyCode <= 105) ||
        excludedKeys.includes(keyCode)
      )
    ) {
      event.preventDefault();
    }
  }
}
