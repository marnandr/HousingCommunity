import { Component, OnInit } from '@angular/core';
import { HousesService } from './services/houses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'housingcommunity';

  constructor(
    private houseService: HousesService
  ){

  }

  ngOnInit(){
      this.houseService.getHouses().subscribe((resp: any) => {
        console.log(resp);
      })
  }

}
