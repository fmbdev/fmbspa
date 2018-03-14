//import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
//import { Asesor } from '../interfaces/asesor';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

//@Injectable()
export class ValidationService {
    onKeydown(event) {
        var charStr = String.fromCharCode(event.keyCode);
        if (/[a-zA-Z]/i.test(charStr)) {
            return false;
        }
    }
}