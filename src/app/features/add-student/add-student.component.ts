import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Student } from 'src/shared/models/interfaces/Student';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent {
  constructor(private fb: FormBuilder, private data_service: DataService) {}

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
    phone: [
      '',
      [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
    ],
  });

  /**
   * @description: Function to handle form submission and send data to API
   */
  handleSubmit(): void {
    if (this.addStudentForm.valid) {
      // Creating object to POST
      let newStudent: Student = {
        id: 0, // sending 0, mockAPI will automatically assign since it is PK
        name: String(this.addStudentForm.get('name')!.value),
        email: String(this.addStudentForm.get('email')!.value),
        phone: Number(this.addStudentForm.get('phone')!.value),
      };

      /* @TODO: Add a loading spinner, and then successful or error toast */
      this.data_service.addOneStudent(newStudent).subscribe({
        next: (val) => {
          console.log('form successfully submitted');
          console.log(val);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          // loading finishes (remove spinner)
        },
      });
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
