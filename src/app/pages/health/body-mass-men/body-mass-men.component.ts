import { CanonicalService } from 'src/app/services/canonical.service';
import { Meta, Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-body-mass-men',
  templateUrl: './body-mass-men.component.html',
  styleUrls: ['./body-mass-men.component.scss']
})
export class BodyMassMenComponent implements OnInit {
  //href: string = "";
  schema!: any;
  envirement: boolean = environment.production;

  constructor(private titleService: Title, private metaService: Meta, private CanonicalService: CanonicalService) { }
  ngOnInit(): void {
    //this.href = this.router.url;
    this.titleService.setTitle("Body-calculator - free online body mass index BMI calculator men");
    this.metaService.addTags([
      { name: 'keywords', content: "bmi calculator, bmi calculator men, bmi calculator by age, children's bmi calculator, cdc bmi calculator, bmi calculator for women, bmi calculator children, bmi calculator women age, bmi calculator kg, child bmi calculator, bmi chart calculator, bmi calculator kids, bmi calculator for men, womens bmi calculator, bmi calculator adults, bmi calculator male male bmi calculator" },
      { name: 'description', content: "Free tool that allows you to use body mass index BMI calculator men (bmi calculator for men)" },
      { property: 'og:title', content: "Body-calculator - free online body mass index BMI calculator men" },
      { property: 'og:description', content: "Free tool that allows you to use body mass index BMI calculator men (bmi calculator for men)" },
      { property: "og:url", content: "https://body-calculator.com/health/bmi-calculator-men/" }
    ]);
    this.CanonicalService.createCanonicalLink("https://body-calculator.com/health/bmi-calculator-men/");
    //shema
    this.schema = {
      "@context": "http://schema.org",
      "@type": "SoftwareApplication",
      "name": "Body mass index bmi calculator men",
      "image": "https://body-calculator.com/assets/images/logo/calculator.svg",
      "url": "https://body-calculator.com/health/bmi-calculator-men/",
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
}
