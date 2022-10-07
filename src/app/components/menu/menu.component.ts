import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @ViewChild('sidebar')
  sidebar!: ElementRef;
  isClosed: boolean = true;
  loading = false;
  detailsFormation: any;
  constructor() { }

  ngOnInit(): void {
  }
  toggle() {
    if (this.isClosed) {
      this.sidebar.nativeElement.style.width = '250px';

      this.isClosed = !this.isClosed;
    } else {
      this.sidebar.nativeElement.style.width = '0px';
      this.isClosed = !this.isClosed;
    }
  }

}
