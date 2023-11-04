import { Component, OnInit } from '@angular/core';
import { Student } from 'src/shared/models/interfaces/Student';
import { DataService } from 'src/shared/services/data.service';
import { COLUMNS_TO_DISPLAY } from './dashboard.constant';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  students: Student[] = [];
  isLoading = true;
  columnsToDisplay = COLUMNS_TO_DISPLAY;

  constructor(private data_service: DataService) {}

  ngOnInit(): void {
    this.data_service.isLoadingSubject.subscribe((val) => {
      this.isLoading = val;
    });

    this.data_service.data$.subscribe({
      next: (data) => {
        this.students = data;
      },
    });
  }
}
