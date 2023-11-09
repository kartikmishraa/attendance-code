import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/shared/services/data.service';
import { Student } from 'src/shared/models/interfaces/Student';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent implements OnInit {
  isLoading = true;

  constructor(private fb: FormBuilder, private data_service: DataService) {}

  ngOnInit(): void {
    this.data_service.isLoadingSubject.subscribe((val) => {
      this.isLoading = val;
    });
  }

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

      /* @TODO: Add a SUCCESS or ERROR toast */
      this.data_service.addOneStudent(newStudent);
      // Reset form after submission
      this.handleReset();
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
