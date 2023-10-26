import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent {
  constructor(private fb: FormBuilder) {}

  /**
   * @description: FormGroup for controlling the form
   */
  addStudentForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required, Validators.pattern('^[0-9]{10}$')],
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
}
