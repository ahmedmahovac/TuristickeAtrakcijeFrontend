import { Component, Input } from '@angular/core';
import { Attraction } from '../../interfaces/Attraction';

@Component({
  selector: 'app-attractions-container',
  templateUrl: './attractions-container.component.html',
  styleUrls: ['./attractions-container.component.css']
})
export class AttractionsContainerComponent {
  @Input()
  attractions: Attraction[] = [];
  @Input()
  searchRequestSent: Boolean = false;
}
