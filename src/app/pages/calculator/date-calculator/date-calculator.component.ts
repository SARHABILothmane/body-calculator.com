import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from 'src/app/services/canonical.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-date-calculator',
  templateUrl: './date-calculator.component.html',
  styleUrls: ['./date-calculator.component.scss']
})
export class DateCalculatorComponent implements OnInit {

  calculeDate!: UntypedFormGroup;
  AddOrSubtractDate!: UntypedFormGroup;
  rslt!: number;
  month!: number;
  monthF!: number;
  year!: number;
  week!: number;
  weekF!: number;
  day!: number | string;
  dayF!: number;
  dayW!: number;
  addOrSubYear!: number;
  addOrSubMonth!: number;
  addOrSubWeek!: number;
  addOrSubDay!: number;
  rsltAddOrSubYear!: number;
  rsltAddOrSubMonth!: number;
  rsltAddOrSubWeek!: number;
  rsltAddOrSubDay!: number;
  calDayBr!: number;
  calDayTo!: number;
  rsltCalDayTo!: number;
  hours!: number | string;
  minute!: number | string;
  second!: number | string;
  date = new Date();
  checkForm: boolean = false;
  public age!: number;
  checked: string = "";
  submitted = false;
  schema!: any;
  showResultAddOrSubtract: boolean = false;
  selectedDate: Date | undefined;
  resultAddOrSubtract: Date | undefined;
  addOrSubtractSymbole: string = "+";
  errorAddOrSubDate: string = "";
  error: string = "";
  maxDate: Date = new Date('2022-05-02T02:57:14');
  minDate: Date = new Date();
  // filter: any;
  filterDate = new Date();
  filterDateResult = (filterDate: any) => filterDate.setHours(0, 0, 0, 0) == this.resultAddOrSubtract?.setHours(0, 0, 0, 0);
  filterSelectedDate = (filterDate: any) => filterDate.setHours(0, 0, 0, 0) == this.selectedDate?.setHours(0, 0, 0, 0);
  envirement: boolean = environment.production;

  constructor(private titleService: Title, private metaService: Meta, private canonical: CanonicalService) {
    this.calculeDate = new UntypedFormGroup({
      startDate: new UntypedFormControl("", [Validators.required]),
      dateEnd: new UntypedFormControl("", [Validators.required]),
    });
    this.AddOrSubtractDate = new UntypedFormGroup({
      addSubDate: new UntypedFormControl("", [Validators.required]),
      years: new UntypedFormControl(0, [Validators.required]),
      months: new UntypedFormControl(0, [Validators.required]),
      weeks: new UntypedFormControl(0, [Validators.required]),
      days: new UntypedFormControl(0, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle("Free online date calculator - body-calculator");
    this.metaService.addTags([
      { name: 'keywords', content: "date calculator, days calculator, days between dates, time and date calculator" },
      { name: 'description', content: "Free online date calculator (days calculator, days between dates, time and date calculator)" },
      { property: 'og:title', content: "Free online date calculator - body-calculator" },
      { property: 'og:description', content: "Free online date calculator (days calculator, days between dates, time and date calculator)" },
      { property: "og:url", content: "https://body-calculator.com/calculators/date-calculator/" }
    ]);
    this.canonical.createCanonicalLink("https://body-calculator.com/calculators/date-calculator/");
    //shema
    this.schema = {
      "@context": "http://schema.org",
      "@type": "SoftwareApplication",
      "name": "Age calculator",
      "image": "https://body-calculator.com/assets/images/logo/calculator.svg",
      "url": "https://body-calculator.com/calculators/date-calculator/",
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

  get formDate() { return this.calculeDate.controls; }

  CalculateDate(e: HTMLElement) {
    this.submitted = true;
    if (this.calculeDate.valid) {
      this.error = "";
      let dateEnd = this.calculeDate.value.dateEnd;
      let dateStart = this.calculeDate.value.startDate;
      dateStart = new Date(Date.UTC(
        dateStart.getFullYear(),
        dateStart.getMonth(),
        dateStart.getDate(),
        dateStart.getHours(),
        dateStart.getMinutes(),
        dateStart.getSeconds()
      )).toISOString();

      dateEnd = new Date(Date.UTC(
        dateEnd.getFullYear(),
        dateEnd.getMonth(),
        dateEnd.getDate(),
        dateEnd.getHours(),
        dateEnd.getMinutes(),
        dateEnd.getSeconds()
      )).toISOString();


      if (dateStart > dateEnd) {
        this.error = "The start date needs to be earlier than the end date";
        return;
      }
      this.daysDiff(dateStart, dateEnd);
      this.monthsDiff(dateStart, dateEnd);
      this.fullDateDiff(dateStart, dateEnd);
      this.weeksDiff(dateStart, dateEnd)
      this.checkForm = true;
      e.scrollIntoView({ behavior: "smooth" });
    } else {
      this.checkForm = false;
      this.error = "Please check the fileds";
    }
  }



  yearsDiff(d1: Date, d2: Date) {
    let date1 = new Date(d1);
    let date2 = new Date(d2);
    let yearsDiff = date2.getFullYear() - date1.getFullYear();
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

  AddOrSubDate(e: HTMLElement) {
    this.errorAddOrSubDate = "";
    if (!this.AddOrSubtractDate.value.addSubDate) {
      this.errorAddOrSubDate = "Please select a start date";
      return;
    }
    let addOrSubtract = new Date(this.AddOrSubtractDate.value.addSubDate.toISOString());
    this.selectedDate = new Date(this.AddOrSubtractDate.value.addSubDate.toISOString());

    if (this.addOrSubtractSymbole == "+") {
      addOrSubtract.setFullYear(addOrSubtract.getFullYear() + this.AddOrSubtractDate.value.years);
      addOrSubtract.setMonth(addOrSubtract.getMonth() + this.AddOrSubtractDate.value.months);
      addOrSubtract.setDate(addOrSubtract.getDate() + this.AddOrSubtractDate.value.days);
      addOrSubtract.setDate(addOrSubtract.getDate() + (this.AddOrSubtractDate.value.weeks * 7));
    } else {
      addOrSubtract.setFullYear(addOrSubtract.getFullYear() - this.AddOrSubtractDate.value.years);
      addOrSubtract.setMonth(addOrSubtract.getMonth() - this.AddOrSubtractDate.value.months);
      addOrSubtract.setDate(addOrSubtract.getDate() - this.AddOrSubtractDate.value.days);
      addOrSubtract.setDate(addOrSubtract.getDate() - (this.AddOrSubtractDate.value.weeks * 7));

    }
    this.resultAddOrSubtract = addOrSubtract;
    this.showResultAddOrSubtract = true;
    e.scrollIntoView({ behavior: "smooth" });
  }


  changeSymbole(symbole: any) {
    this.addOrSubtractSymbole = symbole;
  }


}
