import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-base',
  templateUrl: './upload-base.component.html',
  styleUrls: ['./upload-base.component.scss']
})
export class UploadBaseComponent implements OnInit {
  newdata: any = {};

  constructor() { }

  ngOnInit() {
  }

  previewImage(ev){
    console.log(ev.srcElement.files[0]);
    this.newdata.filename = ev.srcElement.files[0].name;
  }

}
