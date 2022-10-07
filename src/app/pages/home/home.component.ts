import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from 'src/app/services/canonical.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  schema!: any;
  constructor(private titleService: Title, private metaService: Meta, private canonical: CanonicalService) { }


  ngOnInit(): void {
    this.titleService.setTitle("Body-calculator - free online tool to calculate fitness, time...");
    this.metaService.addTags([
      { name: 'keywords', content: "bmi calculator, bmi calculator women, body fat percentage calculator, basal metabolic rate calculator, body shape calculator, healthy weight calculator, ideal weight calculator, age calculator, data calculator" },
      { name: 'description', content: "Free online calculators for different types fitness, time and more" },
      { property: 'og:title', content: "Body-calculator - free online tool to calculate fitness, time..." },
      { property: 'og:description', content: "Free online calculators for different types fitness, time and more" },
      { property: "og:url", content: "https://body-calculator.com/" }
    ]);
    this.canonical.createCanonicalLink("https://body-calculator.com");
    //shema
    this.schema = {
      "@context": "http://schema.org",
      "@type": "SoftwareApplication",
      "name": "free online calculators",
      "image": "https://body-calculator.com/assets/images/logo/calculator.svg",
      "url": "https://body-calculator.com",
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

}
