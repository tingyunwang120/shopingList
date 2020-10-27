import { Injectable } from '@angular/core';
import { faSeedling, faDrumstickBite, faToiletPaper, faHome, faCookie } from '@fortawesome/free-solid-svg-icons';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShareFunctionsService {
  public icon = {veg:faSeedling, meat:faDrumstickBite, toilet:faToiletPaper, home:faHome, other:faCookie}
  
  listSbjectToHistory = new Subject<any>();
  SbjectTolist = new Subject<any>();
  constructor() { }

  strikeThrough(status): Object {
    if (status)
      return {'color': 'lightgrey'}
  }

  
}
