import { Component, Input } from '@angular/core';
import { Country } from 'src/interfaces/Country';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent {
  @Input()
  country: Country = {id: -1, name: ""};
}
