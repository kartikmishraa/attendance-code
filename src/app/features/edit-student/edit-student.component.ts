import { Component, OnInit } from '@angular/core';
import { Student } from 'src/shared/models/interfaces/Student';
import { DataService } from 'src/shared/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterService } from 'src/shared/services/router.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss'],
})
export class EditStudentComponent implements OnInit {
  student!: Student;
  studentId: number = 0;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: RouterService
  ) {
    this.studentId = route.snapshot.params['id'];
  }

  // Form Group for Edit Student form
  editStudentForm = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    phone: [
      0,
      [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
    ],
  });

  ngOnInit(): void {
    /**
     * @description: Retrieves the student data by ID and assigns it to a variable.
     */
    this.dataService.getOneStudent(this.studentId).subscribe((student) => {
      this.student = student;

      this.editStudentForm.setValue({
        name: this.student.name,
        email: this.student.email,
        phone: this.student.phone,
      });
    });
  }

  /**
   * @description Handles form submission, updates Student data
   */
  handleSubmit(): void {
    if (this.editStudentForm.valid) {
      // console.log(this.editStudentForm.value);
      let updatedStudent: Student = {
        id: 0, // sending 0, mockAPI will automatically assign since it is PK
        name: String(this.editStudentForm.get('name')!.value),
        email: String(this.editStudentForm.get('email')!.value),
        phone: Number(this.editStudentForm.get('phone')!.value),
      };
      this.dataService.updateStudentById(this.student.id, updatedStudent);
    } else console.log('form invalid');
  }

  /**
   * @description Utility function to redirect to Dashboard
   */
  goBack(): void {
    this.router.redirectToUrl('/dashboard');
  }
}
