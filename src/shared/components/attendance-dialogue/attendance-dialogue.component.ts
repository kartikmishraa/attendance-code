import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Attendance } from 'src/shared/models/interfaces/Attendance';
import { DialogueData } from 'src/shared/models/interfaces/DialogueData';
import { DataService } from 'src/shared/services/data.service';

@Component({
  selector: 'app-attendance-dialogue',
  templateUrl: './attendance-dialogue.component.html',
  styleUrls: ['./attendance-dialogue.component.scss'],
})
export class AttendanceDialogueComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AttendanceDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogueData,
    private dataService: DataService
  ) {
    this.studentId = data.id;
  }

  isLoading = true;
  studentId: number;

  columnsToDisplay = ['date', 'status'];
  dataSource!: MatTableDataSource<Attendance>;

  ngOnInit(): void {
    this.dataService.getAttendanceById(this.studentId).subscribe((val) => {
      this.dataSource = new MatTableDataSource(val);
      this.isLoading = false;
    });
  }
}
