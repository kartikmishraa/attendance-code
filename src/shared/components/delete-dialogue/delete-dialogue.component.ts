import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogueData } from 'src/shared/models/interfaces/DialogueData';
import { DataService } from 'src/shared/services/data.service';

@Component({
  selector: 'app-delete-dialogue',
  templateUrl: './delete-dialogue.component.html',
  styleUrls: ['./delete-dialogue.component.scss'],
})
export class DeleteDialogueComponent {
  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<DeleteDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogueData
  ) {}

  /**
   * @description: Calls the delete funcitonality in the DataService
   * @param id: Student ID of student to be deleted
   */
  handleDelete(id: number) {
    this.dataService.deleteStudent(id);
    this.dialogRef.close();
  }
}
