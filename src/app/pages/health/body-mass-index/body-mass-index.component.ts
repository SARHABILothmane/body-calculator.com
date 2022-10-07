import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body-mass-index',
  templateUrl: './body-mass-index.component.html',
  styleUrls: ['./body-mass-index.component.scss']
})
export class BodyMassIndexComponent implements OnInit {
  switchTabs: string = "women";
  constructor() { }

  ngOnInit(): void {
  }
  tabsSet(name: string) {
    this.switchTabs = name;
  }
}
