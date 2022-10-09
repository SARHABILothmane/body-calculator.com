import { CanonicalService } from 'src/app/services/canonical.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, Validators, UntypedFormControl } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Bsc } from 'src/app/models/bsc';

@Component({
  selector: 'app-body-shape-calculator',
  templateUrl: './body-shape-calculator.component.html',
  styleUrls: ['./body-shape-calculator.component.scss']
})
export class BodyShapeCalculatorComponent implements OnInit {
  calculeBsc!: UntypedFormGroup;
  selectedBust: string = "cm";
  selectedWaist: string = "cm";
  selectedHighHip: string = "cm";
  selectedHip: string = "cm";
  bust!: number;
  waist!: number;
  highHip!: number;
  hip!: number;
  whr!: number;
  whrRslt: string = "";
  message: string = "";
  modelsBsc: Bsc = {
    bust: 90,
    waist: 60,
    highHip: 80,
    hip: 90,
  }
  error: string = "";
  schema!: any;
  submitted = false;
  envirement: boolean = environment.production;

  constructor(private titleService: Title, private metaService: Meta, private CanonicalService: CanonicalService) {
    this.calculeBsc = new UntypedFormGroup({
      bust: new UntypedFormControl("", [Validators.required]),
      waist: new UntypedFormControl("", [Validators.required]),
      highHip: new UntypedFormControl("", [Validators.required]),
      hip: new UntypedFormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle("Free online body shape calculator - what body shape calculator");
    this.metaService.addTags([
      { name: 'keywords', content: "body shape calculator, body figure, body type calculator, body shape calculator female,  hourglass figure measurements" },
      { name: 'description', content: "Free online body shape calculator tool ( body shape calculator female, body type calculator, what body shape calculator )" },
      { property: 'og:title', content: "Free online body shape calculator - what body shape calculator" },
      { property: 'og:description', content: "Free online body shape calculator tool ( body shape calculator female, body type calculator, what body shape calculator )" },
      { property: "og:url", content: "https://body-calculator.com/health/body-shape-calculator/" }
    ]);
    this.CanonicalService.createCanonicalLink("https://body-calculator.com/health/body-shape-calculator/");
    //shema
    this.schema = {
      "@context": "http://schema.org",
      "@type": "SoftwareApplication",
      "name": "Body shape calculator",
      "image": "https://body-calculator.com/assets/images/logo/calculator.svg",
      "url": "https://body-calculator.com/health/body-shape-calculator/",
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
  get formBsc() { return this.calculeBsc.controls; }
  public CalculateBsc(e: HTMLElement): void {
    this.submitted = true;
    if (this.calculeBsc.valid) {
      this.error = "";
      this.bust = this.calculeBsc.value.bust;
      this.waist = this.calculeBsc.value.waist;
      this.highHip = this.calculeBsc.value.highHip;
      this.hip = this.calculeBsc.value.hip;
      this.whr = this.waist / this.hip;
      this.whrRslt = this.whr.toFixed(2);
      e.scrollIntoView({ behavior: "smooth" });
      if (this.bust - this.hip <= 1 && this.hip - this.bust < 3.6 && this.bust - this.waist >= 9 || this.hip - this.waist >= 10) {
        this.message = "Hourglass";
      }
      if (this.hip - this.bust >= 3.6 && this.hip - this.bust < 10 && this.hip - this.waist >= 9 && this.highHip / this.waist < 1.193) {
        this.message = "Bottom hourglass";
      }
      if (this.bust - this.hip > 1 && this.bust - this.hip < 10 && this.bust - this.waist >= 9) {
        this.message = "Top hourglass";
      }
      if (this.hip - this.bust > 2 && this.hip - this.waist >= 7 && this.highHip / this.waist < 1.193) {
        this.message = "Spoon";
      }
      if (this.hip - this.bust >= 3.6 && this.hip - this.waist < 9) {
        this.message = "Triangle";
      }
      if (this.bust - this.hip >= 3.6 && this.bust - this.waist < 9) {
        this.message = "Inverted triangle";
      }
      if (this.hip - this.bust < 3.6 && this.bust - this.hip < 3.6 && this.bust - this.waist < 9 && this.hip - this.waist < 10) {
        this.message = "Rectangle";
      }
    } else {
      this.error = "Please check the fields";
    }
  }
  bustSelect(v: any) {
    //cm
    if (this.selectedBust === "cm") {
      if (v.target.value === 'm') {
        this.modelsBsc.bust = this.calculeBsc.value.bust / 100;
        this.modelsBsc.bust = Math.round(this.modelsBsc.bust * 100) / 100;
        this.selectedBust = "m";
      }
      if (v.target.value == 'in') {
        this.modelsBsc.bust = (this.calculeBsc.value.bust / 100) * 39.37;
        this.modelsBsc.bust = Math.round(this.modelsBsc.bust * 100) / 100;
        this.selectedBust = "in"
      }
      if (v.target.value == 'ft') {
        this.modelsBsc.bust = this.calculeBsc.value.bust / 30.48;
        this.modelsBsc.bust = Math.round(this.modelsBsc.bust * 100) / 100;
        this.selectedBust = "ft"
      }
      //m
    } if (this.selectedBust === "m") {
      if (v.target.value === 'cm') {
        this.modelsBsc.bust = this.calculeBsc.value.bust * 100;
        this.modelsBsc.bust = Math.round(this.modelsBsc.bust * 100) / 100;
        this.selectedBust = "cm"
      }
      if (v.target.value == 'in') {
        this.modelsBsc.bust = this.calculeBsc.value.bust * 39.37;
        this.modelsBsc.bust = Math.round(this.modelsBsc.bust * 100) / 100;
        this.selectedBust = "in"
      }
      if (v.target.value == 'ft') {
        this.modelsBsc.bust = this.calculeBsc.value.bust / 0.3048;
        this.modelsBsc.bust = Math.round(this.modelsBsc.bust * 100) / 100;
        this.selectedBust = "ft"
      }
    }
    //in
    if (this.selectedBust === "in") {
      if (v.target.value == 'm') {
        this.modelsBsc.bust = this.calculeBsc.value.bust / 39.37;
        this.modelsBsc.bust = Math.round(this.modelsBsc.bust * 100) / 100;
        this.selectedBust = "m"
      }
      if (v.target.value == 'cm') {
        this.modelsBsc.bust = (this.calculeBsc.value.bust * 100) / 39.37;
        this.modelsBsc.bust = Math.round(this.modelsBsc.bust * 100) / 100;
        this.selectedBust = "cm"
      }
      if (v.target.value == 'ft') {
        this.modelsBsc.bust = this.calculeBsc.value.bust / 12;
        this.modelsBsc.bust = Math.round(this.modelsBsc.bust * 100) / 100;
        this.selectedBust = "ft"
      }
    }
    //ft
    if (this.selectedBust === "ft") {
      if (v.target.value == 'm') {
        this.modelsBsc.bust = this.calculeBsc.value.bust * 0.3048;
        this.modelsBsc.bust = Math.round(this.modelsBsc.bust * 100) / 100;
        this.selectedBust = "m"
      }
      if (v.target.value == 'cm') {
        this.modelsBsc.bust = this.calculeBsc.value.bust * 30.48;
        this.modelsBsc.bust = Math.round(this.modelsBsc.bust * 100) / 100;
        this.selectedBust = "cm"
      }
      if (v.target.value == 'in') {
        this.modelsBsc.bust = this.calculeBsc.value.bust * 12;
        this.modelsBsc.bust = Math.round(this.modelsBsc.bust * 100) / 100;
        this.selectedBust = "in"
      }
    }
  }
  waistSelect(v: any) {
    //cm
    if (this.selectedWaist === "cm") {
      if (v.target.value === 'm') {
        this.modelsBsc.waist = this.calculeBsc.value.waist / 100;
        this.modelsBsc.waist = Math.round(this.modelsBsc.waist * 100) / 100;
        this.selectedWaist = "m";
      }
      if (v.target.value == 'in') {
        this.modelsBsc.waist = (this.calculeBsc.value.waist / 100) * 39.37;
        this.modelsBsc.waist = Math.round(this.modelsBsc.waist * 100) / 100;
        this.selectedWaist = "in"
      }
      if (v.target.value == 'ft') {
        this.modelsBsc.waist = this.calculeBsc.value.waist / 30.48;
        this.modelsBsc.waist = Math.round(this.modelsBsc.waist * 100) / 100;
        this.selectedWaist = "ft"
      }
      //m
    } if (this.selectedWaist === "m") {
      if (v.target.value === 'cm') {
        this.modelsBsc.waist = this.calculeBsc.value.waist * 100;
        this.modelsBsc.waist = Math.round(this.modelsBsc.waist * 100) / 100;
        this.selectedWaist = "cm"
      }
      if (v.target.value == 'in') {
        this.modelsBsc.waist = this.calculeBsc.value.waist * 39.37;
        this.modelsBsc.waist = Math.round(this.modelsBsc.waist * 100) / 100;
        this.selectedWaist = "in"
      }
      if (v.target.value == 'ft') {
        this.modelsBsc.waist = this.calculeBsc.value.waist / 0.3048;
        this.modelsBsc.waist = Math.round(this.modelsBsc.waist * 100) / 100;
        this.selectedWaist = "ft"
      }
    }
    //in
    if (this.selectedWaist === "in") {
      if (v.target.value == 'm') {
        this.modelsBsc.waist = this.calculeBsc.value.waist / 39.37;
        this.modelsBsc.waist = Math.round(this.modelsBsc.waist * 100) / 100;
        this.selectedWaist = "m"
      }
      if (v.target.value == 'cm') {
        this.modelsBsc.waist = (this.calculeBsc.value.waist * 100) / 39.37;
        this.modelsBsc.waist = Math.round(this.modelsBsc.waist * 100) / 100;
        this.selectedWaist = "cm"
      }
      if (v.target.value == 'ft') {
        this.modelsBsc.waist = this.calculeBsc.value.waist / 12;
        this.modelsBsc.waist = Math.round(this.modelsBsc.waist * 100) / 100;
        this.selectedWaist = "ft"
      }
    }
    //ft
    if (this.selectedWaist === "ft") {
      if (v.target.value == 'm') {
        this.modelsBsc.waist = this.calculeBsc.value.waist * 0.3048;
        this.modelsBsc.waist = Math.round(this.modelsBsc.waist * 100) / 100;
        this.selectedWaist = "m"
      }
      if (v.target.value == 'cm') {
        this.modelsBsc.waist = this.calculeBsc.value.waist * 30.48;
        this.modelsBsc.waist = Math.round(this.modelsBsc.waist * 100) / 100;
        this.selectedWaist = "cm"
      }
      if (v.target.value == 'in') {
        this.modelsBsc.waist = this.calculeBsc.value.waist * 12;
        this.modelsBsc.waist = Math.round(this.modelsBsc.waist * 100) / 100;
        this.selectedWaist = "in"
      }
    }
  }
  highHipSelect(v: any) {
    //cm
    if (this.selectedHighHip === "cm") {
      if (v.target.value === 'm') {
        this.modelsBsc.highHip = this.calculeBsc.value.highHip / 100;
        this.modelsBsc.highHip = Math.round(this.modelsBsc.highHip * 100) / 100;
        this.selectedHighHip = "m";
      }
      if (v.target.value == 'in') {
        this.modelsBsc.highHip = (this.calculeBsc.value.highHip / 100) * 39.37;
        this.modelsBsc.highHip = Math.round(this.modelsBsc.highHip * 100) / 100;
        this.selectedHighHip = "in"
      }
      if (v.target.value == 'ft') {
        this.modelsBsc.highHip = this.calculeBsc.value.highHip / 30.48;
        this.modelsBsc.highHip = Math.round(this.modelsBsc.highHip * 100) / 100;
        this.selectedHighHip = "ft"
      }
      //m
    } if (this.selectedHighHip === "m") {
      if (v.target.value === 'cm') {
        this.modelsBsc.highHip = this.calculeBsc.value.highHip * 100;
        this.modelsBsc.highHip = Math.round(this.modelsBsc.highHip * 100) / 100;
        this.selectedHighHip = "cm"
      }
      if (v.target.value == 'in') {
        this.modelsBsc.highHip = this.calculeBsc.value.highHip * 39.37;
        this.modelsBsc.highHip = Math.round(this.modelsBsc.highHip * 100) / 100;
        this.selectedHighHip = "in"
      }
      if (v.target.value == 'ft') {
        this.modelsBsc.highHip = this.calculeBsc.value.highHip / 0.3048;
        this.modelsBsc.highHip = Math.round(this.modelsBsc.highHip * 100) / 100;
        this.selectedHighHip = "ft"
      }
    }
    //in
    if (this.selectedHighHip === "in") {
      if (v.target.value == 'm') {
        this.modelsBsc.highHip = this.calculeBsc.value.highHip / 39.37;
        this.modelsBsc.highHip = Math.round(this.modelsBsc.highHip * 100) / 100;
        this.selectedHighHip = "m"
      }
      if (v.target.value == 'cm') {
        this.modelsBsc.highHip = (this.calculeBsc.value.highHip * 100) / 39.37;
        this.modelsBsc.highHip = Math.round(this.modelsBsc.highHip * 100) / 100;
        this.selectedHighHip = "cm"
      }
      if (v.target.value == 'ft') {
        this.modelsBsc.highHip = this.calculeBsc.value.highHip / 12;
        this.modelsBsc.highHip = Math.round(this.modelsBsc.highHip * 100) / 100;
        this.selectedHighHip = "ft"
      }
    }
    //ft
    if (this.selectedHighHip === "ft") {
      if (v.target.value == 'm') {
        this.modelsBsc.highHip = this.calculeBsc.value.highHip * 0.3048;
        this.modelsBsc.highHip = Math.round(this.modelsBsc.highHip * 100) / 100;
        this.selectedHighHip = "m"
      }
      if (v.target.value == 'cm') {
        this.modelsBsc.highHip = this.calculeBsc.value.highHip * 30.48;
        this.modelsBsc.highHip = Math.round(this.modelsBsc.highHip * 100) / 100;
        this.selectedHighHip = "cm"
      }
      if (v.target.value == 'in') {
        this.modelsBsc.highHip = this.calculeBsc.value.highHip * 12;
        this.modelsBsc.highHip = Math.round(this.modelsBsc.highHip * 100) / 100;
        this.selectedHighHip = "in"
      }
    }
  }
  hipSelect(v: any) {
    //cm
    if (this.selectedHip === "cm") {
      if (v.target.value === 'm') {
        this.modelsBsc.hip = this.calculeBsc.value.hip / 100;
        this.modelsBsc.hip = Math.round(this.modelsBsc.hip * 100) / 100;
        this.selectedHip = "m";
      }
      if (v.target.value == 'in') {
        this.modelsBsc.hip = (this.calculeBsc.value.hip / 100) * 39.37;
        this.modelsBsc.hip = Math.round(this.modelsBsc.hip * 100) / 100;
        this.selectedHip = "in"
      }
      if (v.target.value == 'ft') {
        this.modelsBsc.hip = this.calculeBsc.value.hip / 30.48;
        this.modelsBsc.hip = Math.round(this.modelsBsc.hip * 100) / 100;
        this.selectedHip = "ft"
      }
      //m
    } if (this.selectedHip === "m") {
      if (v.target.value === 'cm') {
        this.modelsBsc.hip = this.calculeBsc.value.hip * 100;
        this.modelsBsc.hip = Math.round(this.modelsBsc.hip * 100) / 100;
        this.selectedHip = "cm"
      }
      if (v.target.value == 'in') {
        this.modelsBsc.hip = this.calculeBsc.value.hip * 39.37;
        this.modelsBsc.hip = Math.round(this.modelsBsc.hip * 100) / 100;
        this.selectedHip = "in"
      }
      if (v.target.value == 'ft') {
        this.modelsBsc.hip = this.calculeBsc.value.hip / 0.3048;
        this.modelsBsc.hip = Math.round(this.modelsBsc.hip * 100) / 100;
        this.selectedHip = "ft"
      }
    }
    //in
    if (this.selectedHip === "in") {
      if (v.target.value == 'm') {
        this.modelsBsc.hip = this.calculeBsc.value.hip / 39.37;
        this.modelsBsc.hip = Math.round(this.modelsBsc.hip * 100) / 100;
        this.selectedHip = "m"
      }
      if (v.target.value == 'cm') {
        this.modelsBsc.hip = (this.calculeBsc.value.hip * 100) / 39.37;
        this.modelsBsc.hip = Math.round(this.modelsBsc.hip * 100) / 100;
        this.selectedHip = "cm"
      }
      if (v.target.value == 'ft') {
        this.modelsBsc.hip = this.calculeBsc.value.hip / 12;
        this.modelsBsc.hip = Math.round(this.modelsBsc.hip * 100) / 100;
        this.selectedHip = "ft"
      }
    }
    //ft
    if (this.selectedHip === "ft") {
      if (v.target.value == 'm') {
        this.modelsBsc.hip = this.calculeBsc.value.hip * 0.3048;
        this.modelsBsc.hip = Math.round(this.modelsBsc.hip * 100) / 100;
        this.selectedHip = "m"
      }
      if (v.target.value == 'cm') {
        this.modelsBsc.hip = this.calculeBsc.value.hip * 30.48;
        this.modelsBsc.hip = Math.round(this.modelsBsc.hip * 100) / 100;
        this.selectedHip = "cm"
      }
      if (v.target.value == 'in') {
        this.modelsBsc.hip = this.calculeBsc.value.hip * 12;
        this.modelsBsc.hip = Math.round(this.modelsBsc.hip * 100) / 100;
        this.selectedHip = "in"
      }
    }
  }

}
