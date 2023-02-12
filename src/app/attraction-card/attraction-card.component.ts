import { Component, Input } from '@angular/core';
import { Attraction } from '../../interfaces/Attraction';

@Component({
  selector: 'app-attraction-card',
  templateUrl: './attraction-card.component.html',
  styleUrls: ['./attraction-card.component.css']
})
export class AttractionCardComponent {
  @Input()
  attraction: Attraction = {name: "", description: "", lat: 0.0, lon: 0.0, ratingSum: 0, ratingsCount: 0, municipalityName: "", countryName: ""};
  
}
