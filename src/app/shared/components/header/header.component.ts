import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'iams-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  imageSrc = 'assets/images/st-engineering.png';
  imageAlt = 'ST ENGINEERING';
  @Output() public sidenavToggle = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}
