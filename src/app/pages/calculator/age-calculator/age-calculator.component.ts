import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from 'src/app/services/canonical.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-age-calculator',
  templateUrl: './age-calculator.component.html',
  styleUrls: ['./age-calculator.component.scss']
})
export class AgeCalculatorComponent implements OnInit {
  calculeAge!: UntypedFormGroup;
  rslt: number = 0;
  month: number = 0;
  monthF: number = 0;
  year: number = 0;
  week: number = 0;
  weekF: number = 0;
  day: number | string = 0;
  dayF: number = 0;
  dayW: number = 0;
  calDayBr: number = 0;
  calDayTo: number = 0;
  rsltCalDayTo: number = 0;
  hours: number | string = 0;
  minute: number | string = 0;
  second: number | string = 0;
  public age!: number;
  schema!: any;
  checkForm: boolean = false;
  error: string = "";
  envirement: boolean = environment.production;

  constructor(private titleService: Title, private metaService: Meta, private canonical: CanonicalService) {
    this.calculeAge = new UntypedFormGroup({
      birthday: new UntypedFormControl("", [Validators.required]),
      today: new UntypedFormControl(new Date(), [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.titleService.setTitle("Free online age calculator by date of birth");
    this.metaService.addTags([
      { name: 'keywords', content: "age calculator, date of birth calculator, birthday calculator, chronological age calculator, life expectancy calculator, calculate age from date of birth, age calculator by date of birth, age calculator pearson" },
      { name: 'description', content: "Free online age calculator (chronological age calculator, calculate age from date of birth, age calculator by date of birth, date of birth calculator)" },
      { property: 'og:title', content: "Free online age calculator by date of birth" },
      { property: 'og:description', content: "Free online age calculator (chronological age calculator, calculate age from date of birth, age calculator by date of birth, date of birth calculator)" },
      { property: "og:url", content: "https://body-calculator.com/calculators/age-calculator/" }
    ]);
    this.canonical.createCanonicalLink("https://body-calculator.com/calculators/age-calculator/");
    //shema
    this.schema = {
      "@context": "http://schema.org",
      "@type": "SoftwareApplication",
      "name": "Age calculator",
      "image": "https://body-calculator.com/assets/images/logo/calculator.svg",
      "url": "https://body-calculator.com/calculators/age-calculator/",
      "author": {
        "@type": "Person",
        "name": "SARHABIL"
      },
      "datePublished": "2022-01-10",
      "publisher": {
        "@type": "Organization",
        "name": "body-calculator"
      },
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


  CalculateAge(e: HTMLElement) {
    this.error = "";
    if (this.calculeAge.valid) {
      if (this.birthday.value > this.today.value) {
        this.error = "Date of birth needs to be earlier than the age at date.";
        return;
      }

      let birthday = this.birthday.value;
      let today = this.today.value;
      // birthday = new Date(Date.UTC(
      //   birthday.getFullYear(),
      //   birthday.getMonth(),
      //   birthday.getDate(),
      //   birthday.getHours(),
      //   birthday.getMinutes(),
      //   birthday.getSeconds()
      // )).toISOString();

      // today = new Date(Date.UTC(
      //   today.getFullYear(),
      //   today.getMonth(),
      //   today.getDate(),
      //   today.getHours(),
      //   today.getMinutes(),
      //   today.getSeconds()
      // )).toISOString();

      this.daysDiff(birthday, today);
      this.monthsDiff(birthday, today);
      this.fullDateDiff(birthday, today);
      this.weeksDiff(birthday, today)
      this.checkForm = true;
      e.scrollIntoView({ behavior: "smooth" });
    } else {
      this.error = "Please check the fields";
      this.checkForm = false;
    }
  }

  yearsDiff(d1: Date, d2: Date) {
    let date1 = new Date(d1);
    let date2 = new Date(d2);
    let yearsDiff = date2.getFullYear() - date1.getFullYear();
    console.log('year', yearsDiff);
    return yearsDiff;
  }
  monthsDiff(d1: Date, d2: Date) {
    let date1 = new Date(d1);
    let date2 = new Date(d2);
    let years = this.yearsDiff(d1, d2);
    let months = (years * 12) + (date2.getMonth() - date1.getMonth());

    let diffDays = this.daysDiff(d1, d2);
    if (date1.getMonth() > date2.getMonth()) {
      years = years - 1;
    }
    // had calcul bach n7aydo sanawat alkabissa Math.floor((29-(2022%4))/4
    // let eleminateSanaKabisa = ((months/12)*365) + Math.floor((29-(2022%4))/4 );
    let eleminateSanaKabisa = ((months / 12) * 365) + Math.floor((years - (date2.getFullYear() % 4)) / 4);
    this.dayF = Math.floor(diffDays - eleminateSanaKabisa);
    if (this.dayF < 0) {
      this.dayF = 0;
    };

    if (date1.getDate() > date2.getDate()) {
      months -= 1;
    }

    this.month = months

    return months;
  }

  daysDiff(d1: Date, d2: Date) {
    let hours = this.hoursDiff(d1, d2);
    let daysDiff = Math.floor(hours / 24);
    this.day = daysDiff.toLocaleString().split(/\s/).join(',');

    return daysDiff;
  }

  hoursDiff(d1: Date, d2: Date) {
    let minutes = this.minutesDiff(d1, d2);
    let hoursDiff = Math.floor(minutes / 60);
    this.hours = hoursDiff.toLocaleString().split(/\s/).join(',');

    return hoursDiff;
  }


  minutesDiff(d1: Date, d2: Date) {
    let seconds = this.secondsDiff(d1, d2);
    let minutesDiff = Math.floor(seconds / 60);
    this.minute = minutesDiff.toLocaleString().split(/\s/).join(',');

    return minutesDiff;
  }

  secondsDiff(d1: any, d2: any) {
    // nrod les times 3la 7sab montasaf lil 
    let millisecondDiff = new Date(d2).setHours(0, 0, 0, 0) - new Date(d1).setHours(0, 0, 0, 0);
    // let secDiff = Math.floor( ( d2 - d1) / 1000 );
    let secDiff = millisecondDiff / 1000;
    this.second = secDiff.toLocaleString().split(/\s/).join(',');

    return secDiff;
  }

  weeksDiff(d1: Date, d2: Date) {
    let days = this.daysDiff(d1, d2);
    this.week = Math.floor(days / 7);
    this.dayW = days - (this.week * 7);
  }

  fullDateDiff(startingDate: any, endingDate: any) {
    var startDate = new Date(new Date(startingDate).toISOString().substr(0, 10));
    if (!endingDate) {
      endingDate = new Date().toISOString().substr(0, 10); // need date in YYYY-MM-DD format
    }
    var endDate = new Date(endingDate);
    if (startDate > endDate) {
      var swap = startDate;
      startDate = endDate;
      endDate = swap;
    }
    var startYear = startDate.getFullYear();
    var february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
    var daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var yearDiff = endDate.getFullYear() - startYear;
    var monthDiff = endDate.getMonth() - startDate.getMonth();
    if (monthDiff < 0) {
      yearDiff--;
      monthDiff += 12;
    }
    var dayDiff = endDate.getDate() - startDate.getDate();
    if (dayDiff < 0) {
      if (monthDiff > 0) {
        monthDiff--;
      } else {
        yearDiff--;
        monthDiff = 11;
      }
      dayDiff += daysInMonth[startDate.getMonth()];
    }
    this.year = yearDiff;
    this.monthF = monthDiff;
    this.dayF = dayDiff;
  }

  //getter 
  // get formBmi() { return this.calculeAge.controls; }
  get birthday() {
    return this.calculeAge.get("birthday") as UntypedFormControl;
  }
  get today() {
    return this.calculeAge.get("today") as UntypedFormControl;
  }
}
