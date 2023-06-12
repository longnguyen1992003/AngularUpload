import {Component, OnInit} from '@angular/core';
import {LocalStorageUlti} from "./ulti/local-storage-ulti";
import {Router, Routes} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';

  onDeactivate($event: any) {
    window.scrollTo(0, 0)
  }
constructor( private  router : Router) {
}




}

