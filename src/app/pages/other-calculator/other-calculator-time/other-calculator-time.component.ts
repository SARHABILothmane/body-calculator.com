import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-other-calculator-time',
  templateUrl: './other-calculator-time.component.html',
  styleUrls: ['./other-calculator-time.component.scss']
})
export class OtherCalculatorTimeComponent implements OnInit {
  arrayOtherCalculators: any;
  @Input() eleminateCalculator: any;
  otherCalculators: string = "";
  goToOtherPage: any;
  constructor() {
  }


  ngOnInit(): void {
    if (this.eleminateCalculator == 'ac') {
      this.goToOtherPage = { name: "Date calculator", url: "/calculators/date-calculator/." }
    } else {
      this.goToOtherPage = { name: "Age calculator", url: "/calculators/age-calculator/." }
    }

    this.arrayOtherCalculators = [
      { 'title': 'Age calculator', 'url': '/calculators/age-calculator/.', 'code': 'ac' },
      { 'title': 'Date calculator', 'url': '/calculators/date-calculator/.', 'code': 'dc' },
    ];
    this.arrayOtherCalculators = this.arrayOtherCalculators.filter((x: any) => x.code != this.eleminateCalculator);

    this.arrayOtherCalculators.forEach((element: { url: string; title: string; }) => {
      this.otherCalculators += ' <div class="col-md-4 col-12 ">';
      this.otherCalculators += '<a  href="' + element.url + '">';
      this.otherCalculators += '<div class="designeButton m-1 p-2 bg-white  d-flex justify-content-between ">';
      this.otherCalculators += '<span class="pr-2 text-dark">';
      this.otherCalculators += element.title;
      this.otherCalculators += '</span>';
      this.otherCalculators += '<span class="font-weight-bold text-dark">&raquo; </span>';
      this.otherCalculators += '</div>';
      this.otherCalculators += '</a>';
      this.otherCalculators += '</div>';
    });
  }

}
