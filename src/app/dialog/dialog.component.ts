import { Component, Inject} from '@angular/core';
import  {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent{

  message: string = "";
  
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.message = this.data.message;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
