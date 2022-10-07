import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  dt: any;
  constructor() { }

  ngOnInit(): void {
    this.dt = new Date().getFullYear();
  }

}
