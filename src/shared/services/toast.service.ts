import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private _snackBar: MatSnackBar) {}

  makeToast(message: string): void {
    this._snackBar.open(message, 'Close', { duration: 3000 });
  }
}
