import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-tab',
  templateUrl: './dashboard-tab.component.html',
  styleUrls: ['./dashboard-tab.component.css']
})
export class DashboardTabComponent {

  constructor(private route: ActivatedRoute){
  }

  @Input()
  selectedTab: Number = 0;


  handleClick(){
    console.log(this.route.url);
  }

  

  



}
