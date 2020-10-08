import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'iams-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  imageSrc = 'assets/images/st-engineering.png';
  imageAlt = 'ST ENGINEERING';
  constructor() { }

  ngOnInit(): void {
  }

}
