import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service'
import { MatTableDataSource } from '@angular/material/table';
import { ShareFunctionsService } from '../share-functions.service'
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ImageviewService } from '../imageview.service'

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  dataSourceDone
  list: any[] = []
  
  displayedColumnsDone: string[] = ['name', 'type', 'img','dish', 'option']
  faSeedling = this.shared.icon.veg
  faDrumstickBite = this.shared.icon.meat
  faToiletPaper = this.shared.icon.toilet
  faHome = this.shared.icon.home
  faOther = this.shared.icon.other
  icons = [this.faDrumstickBite,this.faSeedling,this.faToiletPaper,this.faHome,this.faOther]
  iconValues = ['meat','veg','toilet','home','other']
  constructor(
    public listService: ListService,
    private shared: ShareFunctionsService,
    private _bottomSheetRef: MatBottomSheetRef<HistoryComponent>,
    private imageModal: ImageviewService) { }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }


  
  ngOnInit(): void {
    this.listService.getList().subscribe(responseData => {
      console.log(responseData.list)
      this.list = responseData.list.filter(v => v.status == true)
      this.dataSourceDone = new MatTableDataSource(this.list);
    })
    this.shared.listSbjectToHistory.subscribe(next => {
      this.list.push(next)
      console.log(this.list)
      this.dataSourceDone.data = this.list//.filter(v=>v.status == true)
    })

  }

}
