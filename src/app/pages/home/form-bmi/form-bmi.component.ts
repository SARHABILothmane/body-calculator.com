import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Bmi } from 'src/app/models/bmi';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-bmi',
  templateUrl: './form-bmi.component.html',
  styleUrls: ['./form-bmi.component.scss']
})
export class FormBmiComponent implements OnInit {

  calculeForm!: UntypedFormGroup;
  calculeFormImperial!: UntypedFormGroup;
  height!: number;
  weight!: number;
  bmi!: number;
  heightCm!: number;
  index: number = 0;
  error: string = "";
  submitted = false;
  message: string = "";
  addCataloge: boolean = false;
  tabTitle: string = "";
  checkAge: number = 0;
  modelsBmi: Bmi = {
    age: 0,
    height: 0,
    weight: 0,
    weightImperial: 0,
    heightImperial: 0,
  }
  envirement: boolean = environment.production;
  switchTabs: string = "Metric";
  constructor() { }

  ngOnInit(): void {
    this.calculeForm = new UntypedFormGroup({
      age: new UntypedFormControl("", [Validators.required, Validators.min(5), Validators.max(100)]),
      height: new UntypedFormControl("", [Validators.required]),
      weight: new UntypedFormControl("", [Validators.required]),
    });
    this.calculeFormImperial = new UntypedFormGroup({
      age: new UntypedFormControl("", [Validators.required, Validators.min(5), Validators.max(100)]),
      hFeet: new UntypedFormControl("", [Validators.required]),
      heightImperial: new UntypedFormControl("", [Validators.required]),
      weightImperial: new UntypedFormControl("", [Validators.required]),
    });
  }
  get formBmi() { return this.calculeForm.controls; }
  get formBmiImeprial() { return this.calculeFormImperial.controls; }

  claculteBmi(el: HTMLElement) {
    this.submitted = true;
    if (this.calculeForm.valid) {
      this.error = "";
      this.addCataloge = true;
      // this.bmi = this.height * this.height / this.weight;
      this.heightCm = this.calculeForm.value.height / 100
      // this.bmi = this.calculeForm.value.weight / (this.calculeForm.value.height * this.calculeForm.value.height);
      this.bmi = this.calculeForm.value.weight / (this.heightCm * this.heightCm);
      this.checkAge = this.modelsBmi.age;
      el.scrollIntoView({ behavior: "smooth" });
      if (this.checkAge >= 20) {
        if (this.bmi < 16) {
          this.message = "Severe thinness";
        }
        if (this.bmi >= 16 && this.bmi <= 17) {
          this.message = "Moderate thinness";
        }
        if (this.bmi >= 17 && this.bmi <= 18.5) {
          this.message = "Mild thinness";
        }
        if (this.bmi >= 18.5 && this.bmi <= 24.99) {
          this.message = "Healthy weight";
        }
        if (this.bmi >= 25 && this.bmi <= 29.99) {
          this.message = "Overweight";
        }
        if (this.bmi >= 30 && this.bmi < 34.99) {
          this.message = "Obese class Ⅰ";
        }
        if (this.bmi >= 35 && this.bmi < 39.99) {
          this.message = "Obese class Ⅱ";
        }
        if (this.bmi >= 40) {
          this.message = "Obese class Ⅲ";
        }
      } if (this.checkAge < 20) {
        if (this.bmi < 5) {
          this.message = "Underweight";
        }
        if (this.bmi >= 5 && this.bmi <= 85) {
          this.message = "Healthy weight";
        }
        if (this.bmi >= 85 && this.bmi <= 95) {
          this.message = "At risk of overweight	";
        }
        if (this.bmi >= 95) {
          this.message = "Overweight";
        }
      }

    } else {
      this.error = "Please check the fields";
    }
    // this.calculeForm.reset();
  }
  square(firstNumber: number, secondNumber: number): number {
    return firstNumber ** secondNumber
  }
  claculteBmiImperiale(el: HTMLElement) {
    this.submitted = true;
    if (this.calculeFormImperial.valid) {
      this.error = "";
      this.addCataloge = true;
      // Formula: weight (lb) / [height (in)]2 x 703
      // Calculate BMI by dividing weight in pounds (lbs) by height in inches (in) squared and multiplying by a conversion factor of 703.
      // Example: Weight = 150 lbs, Height = 5’5″ (65″)
      // Calculation: [150 ÷ (65)2] x 703 = 24.96
      let heightRslt = this.calculeFormImperial.value.hFeet * 12 + this.calculeFormImperial.value.heightImperial
      this.bmi = this.calculeFormImperial.value.weightImperial / (this.square(heightRslt, 2)) * 703
      this.checkAge = this.modelsBmi.age
      el.scrollIntoView({ behavior: "smooth" });
      // this.bmi = this.calculeForm.value.weight / (this.calculeForm.value.height * this.calculeForm.value.height);
      if (this.checkAge > 20) {
        if (this.bmi < 16) {
          this.message = "Severe thinness";
        }
        if (this.bmi >= 16 && this.bmi <= 17) {
          this.message = "Moderate thinness";
        }
        if (this.bmi >= 17 && this.bmi <= 18.5) {
          this.message = "Mild thinness";
        }
        if (this.bmi >= 18.5 && this.bmi <= 24.99) {
          this.message = "Healthy weight";
        }
        if (this.bmi >= 25 && this.bmi <= 29.99) {
          this.message = "Overweight";
        }
        if (this.bmi >= 30 && this.bmi < 34.99) {
          this.message = "Obese class Ⅰ";
        }
        if (this.bmi >= 35 && this.bmi < 39.99) {
          this.message = "Obese class Ⅱ";
        }
        if (this.bmi >= 40) {
          this.message = "Obese class Ⅲ";
        }
      } else if (this.checkAge < 20) {
        if (this.bmi < 5) {
          this.message = "Underweight";
        }
        if (this.bmi >= 5 && this.bmi <= 85) {
          this.message = "Healthy weight";
        }
        if (this.bmi >= 85 && this.bmi <= 95) {
          this.message = "At risk of overweight	";
        }
        if (this.bmi >= 95) {
          this.message = "Overweight";
        }
      }

    } else {
      this.error = "Please check the fields";
    }
  }
  tabsSet(name: string) {
    console.log(name);
    this.switchTabs = name;
    if (this.switchTabs === "Imperial") {
      this.modelsBmi.weightImperial = this.modelsBmi.weight * 2.205;
      this.modelsBmi.heightImperial = this.modelsBmi.height / 30.48;
    }
    if (this.switchTabs === "Metric") {
      this.modelsBmi.weight = this.modelsBmi.weightImperial / 2.205;
      this.modelsBmi.heightImperial = this.modelsBmi.height * 30.48;
    }

  }
  // public onChange(event: any): void {
  //   console.log(event);
  //   // if (this.tabTitle === "Metric") {
  //   //   this.modelsBmi.heightImperial = 10;
  //   // }
  // }
  calculateHeightImperial(heightImperial: number) {
    return heightImperial;
  }
}
