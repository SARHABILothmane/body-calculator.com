import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { Bmr } from 'src/app/models/bmr';
import { CanonicalService } from 'src/app/services/canonical.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-basal-metabolic-rate-calculator',
  templateUrl: './basal-metabolic-rate-calculator.component.html',
  styleUrls: ['./basal-metabolic-rate-calculator.component.scss']
})
export class BasalMetabolicRateCalculatorComponent implements OnInit {

  calculeBmr!: UntypedFormGroup;
  checked: string = "female";
  bmr!: number;
  selectedHeight: string = "cm";
  selectedWeight: string = "kg";
  height!: number;
  schema!: any;
  error: string = "";
  submitted = false;
  envirement: boolean = environment.production;

  constructor(private titleService: Title, private metaService: Meta, private CanonicalService: CanonicalService) {
    this.calculeBmr = new UntypedFormGroup({
      age: new UntypedFormControl("", [Validators.required, Validators.min(5), Validators.max(100)]),
      height: new UntypedFormControl("", [Validators.required]),
      weight: new UntypedFormControl("", [Validators.required]),
    });
  }
  modelsBmr: Bmr = {
    age: 0,
    height: 0,
    weight: 0,
  }


  ngOnInit(): void {
    //this.href = this.router.url;
    this.titleService.setTitle("Body-calculator - Free online basal metabolic rate BMR calculator");
    this.metaService.addTags([
      { name: 'keywords', content: "BMR calculator, basal metabolic rate calculator" },
      { name: 'description', content: "Free online tool that allow you to calculate your basal metabolic rate BMR (basal metabolic rate calculator, BMR calculator)" },
      { property: 'og:title', content: "Body-calculator - Free online basal metabolic rate BMR calculator" },
      { property: 'og:description', content: "Free online tool that allow you to calculate your basal metabolic rate BMR (basal metabolic rate calculator, BMR calculator)" },
      { property: "og:url", content: "https://body-calculator.com/health/bmr-calculator/" }
    ]);
    this.CanonicalService.createCanonicalLink("https://body-calculator.com/health/bmr-calculator/");
    //shema
    this.schema = {
      "@context": "http://schema.org",
      "@type": "SoftwareApplication",
      "name": "basal metabolic rate BMR calculator",
      "image": "https://body-calculator.com/assets/images/logo/calculator.svg",
      "url": "https://body-calculator.com/health/bmr-calculator/",
      "author": {
        "@type": "Person",
        "name": "SARHABIL"
      },
      "datePublished": "2022-03-26",
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
  get formBmr() { return this.calculeBmr.controls; }

  public CalculateBmr(e: HTMLElement): void {
    this.submitted = true;
    if (this.calculeBmr.valid) {
      this.error = "";
      e.scrollIntoView({ behavior: "smooth" });
      if (this.checked === 'male') {
        if (this.selectedHeight === "cm" && this.selectedWeight === "kg") {
          let heightRslt = this.calculeBmr.value.height;
          let weightRslt = this.calculeBmr.value.weight;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age + 5;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "cm";
          this.selectedWeight = "kg";
        }
        //m kg
        if (this.selectedHeight === "m" && this.selectedWeight === "kg") {
          let heightRslt = this.calculeBmr.value.height * 100;
          let weightRslt = this.calculeBmr.value.weight;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age + 5;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "m";
          this.selectedWeight = "kg";
        }
        //in kg
        if (this.selectedHeight === "in" && this.selectedWeight === "kg") {
          let heightRslt = this.calculeBmr.value.height / .3937;
          let weightRslt = this.calculeBmr.value.weight;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age + 5;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "in";
          this.selectedWeight = "kg";
        }
        //feet kg
        if (this.selectedHeight === "ft" && this.selectedWeight === "kg") {
          let heightRslt = this.calculeBmr.value.height / 0.0328084;
          let weightRslt = this.calculeBmr.value.weight;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age + 5;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "ft";
          this.selectedWeight = "kg";
        }
        ///////dag
        //cm dag
        if (this.selectedHeight === "cm" && this.selectedWeight === "dag") {
          let heightRslt = this.calculeBmr.value.height;
          let weightRslt = this.calculeBmr.value.weight * 100;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age + 5;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "cm";
          this.selectedWeight = "dag";
        }
        //m dag
        if (this.selectedHeight === "m" && this.selectedWeight === "dag") {
          let heightRslt = this.calculeBmr.value.height / 100;
          let weightRslt = this.calculeBmr.value.weight * 100;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age + 5;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "m";
          this.selectedWeight = "dag";
        }
        //in dag
        if (this.selectedHeight === "in" && this.selectedWeight === "dag") {
          let heightRslt = this.calculeBmr.value.height / .3937;
          let weightRslt = this.calculeBmr.value.weight * 100;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age + 5;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "in";
          this.selectedWeight = "dag";
        }
        //feet dag
        if (this.selectedHeight === "ft" && this.selectedWeight === "dag") {
          let heightRslt = this.calculeBmr.value.height / 0.0328084;
          let weightRslt = this.calculeBmr.value.weight * 100;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age + 5;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "ft";
          this.selectedWeight = "dag";
        }
        ///////lb
        //cm dag
        if (this.selectedHeight === "cm" && this.selectedWeight === "lb") {
          let heightRslt = this.calculeBmr.value.height;
          let weightRslt = this.calculeBmr.value.weight * 2.205;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age + 5;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "cm";
          this.selectedWeight = "lb";
        }
        //m dag
        if (this.selectedHeight === "m" && this.selectedWeight === "lb") {
          let heightRslt = this.calculeBmr.value.height / 100;
          let weightRslt = this.calculeBmr.value.weight * 2.205;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age + 5;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "m";
          this.selectedWeight = "lb";
        }
        //in lb
        if (this.selectedHeight === "in" && this.selectedWeight === "lb") {
          let heightRslt = this.calculeBmr.value.height / .3937;
          let weightRslt = this.calculeBmr.value.weight * 2.205;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age + 5;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "in";
          this.selectedWeight = "lb";
        }
        //feet lb
        if (this.selectedHeight === "ft" && this.selectedWeight === "lb") {
          let heightRslt = this.calculeBmr.value.height / 0.0328084;
          let weightRslt = this.calculeBmr.value.weight * 2.205;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age + 5;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "ft";
          this.selectedWeight = "lb";
        }
        /////////OZ
        //cm oz
        if (this.selectedHeight === "cm" && this.selectedWeight === "oz") {
          let heightRslt = this.calculeBmr.value.height;
          let weightRslt = this.calculeBmr.value.weight * 35.274;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age + 5;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "cm";
          this.selectedWeight = "oz";
        }
        //m oz
        if (this.selectedHeight === "m" && this.selectedWeight === "oz") {
          let heightRslt = this.calculeBmr.value.height / 100;
          let weightRslt = this.calculeBmr.value.weight * 35.274;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age + 5;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "m";
          this.selectedWeight = "oz";
        }
        //in oz
        if (this.selectedHeight === "in" && this.selectedWeight === "oz") {
          let heightRslt = this.calculeBmr.value.height / .3937;
          let weightRslt = this.calculeBmr.value.weight * 35.274;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age + 5;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "in";
          this.selectedWeight = "oz";
        }
        //feet oz
        if (this.selectedHeight === "ft" && this.selectedWeight === "oz") {
          let heightRslt = this.calculeBmr.value.height / 0.0328084;
          let weightRslt = this.calculeBmr.value.weight * 35.274;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age + 5;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "ft";
          this.selectedWeight = "oz";
        }
      }
      if (this.checked === 'female') {
        if (this.selectedHeight === "cm" && this.selectedWeight === "kg") {
          let heightRslt = this.calculeBmr.value.height;
          let weightRslt = this.calculeBmr.value.weight;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age - 161;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "cm";
          this.selectedWeight = "kg";
        }
        //m kg
        if (this.selectedHeight === "m" && this.selectedWeight === "kg") {
          let heightRslt = this.calculeBmr.value.height * 100;
          let weightRslt = this.calculeBmr.value.weight;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age - 161;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "m";
          this.selectedWeight = "kg";
        }
        //in kg
        if (this.selectedHeight === "in" && this.selectedWeight === "kg") {
          let heightRslt = this.calculeBmr.value.height / .3937;
          let weightRslt = this.calculeBmr.value.weight;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age - 161;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "in";
          this.selectedWeight = "kg";
        }
        //feet kg
        if (this.selectedHeight === "ft" && this.selectedWeight === "kg") {
          let heightRslt = this.calculeBmr.value.height / 0.0328084;
          let weightRslt = this.calculeBmr.value.weight;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age - 161;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "ft";
          this.selectedWeight = "kg";
        }
        ///////dag
        //cm dag
        if (this.selectedHeight === "cm" && this.selectedWeight === "dag") {
          let heightRslt = this.calculeBmr.value.height;
          let weightRslt = this.calculeBmr.value.weight * 100;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age - 161;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "cm";
          this.selectedWeight = "dag";
        }
        //m dag
        if (this.selectedHeight === "m" && this.selectedWeight === "dag") {
          let heightRslt = this.calculeBmr.value.height / 100;
          let weightRslt = this.calculeBmr.value.weight * 100;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age - 161;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "m";
          this.selectedWeight = "dag";
        }
        //in dag
        if (this.selectedHeight === "in" && this.selectedWeight === "dag") {
          let heightRslt = this.calculeBmr.value.height / .3937;
          let weightRslt = this.calculeBmr.value.weight * 100;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age - 161;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "in";
          this.selectedWeight = "dag";
        }
        //feet dag
        if (this.selectedHeight === "ft" && this.selectedWeight === "dag") {
          let heightRslt = this.calculeBmr.value.height / 0.0328084;
          let weightRslt = this.calculeBmr.value.weight * 100;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age - 161;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "ft";
          this.selectedWeight = "dag";
        }
        ///////lb
        //cm dag
        if (this.selectedHeight === "cm" && this.selectedWeight === "lb") {
          let heightRslt = this.calculeBmr.value.height;
          let weightRslt = this.calculeBmr.value.weight * 2.205;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age - 161;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "cm";
          this.selectedWeight = "lb";
        }
        //m dag
        if (this.selectedHeight === "m" && this.selectedWeight === "lb") {
          let heightRslt = this.calculeBmr.value.height / 100;
          let weightRslt = this.calculeBmr.value.weight * 2.205;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age - 161;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "m";
          this.selectedWeight = "lb";
        }
        //in lb
        if (this.selectedHeight === "in" && this.selectedWeight === "lb") {
          let heightRslt = this.calculeBmr.value.height / .3937;
          let weightRslt = this.calculeBmr.value.weight * 2.205;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age - 161;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "in";
          this.selectedWeight = "lb";
        }
        //feet lb
        if (this.selectedHeight === "ft" && this.selectedWeight === "lb") {
          let heightRslt = this.calculeBmr.value.height / 0.0328084;
          let weightRslt = this.calculeBmr.value.weight * 2.205;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age - 161;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "ft";
          this.selectedWeight = "lb";
        }
        /////////OZ
        //cm oz
        if (this.selectedHeight === "cm" && this.selectedWeight === "oz") {
          let heightRslt = this.calculeBmr.value.height;
          let weightRslt = this.calculeBmr.value.weight * 35.274;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age - 161;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "cm";
          this.selectedWeight = "oz";
        }
        //m oz
        if (this.selectedHeight === "m" && this.selectedWeight === "oz") {
          let heightRslt = this.calculeBmr.value.height / 100;
          let weightRslt = this.calculeBmr.value.weight * 35.274;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age - 161;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "m";
          this.selectedWeight = "oz";
        }
        //in oz
        if (this.selectedHeight === "in" && this.selectedWeight === "oz") {
          let heightRslt = this.calculeBmr.value.height / .3937;
          let weightRslt = this.calculeBmr.value.weight * 35.274;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age - 161;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "in";
          this.selectedWeight = "oz";
        }
        //feet oz
        if (this.selectedHeight === "ft" && this.selectedWeight === "oz") {
          let heightRslt = this.calculeBmr.value.height / 0.0328084;
          let weightRslt = this.calculeBmr.value.weight * 35.274;
          this.bmr = 10 * weightRslt + 6.25 * heightRslt - 5 * this.calculeBmr.value.age - 161;
          this.bmr = Math.round(this.bmr);
          this.selectedHeight = "ft";
          this.selectedWeight = "oz";
        }
      }
    } else {
      this.error = "Please check the fields";
    }
  }
  checkedGender(v: any) {
    this.checked = v.target.value;
  }
  heightSelect(v: any) {
    //cm
    if (this.selectedHeight === "cm") {
      if (v.target.value === 'm') {
        this.modelsBmr.height = this.calculeBmr.value.height / 100;
        this.modelsBmr.height = Math.round(this.modelsBmr.height * 100) / 100;
        this.selectedHeight = "m";
      }
      if (v.target.value == 'in') {
        this.modelsBmr.height = (this.calculeBmr.value.height / 100) * 39.37;
        this.modelsBmr.height = Math.round(this.modelsBmr.height * 100) / 100;
        this.selectedHeight = "in"
      }
      if (v.target.value == 'ft') {
        // this.modelsBmr.height = (this.calculeBmr.value.height * 100) / 0.3048;
        this.modelsBmr.height = this.calculeBmr.value.height / 30.48;
        this.modelsBmr.height = Math.round(this.modelsBmr.height * 100) / 100;
        this.selectedHeight = "ft"
      }
      //m
    } if (this.selectedHeight === "m") {
      if (v.target.value === 'cm') {
        this.modelsBmr.height = this.calculeBmr.value.height * 100;
        this.modelsBmr.height = Math.round(this.modelsBmr.height * 100) / 100;
        this.selectedHeight = "cm"
      }
      if (v.target.value == 'in') {
        this.modelsBmr.height = this.calculeBmr.value.height * 39.37;
        this.modelsBmr.height = Math.round(this.modelsBmr.height * 100) / 100;
        this.selectedHeight = "in"
      }
      if (v.target.value == 'ft') {
        this.modelsBmr.height = this.calculeBmr.value.height / 0.3048;
        this.modelsBmr.height = Math.round(this.modelsBmr.height * 100) / 100;
        this.selectedHeight = "ft"
      }
    }
    //in
    if (this.selectedHeight === "in") {
      if (v.target.value == 'm') {
        this.modelsBmr.height = this.calculeBmr.value.height / 39.37;
        this.modelsBmr.height = Math.round(this.modelsBmr.height * 100) / 100;
        this.selectedHeight = "m"
      }
      if (v.target.value == 'cm') {
        this.modelsBmr.height = (this.calculeBmr.value.height * 100) / 39.37;
        this.modelsBmr.height = Math.round(this.modelsBmr.height * 100) / 100;
        this.selectedHeight = "cm"
      }
      if (v.target.value == 'ft') {
        // this.modelsBmr.height = (this.calculeBmr.value.height / 39.37) / 0.3048;
        this.modelsBmr.height = this.calculeBmr.value.height / 12;
        this.modelsBmr.height = Math.round(this.modelsBmr.height * 100) / 100;
        this.selectedHeight = "ft"
      }
    }
    //ft
    if (this.selectedHeight === "ft") {
      if (v.target.value == 'm') {
        this.modelsBmr.height = this.calculeBmr.value.height * 0.3048;
        this.modelsBmr.height = Math.round(this.modelsBmr.height * 100) / 100;
        this.selectedHeight = "m"
      }
      if (v.target.value == 'cm') {
        // this.modelsBmr.height = (this.calculeBmr.value.height * 100) * 0.3048;
        this.modelsBmr.height = this.calculeBmr.value.height * 30.48;
        this.modelsBmr.height = Math.round(this.modelsBmr.height * 100) / 100;
        this.selectedHeight = "cm"
      }
      if (v.target.value == 'in') {
        this.modelsBmr.height = this.calculeBmr.value.height * 12;
        this.modelsBmr.height = Math.round(this.modelsBmr.height * 100) / 100;
        this.selectedHeight = "in"
      }
    }
  }
  //
  weightSelect(v: any) {
    //km
    if (this.selectedWeight === "kg") {
      if (v.target.value === 'lb') {
        this.modelsBmr.weight = this.calculeBmr.value.weight * 2.205;
        this.modelsBmr.weight = Math.round(this.modelsBmr.weight * 100) / 100;
        this.selectedWeight = "lb";
      }
      if (v.target.value === 'dag') {
        this.modelsBmr.weight = this.calculeBmr.value.weight * 100;
        this.modelsBmr.weight = Math.round(this.modelsBmr.weight * 100) / 100;
        this.selectedWeight = "dag";
      }
      if (v.target.value === 'oz') {
        this.modelsBmr.weight = this.calculeBmr.value.weight * 35.274;
        this.modelsBmr.weight = Math.round(this.modelsBmr.weight * 100) / 100;
        this.selectedWeight = "oz";
      }
    }
    //dag
    if (this.selectedWeight === "dag") {
      if (v.target.value === 'kg') {
        this.modelsBmr.weight = this.calculeBmr.value.weight / 100;
        this.modelsBmr.weight = Math.round(this.modelsBmr.weight * 100) / 100;
        this.selectedWeight = "kg";
      }
      if (v.target.value === 'lb') {
        this.modelsBmr.weight = this.calculeBmr.value.weight / 45.359;
        this.modelsBmr.weight = Math.round(this.modelsBmr.weight * 100) / 100;
        this.selectedWeight = "lb";
      }
      if (v.target.value === 'oz') {
        this.modelsBmr.weight = this.calculeBmr.value.weight / 2.835;
        this.modelsBmr.weight = Math.round(this.modelsBmr.weight * 100) / 100;
        this.selectedWeight = "oz";
      }
    }
    //lb
    if (this.selectedWeight === "lb") {
      if (v.target.value === 'kg') {
        this.modelsBmr.weight = this.calculeBmr.value.weight / 2.205;
        this.modelsBmr.weight = Math.round(this.modelsBmr.weight * 100) / 100;
        this.selectedWeight = "kg";
      }
      if (v.target.value === 'oz') {
        this.modelsBmr.weight = this.calculeBmr.value.weight * 16;
        this.modelsBmr.weight = Math.round(this.modelsBmr.weight * 100) / 100;
        this.selectedWeight = "oz";
      }
      if (v.target.value === 'dag') {
        this.modelsBmr.weight = this.calculeBmr.value.weight * 45.359;
        this.modelsBmr.weight = Math.round(this.modelsBmr.weight * 100) / 100;
        this.selectedWeight = "dag";
      }
    }
    //oz
    if (this.selectedWeight === "oz") {
      if (v.target.value === 'kg') {
        this.modelsBmr.weight = this.calculeBmr.value.weight / 35.274;
        this.modelsBmr.weight = Math.round(this.modelsBmr.weight * 100) / 100;
        this.selectedWeight = "kg";
      }
      if (v.target.value === 'lb') {
        this.modelsBmr.weight = this.calculeBmr.value.weight / 16;
        this.modelsBmr.weight = Math.round(this.modelsBmr.weight * 100) / 100;
        this.selectedWeight = "lb";
      }
      if (v.target.value === 'dag') {
        this.modelsBmr.weight = this.calculeBmr.value.weight * 2.835;
        this.modelsBmr.weight = Math.round(this.modelsBmr.weight * 100) / 100;
        this.selectedWeight = "dag";
      }
    }

  }

}
