import { Component, Inject, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';


import { Asesor } from '../interfaces/asesor';
import { AsesorService } from '../providers/asesor.service';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss']
})
export class DialogFormComponent implements OnInit {

  message: any = [];
  title: string = "";
  asesores: Asesor[] = [];
  asesors: Asesor[] = [];
  
  constructor(
    private asesorServ: AsesorService,
    public dialogRef: MatDialogRef<DialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.asesors = this.data.message;
    this.title = this.data.title;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.asesorServ.getAll()
      .subscribe(
        (data: Asesor[]) => this.asesores = data
      )
  }
  

}