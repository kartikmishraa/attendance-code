import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogueData } from 'src/shared/models/interfaces/DialogueData';
import { DataService } from 'src/shared/services/data.service';

@Component({
  selector: 'app-popup-dialogue',
  templateUrl: './popup-dialogue.component.html',
  styleUrls: ['./popup-dialogue.component.scss'],
})
export class PopupDialogueComponent {
  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<PopupDialogueComponent>,
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
