import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-other-calculator-health',
  templateUrl: './other-calculator-health.component.html',
  styleUrls: ['./other-calculator-health.component.scss']
})
export class OtherCalculatorHealthComponent implements OnInit {
  arrayOtherCalculators: any;
  @Input() eleminateCalculator: any;
  otherCalculators: string = "";
  goToOtherPage: any;
  constructor() {
  }


  ngOnInit(): void {

    if (this.eleminateCalculator == 'bmi') {
      this.goToOtherPage = { name: "Go to body fat percentage calculator", url: "/health/body-fat-percentage-calculator/." }
    } else {
      this.goToOtherPage = { name: "Body mass index BMI calculator", url: "/health/bmi-calculator/." }
    }
    // if(this.eleminateCalculator == 'bmi'){
    //   this.goToOtherPage =  {name: "Go to body fat percentage calculator", url:"/health/body-fat-percentage-calculator/."}
    // }else if(this.eleminateCalculator == 'bfp'){
    //   this.goToOtherPage =  {name: "Go to body shape calculator", url:"/health/body-shape-calculator/."}
    // }else{
    //   this.goToOtherPage =  {name: "Body mass index BMI calculator", url:"/health/bmi-calculator/."}
    // }

    this.arrayOtherCalculators = [
      { 'title': 'Body mass index BMI calculator', 'url': '/health/bmi-calculator/.', 'code': 'bmi' },
      { 'title': 'Body fat percentage calculator', 'url': '/health/body-fat-percentage-calculator/.', 'code': 'bfp' },
      { 'title': 'Ideal weight calculator', 'url': '/health/ideal-weight-calculator/.', 'code': 'iwc' },
      { 'title': 'Body shape calculator', 'url': '/health/body-shape-calculator/.', 'code': 'bsc' },
      { 'title': 'Basal metabolic rate BMR calculator', 'url': '/health/bmr-calculator/.', 'code': 'bmr' },
      { 'title': 'Healthy weight calculator', 'url': '/health/healthy-weight-calculator/.', 'code': 'hwc' },
    ];
    this.arrayOtherCalculators = this.arrayOtherCalculators.filter((x: any) => x.code != this.eleminateCalculator);
    this.arrayOtherCalculators.forEach((element: { url: string; title: string; }) => {
      this.otherCalculators += ' <div class="col-md-4 col-12 mb-2">';
      // this.otherCalculators += ' <div class="">';
      this.otherCalculators += '<a  href="' + element.url + '">';
      this.otherCalculators += '<div class="designeButton m-1 p-2 bg-white  d-flex justify-content-between ">';
      this.otherCalculators += '<span class="pr-2 text-dark">';
      this.otherCalculators += element.title;
      this.otherCalculators += '</span>';
      this.otherCalculators += '<span class="font-weight-bold text-dark">&raquo; </span>';
      this.otherCalculators += '</div>';
      this.otherCalculators += '</a>';
      // this.otherCalculators +=    '</div>';
      this.otherCalculators += '</div>';
    });
  }

}
