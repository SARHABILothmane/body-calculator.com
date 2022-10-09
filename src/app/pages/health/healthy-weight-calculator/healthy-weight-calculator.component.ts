import { Bmr } from 'src/app/models/bmr';
import { CanonicalService } from 'src/app/services/canonical.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, Validators, UntypedFormControl } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-healthy-weight-calculator',
  templateUrl: './healthy-weight-calculator.component.html',
  styleUrls: ['./healthy-weight-calculator.component.scss']
})
export class HealthyWeightCalculatorComponent implements OnInit {
  calculeHwc!: UntypedFormGroup;
  selectedHeight: string = "cm";
  height!: number;
  iwc!: number;
  heightCm!: number;
  healthyWeightMin!: number;
  healthyWeightMax!: number;
  rsltHealthyWeightMin!: string;
  rsltHealthyWeightMax!: string;
  bmi!: number;
  // faMale = faMale;
  // faFemale = faFemale;
  modelsIwc: Bmr = {
    age: 0,
    height: 0,
    weight: 0,
  }

  schema!: any;
  error: string = "";
  submitted = false;
  envirement: boolean = environment.production;

  constructor(private titleService: Title, private metaService: Meta, private canonical: CanonicalService) {
    this.calculeHwc = new UntypedFormGroup({
      height: new UntypedFormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle("Free online healthy weight calculator");
    this.metaService.addTags([
      { name: 'keywords', content: "Healthy weight calculator" },
      { name: 'description', content: "Free online Healthy weight calculator (healthy weight range calculator)" },
      { property: 'og:title', content: "Free online healthy weight calculator" },
      { property: 'og:description', content: "Free online Healthy weight calculator (healthy weight range calculator)" },
      { property: "og:url", content: "https://body-calculator.com/health/healthy-weight-calculator/" }
    ]);
    this.canonical.createCanonicalLink("https://body-calculator.com/health/healthy-weight-calculator/");
    //shema
    this.schema = {
      "@context": "http://schema.org",
      "@type": "SoftwareApplication",
      "name": "Healthy weight calculator",
      "image": "https://body-calculator.com/assets/images/logo/calculator.svg",
      "url": "https://body-calculator.com/health/healthy-weight-calculator/",
      "author": {
        "@type": "Person",
        "name": "SARHABIL"
      },
      "datePublished": "2022-01-10",
      "publisher": {
        "@type": "Organization",
        "name": "body-calculator"
      },
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Linux",
      "screenshot": "https://body-calculator.com/assets/images/logo/Screenshot-body-calculator.png",
      "softwareVersion": "1",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "ratingCount": "8864"
      },
      "offers": {
        "@type": "Offer",
        "price": "1.00",
        "priceCurrency": "USD"
      }
    }

  }
  get formHwc() { return this.calculeHwc.controls; }

  public CalculateHwc(e: HTMLElement): void {
    this.submitted = true;
    if (this.calculeHwc.valid) {
      this.error = "";
      this.height = this.calculeHwc.value.height;
      e.scrollIntoView({ behavior: "smooth" });
      if (this.selectedHeight === "cm") {
        ///// cm to inches
        this.heightCm = this.height / 100
        // this.bmi = this.heightMiller / (this.square(this.heightCm, 2));
        this.healthyWeightMin = this.square(this.heightCm, 2) * 18.5;
        this.healthyWeightMax = this.square(this.heightCm, 2) * 25;
        this.rsltHealthyWeightMin = this.healthyWeightMin.toFixed(2);
        this.rsltHealthyWeightMax = this.healthyWeightMax.toFixed(2);
      }
      if (this.selectedHeight === "m") {
        ///// m to inches
        this.healthyWeightMin = this.square(this.height, 2) * 18.5;
        this.healthyWeightMax = this.square(this.height, 2) * 25;
        this.rsltHealthyWeightMin = this.healthyWeightMin.toFixed(2);
        this.rsltHealthyWeightMax = this.healthyWeightMax.toFixed(2);
      }
      if (this.selectedHeight === "in") {
        ///// feet to inches
        let heightRslt = this.height / 39.37;
        this.healthyWeightMin = this.square(heightRslt, 2) * 18.5;
        this.healthyWeightMax = this.square(heightRslt, 2) * 25;
        this.rsltHealthyWeightMin = this.healthyWeightMin.toFixed(2);
        this.rsltHealthyWeightMax = this.healthyWeightMax.toFixed(2);
      }
      ///// inches
      if (this.selectedHeight === "ft") {
        let heightRslt = this.height * 0.3048;
        heightRslt = this.square(heightRslt, 2) * 18.5;
        this.healthyWeightMin = this.square(heightRslt, 2) * 18.5;
        this.healthyWeightMax = this.square(heightRslt, 2) * 25;
        this.rsltHealthyWeightMin = this.healthyWeightMin.toFixed(2);
        this.rsltHealthyWeightMax = this.healthyWeightMax.toFixed(2);
      }
    } else {
      this.error = "Please check the fields";
    }
    // Devine formula: 50.0 kg + 2.3 kg per every inch over 5 feet
    // Miller Formula  Male:	56.2 kg + 1.41 kg per inch over 5 feet

  }
  square(firstNumber: number, secondNumber: number): number {
    return firstNumber ** secondNumber
  }
  heightSelect(v: any) {
    //cm
    if (this.selectedHeight === "cm") {
      if (v.target.value === 'm') {
        this.modelsIwc.height = this.calculeHwc.value.height / 100;
        this.modelsIwc.height = Math.round(this.modelsIwc.height * 100) / 100;
        this.selectedHeight = "m";
      }
      if (v.target.value == 'in') {
        this.modelsIwc.height = (this.calculeHwc.value.height / 100) * 39.37;
        this.modelsIwc.height = Math.round(this.modelsIwc.height * 100) / 100;
        this.selectedHeight = "in"
      }
      if (v.target.value == 'ft') {
        // this.modelsIwc.height = (this.calculeHwc.value.height * 100) / 0.3048;
        this.modelsIwc.height = this.calculeHwc.value.height / 30.48;
        this.modelsIwc.height = Math.round(this.modelsIwc.height * 100) / 100;
        // console.log(Math.round((this.modelsIwc.height + Number.EPSILON) * 100) / 100);
        this.selectedHeight = "ft"
      }
      //m
    } if (this.selectedHeight === "m") {
      if (v.target.value === 'cm') {
        this.modelsIwc.height = this.calculeHwc.value.height * 100;
        this.modelsIwc.height = Math.round(this.modelsIwc.height * 100) / 100;
        this.selectedHeight = "cm"
      }
      if (v.target.value == 'in') {
        this.modelsIwc.height = this.calculeHwc.value.height * 39.37;
        this.modelsIwc.height = Math.round(this.modelsIwc.height * 100) / 100;
        this.selectedHeight = "in"
      }
      if (v.target.value == 'ft') {
        this.modelsIwc.height = this.calculeHwc.value.height / 0.3048;
        this.modelsIwc.height = Math.round(this.modelsIwc.height * 100) / 100;
        this.selectedHeight = "ft"
      }
    }
    //in
    if (this.selectedHeight === "in") {
      if (v.target.value == 'm') {
        this.modelsIwc.height = this.calculeHwc.value.height / 39.37;
        this.modelsIwc.height = Math.round(this.modelsIwc.height * 100) / 100;
        this.selectedHeight = "m"
      }
      if (v.target.value == 'cm') {
        this.modelsIwc.height = (this.calculeHwc.value.height * 100) / 39.37;
        this.modelsIwc.height = Math.round(this.modelsIwc.height * 100) / 100;
        this.selectedHeight = "cm"
      }
      if (v.target.value == 'ft') {
        // this.modelsIwc.height = (this.calculeHwc.value.height / 39.37) / 0.3048;
        this.modelsIwc.height = this.calculeHwc.value.height / 12;
        this.modelsIwc.height = Math.round(this.modelsIwc.height * 100) / 100;
        this.selectedHeight = "ft"
      }
    }
    //ft
    if (this.selectedHeight === "ft") {
      if (v.target.value == 'm') {
        this.modelsIwc.height = this.calculeHwc.value.height * 0.3048;
        this.modelsIwc.height = Math.round(this.modelsIwc.height * 100) / 100;
        this.selectedHeight = "m"
      }
      if (v.target.value == 'cm') {
        // this.modelsIwc.height = (this.calculeHwc.value.height * 100) * 0.3048;
        this.modelsIwc.height = this.calculeHwc.value.height * 30.48;
        this.modelsIwc.height = Math.round(this.modelsIwc.height * 100) / 100;
        this.selectedHeight = "cm"
      }
      if (v.target.value == 'in') {
        this.modelsIwc.height = this.calculeHwc.value.height * 12;
        this.modelsIwc.height = Math.round(this.modelsIwc.height * 100) / 100;
        this.selectedHeight = "in"
      }
    }
  }
}
