import { CanonicalService } from 'src/app/services/canonical.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, Validators, UntypedFormControl } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Bmr } from 'src/app/models/bmr';


@Component({
  selector: 'app-ideal-weight-calculator',
  templateUrl: './ideal-weight-calculator.component.html',
  styleUrls: ['./ideal-weight-calculator.component.scss']
})
export class IdealWeightCalculatorComponent implements OnInit {
  calculeIwc!: UntypedFormGroup;
  checked: string = 'male';
  selectedHeight: string = "cm";
  height!: number;
  heightMiller!: number;
  heightDevine!: number;
  heightHamwi!: number;
  heightRobinson !: number;
  rsltHeightMiller!: string;
  rsltHeightDevine!: string;
  rsltHeightHamwi!: string;
  rsltHeightRobinson!: string;
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
  error: string = "";
  schema!: any;
  submitted = false;
  envirement: boolean = environment.production;

  constructor(private titleService: Title, private metaService: Meta, private CanonicalService: CanonicalService) {
    this.calculeIwc = new UntypedFormGroup({
      age: new UntypedFormControl("", [Validators.required, Validators.min(5), Validators.max(100)]),
      height: new UntypedFormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle("Free online ideal weight calculator (average weight calculator)");
    this.metaService.addTags([
      { name: 'keywords', content: "average weight calculator, ideal weight calculator, ideal body weight calculator, body weight ideal" },
      { name: 'description', content: "Free online ideal weight calculator (ideal body weight calculator, body weight ideal, average weight calculator)" },
      { property: 'og:title', content: "Free online ideal weight calculator (average weight calculator)" },
      { property: 'og:description', content: "Free online ideal weight calculator (ideal body weight calculator, body weight ideal, average weight calculator)" },
      { property: "og:url", content: "https://body-calculator.com/health/ideal-weight-calculator/" }
    ]);
    this.CanonicalService.createCanonicalLink("https://body-calculator.com/health/ideal-weight-calculator/");
    //shema
    this.schema = {
      "@context": "http://schema.org",
      "@type": "SoftwareApplication",
      "name": "Ideal weight calculator",
      "image": "https://body-calculator.com/assets/images/logo/calculator.svg",
      "url": "https://body-calculator.com/health/ideal-weight-calculator/",
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
  get formIwc() { return this.calculeIwc.controls; }

  public CalculateIwc(e: HTMLElement): void {
    // Devine formula: 50.0 kg + 2.3 kg per every inch over 5 feet
    // Miller Formula  Male:	56.2 kg + 1.41 kg per inch over 5 feet
    this.submitted = true;
    if (this.calculeIwc.valid) {
      this.error = "";
      this.height = this.calculeIwc.value.height;
      e.scrollIntoView({ behavior: "smooth" });
      //Miller
      if (this.checked === "male" && this.height > 0) {
        if (this.selectedHeight === "cm") {
          ///// cm to inches
          this.heightMiller = (56.2 * 1 + (this.height * .3937 - Math.round(152.4 * .3937)) * 1.41) * 1;
          this.rsltHeightMiller = this.heightMiller.toFixed(2);
          this.heightCm = this.height / 100
          // this.bmi = this.heightMiller / (this.square(this.heightCm, 2));
          this.healthyWeightMin = this.square(this.heightCm, 2) * 18.5;
          this.healthyWeightMax = this.square(this.heightCm, 2) * 25;
          this.rsltHealthyWeightMin = this.healthyWeightMin.toFixed(2);
          this.rsltHealthyWeightMax = this.healthyWeightMax.toFixed(2);
        }
        if (this.selectedHeight === "m") {
          ///// m to inches
          this.heightMiller = (56.2 * 1 + (this.height * 39.37 - Math.round(1.524 * 39.37)) * 1.41) * 1;
          this.rsltHeightMiller = this.heightMiller.toFixed(2);
          this.healthyWeightMin = this.square(this.height, 2) * 18.5;
          this.healthyWeightMax = this.square(this.height, 2) * 25;
          this.rsltHealthyWeightMin = this.healthyWeightMin.toFixed(2);
          this.rsltHealthyWeightMax = this.healthyWeightMax.toFixed(2);
        }
        if (this.selectedHeight === "in") {
          ///// feet to inches
          this.heightMiller = (56.2 * 1 + (this.height - 60) * 1.41) * 1;
          this.rsltHeightMiller = this.heightMiller.toFixed(2);
          let heightRslt = this.height / 39.37;
          this.healthyWeightMin = this.square(heightRslt, 2) * 18.5;
          this.healthyWeightMax = this.square(heightRslt, 2) * 25;
          this.rsltHealthyWeightMin = this.healthyWeightMin.toFixed(2);
          this.rsltHealthyWeightMax = this.healthyWeightMax.toFixed(2);
        }
        ///// inches
        if (this.selectedHeight === "ft") {
          this.heightMiller = (56.2 * 1 + (this.height * 12 - 60) * 1.41) * 1;
          this.rsltHeightMiller = this.heightMiller.toFixed(2);
          let heightRslt = this.height * 0.3048;
          heightRslt = this.square(heightRslt, 2) * 18.5;
          this.healthyWeightMin = this.square(heightRslt, 2) * 18.5;
          this.healthyWeightMax = this.square(heightRslt, 2) * 25;
          this.rsltHealthyWeightMin = this.healthyWeightMin.toFixed(2);
          this.rsltHealthyWeightMax = this.healthyWeightMax.toFixed(2);
        }
      }
      if (this.checked === "female" && this.height > 0) {
        if (this.selectedHeight === "cm") {
          ///// cm to inches
          this.heightMiller = (53.1 * 1 + (this.height * .3937 - Math.round(152.4 * .3937)) * 1.36) * 1;
          this.rsltHeightMiller = this.heightMiller.toFixed(2);
          this.heightCm = this.height / 100
          // this.bmi = this.heightMiller / (this.square(this.heightCm, 2));
          this.healthyWeightMin = this.square(this.heightCm, 2) * 18.5;
          this.healthyWeightMax = this.square(this.heightCm, 2) * 25;
          this.rsltHealthyWeightMin = this.healthyWeightMin.toFixed(2);
          this.rsltHealthyWeightMax = this.healthyWeightMax.toFixed(2);
        }
        if (this.selectedHeight === "m") {
          ///// m to inches
          this.heightMiller = (53.1 * 1 + (this.height * 39.37 - Math.round(1.524 * 39.37)) * 1.36) * 1;
          this.rsltHeightMiller = this.heightMiller.toFixed(2);
          this.rsltHeightMiller = this.heightMiller.toFixed(2);
          this.healthyWeightMin = this.square(this.height, 2) * 18.5;
          this.healthyWeightMax = this.square(this.height, 2) * 25;
          this.rsltHealthyWeightMin = this.healthyWeightMin.toFixed(2);
          this.rsltHealthyWeightMax = this.healthyWeightMax.toFixed(2);
        }
        if (this.selectedHeight === "in") {
          ///// feet to inches
          this.heightMiller = (53.1 * 1 + (this.height - 60) * 1.36) * 1;
          this.rsltHeightMiller = this.heightMiller.toFixed(2);
          let heightRslt = this.height / 39.37;
          this.healthyWeightMin = this.square(heightRslt, 2) * 18.5;
          this.healthyWeightMax = this.square(heightRslt, 2) * 25;
          this.rsltHealthyWeightMin = this.healthyWeightMin.toFixed(2);
          this.rsltHealthyWeightMax = this.healthyWeightMax.toFixed(2);
        }
        ///// inches
        if (this.selectedHeight === "ft") {
          this.heightMiller = (53.1 * 1 + (this.height * 12 - 60) * 1.36) * 1;
          this.rsltHeightMiller = this.heightMiller.toFixed(2);
          let heightRslt = this.height * 0.3048;
          heightRslt = this.square(heightRslt, 2) * 18.5;
          this.healthyWeightMin = this.square(heightRslt, 2) * 18.5;
          this.healthyWeightMax = this.square(heightRslt, 2) * 25;
          this.rsltHealthyWeightMin = this.healthyWeightMin.toFixed(2);
          this.rsltHealthyWeightMax = this.healthyWeightMax.toFixed(2);
        }
      }
      //Devine 
      if (this.checked === "male" && this.height > 0) {
        if (this.selectedHeight === "cm") {
          ///// cm to inches
          this.heightDevine = (50.0 * 1 + (this.height * .3937 - Math.round(152.4 * .3937)) * 2.3) * 1;
          this.rsltHeightDevine = this.heightDevine.toFixed(2);
        }
        if (this.selectedHeight === "m") {
          ///// m to inches
          this.heightDevine = (50.0 * 1 + (this.height * 39.37 - Math.round(1.524 * 39.37)) * 2.3) * 1;
          this.rsltHeightDevine = this.heightDevine.toFixed(2);
        }
        if (this.selectedHeight === "in") {
          ///// feet to inches
          this.heightDevine = (50.0 * 1 + (this.height - 60) * 2.3) * 1;
          this.rsltHeightDevine = this.heightDevine.toFixed(2);
        }
        ///// inches
        if (this.selectedHeight === "ft") {
          this.heightDevine = (50.0 * 1 + (this.height * 12 - 60) * 2.3) * 1;
          this.rsltHeightDevine = this.heightDevine.toFixed(2);
        }
      }
      if (this.checked === "female" && this.height > 0) {
        if (this.selectedHeight === "cm") {
          ///// cm to inches
          this.heightDevine = (45.5 * 1 + (this.height * .3937 - Math.round(152.4 * .3937)) * 2.3) * 1;
          this.rsltHeightDevine = this.heightDevine.toFixed(2);
        }
        if (this.selectedHeight === "m") {
          ///// m to inches
          this.heightDevine = (45.5 * 1 + (this.height * 39.37 - Math.round(1.524 * 39.37)) * 2.3) * 1;
          this.rsltHeightDevine = this.heightDevine.toFixed(2);
        }
        if (this.selectedHeight === "in") {
          ///// feet to inches
          this.heightDevine = (45.5 * 1 + (this.height - 60) * 2.3) * 1;
          this.rsltHeightDevine = this.heightDevine.toFixed(2);
        }
        ///// inches
        if (this.selectedHeight === "ft") {
          this.heightDevine = (45.5 * 1 + (this.height * 12 - 60) * 2.3) * 1;
          this.rsltHeightDevine = this.heightDevine.toFixed(2);
        }
      }
      // Hamwi 
      if (this.checked === "male" && this.height > 0) {
        if (this.selectedHeight === "cm") {
          ///// cm to inches
          this.heightHamwi = (48.0 * 1 + (this.height * .3937 - Math.round(152.4 * .3937)) * 2.7) * 1;
          this.rsltHeightHamwi = this.heightHamwi.toFixed(2);

        }
        if (this.selectedHeight === "m") {
          ///// m to inches
          this.heightHamwi = (48.0 * 1 + (this.height * 39.37 - Math.round(1.524 * 39.37)) * 2.7) * 1;
          this.rsltHeightHamwi = this.heightHamwi.toFixed(2);
        }
        if (this.selectedHeight === "in") {
          ///// feet to inches
          this.heightHamwi = (48.0 * 1 + (this.height - 60) * 2.7) * 1;
          this.rsltHeightHamwi = this.heightHamwi.toFixed(2);
        }
        ///// inches
        if (this.selectedHeight === "ft") {
          this.heightHamwi = (48.0 * 1 + (this.height * 12 - 60) * 2.7) * 1;
          this.rsltHeightHamwi = this.heightHamwi.toFixed(2);
        }
      }
      if (this.checked === "female" && this.height > 0) {
        if (this.selectedHeight === "cm") {
          ///// cm to inches
          this.heightHamwi = (45.5 * 1 + (this.height * .3937 - Math.round(152.4 * .3937)) * 2.2) * 1;
          this.rsltHeightHamwi = this.heightHamwi.toFixed(2);
        }
        if (this.selectedHeight === "m") {
          ///// m to inches
          this.heightHamwi = (45.5 * 1 + (this.height * 39.37 - Math.round(1.524 * 39.37)) * 2.2) * 1;
          this.rsltHeightHamwi = this.heightHamwi.toFixed(2);
        }
        if (this.selectedHeight === "in") {
          ///// feet to inches
          this.heightHamwi = (45.5 * 1 + (this.height - 60) * 2.2) * 1;
          this.rsltHeightHamwi = this.heightHamwi.toFixed(2);
        }
        ///// inches
        if (this.selectedHeight === "ft") {
          this.heightHamwi = (45.5 * 1 + (this.height * 12 - 60) * 2.2) * 1;
          this.rsltHeightHamwi = this.heightHamwi.toFixed(2);
        }
      }
      // Robinson 
      if (this.checked === "male" && this.height > 0) {
        if (this.selectedHeight === "cm") {
          ///// cm to inches
          this.heightRobinson = (52 * 1 + (this.height * .3937 - Math.round(152.4 * .3937)) * 1.9) * 1;
          this.rsltHeightRobinson = this.heightRobinson.toFixed(2);
        }
        if (this.selectedHeight === "m") {
          ///// m to inches
          this.heightRobinson = (52 * 1 + (this.height * 39.37 - Math.round(1.524 * 39.37)) * 1.9) * 1;
          this.rsltHeightRobinson = this.heightRobinson.toFixed(2);
        }
        if (this.selectedHeight === "in") {
          ///// feet to inches
          this.heightRobinson = (52 * 1 + (this.height - 60) * 1.9) * 1;
          this.rsltHeightRobinson = this.heightRobinson.toFixed(2);
        }
        ///// inches
        if (this.selectedHeight === "ft") {
          this.heightRobinson = (52 * 1 + (this.height * 12 - 60) * 1.9) * 1;
          this.rsltHeightRobinson = this.heightRobinson.toFixed(2);
        }
      }
      if (this.checked === "female" && this.height > 0) {
        if (this.selectedHeight === "cm") {
          ///// cm to inches
          this.heightRobinson = (49 * 1 + (this.height * .3937 - Math.round(152.4 * .3937)) * 1.7) * 1;
          this.rsltHeightRobinson = this.heightRobinson.toFixed(2);
        }
        if (this.selectedHeight === "m") {
          ///// m to inches
          this.heightRobinson = (49 * 1 + (this.height * 39.37 - Math.round(1.524 * 39.37)) * 1.7) * 1;
          this.rsltHeightRobinson = this.heightRobinson.toFixed(2);
        }
        if (this.selectedHeight === "in") {
          ///// feet to inches
          this.heightRobinson = (49 * 1 + (this.height - 60) * 1.7) * 1;
          this.rsltHeightRobinson = this.heightRobinson.toFixed(2);
        }
        ///// inches
        if (this.selectedHeight === "ft") {
          this.heightRobinson = (49 * 1 + (this.height * 12 - 60) * 1.7) * 1;
          this.rsltHeightRobinson = this.heightRobinson.toFixed(2);
        }
      }
    } else {
      this.error = "Please check the fields";
    }
  }
  square(firstNumber: number, secondNumber: number): number {
    return firstNumber ** secondNumber
  }
  checkedGender(v: any) {
    this.checked = v.target.value;
  }
  heightSelect(v: any) {
    //cm
    if (this.selectedHeight === "cm") {
      if (v.target.value === 'm') {
        this.modelsIwc.height = this.calculeIwc.value.height / 100;
        this.modelsIwc.height = Math.round(this.modelsIwc.height * 100) / 100;
        this.selectedHeight = "m";
      }
      if (v.target.value == 'in') {
        this.modelsIwc.height = (this.calculeIwc.value.height / 100) * 39.37;
        this.modelsIwc.height = Math.round(this.modelsIwc.height * 100) / 100;
        this.selectedHeight = "in"
      }
      if (v.target.value == 'ft') {
        // this.modelsIwc.height = (this.calculeIwc.value.height * 100) / 0.3048;
        this.modelsIwc.height = this.calculeIwc.value.height / 30.48;
        this.modelsIwc.height = Math.round(this.modelsIwc.height * 100) / 100;
        this.selectedHeight = "ft"
      }
      //m
    } if (this.selectedHeight === "m") {
      if (v.target.value === 'cm') {
        this.modelsIwc.height = this.calculeIwc.value.height * 100;
        this.modelsIwc.height = Math.round(this.modelsIwc.height * 100) / 100;
        this.selectedHeight = "cm"
      }
      if (v.target.value == 'in') {
        this.modelsIwc.height = this.calculeIwc.value.height * 39.37;
        this.modelsIwc.height = Math.round(this.modelsIwc.height * 100) / 100;
        this.selectedHeight = "in"
      }
      if (v.target.value == 'ft') {
        this.modelsIwc.height = this.calculeIwc.value.height / 0.3048;
        this.modelsIwc.height = Math.round(this.modelsIwc.height * 100) / 100;
        this.selectedHeight = "ft"
      }
    }
    //in
    if (this.selectedHeight === "in") {
      if (v.target.value == 'm') {
        this.modelsIwc.height = this.calculeIwc.value.height / 39.37;
        this.modelsIwc.height = Math.round(this.modelsIwc.height * 100) / 100;
        this.selectedHeight = "m"
      }
      if (v.target.value == 'cm') {
        this.modelsIwc.height = (this.calculeIwc.value.height * 100) / 39.37;
        this.modelsIwc.height = Math.round(this.modelsIwc.height * 100) / 100;
        this.selectedHeight = "cm"
      }
      if (v.target.value == 'ft') {
        // this.modelsIwc.height = (this.calculeIwc.value.height / 39.37) / 0.3048;
        this.modelsIwc.height = this.calculeIwc.value.height / 12;
        this.modelsIwc.height = Math.round(this.modelsIwc.height * 100) / 100;
        this.selectedHeight = "ft"
      }
    }
    //ft
    if (this.selectedHeight === "ft") {
      if (v.target.value == 'm') {
        this.modelsIwc.height = this.calculeIwc.value.height * 0.3048;
        this.modelsIwc.height = Math.round(this.modelsIwc.height * 100) / 100;
        this.selectedHeight = "m"
      }
      if (v.target.value == 'cm') {
        // this.modelsIwc.height = (this.calculeIwc.value.height * 100) * 0.3048;
        this.modelsIwc.height = this.calculeIwc.value.height * 30.48;
        this.modelsIwc.height = Math.round(this.modelsIwc.height * 100) / 100;
        this.selectedHeight = "cm"
      }
      if (v.target.value == 'in') {
        this.modelsIwc.height = this.calculeIwc.value.height * 12;
        this.modelsIwc.height = Math.round(this.modelsIwc.height * 100) / 100;
        this.selectedHeight = "in"
      }
    }
  }
}
