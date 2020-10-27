import { Component, OnInit, Input } from '@angular/core';
import {ListService} from '../list.service'
import { ImageviewService } from '../imageview.service'
import { ShareFunctionsService } from '../share-functions.service'
@Component({
  selector: 'app-tabletemplate',
  templateUrl: './tabletemplate.component.html',
  styleUrls: ['./tabletemplate.component.scss']
})
export class TabletemplateComponent implements OnInit {
  @Input() dataSource
  @Input() selection
  @Input() list
  @Input() icons
  @Input() iconValues
  @Input() form
  @Input() displayedColumns
  @Input() template
  imagePreview: string;
  constructor(private listService:ListService,private imageModal: ImageviewService,private shared: ShareFunctionsService) { }
  edited(list) {
    this.listService.updateItem(list).subscribe(res => { this.dataSource.data = this.list })
  }



  openImage(url) {
    this.imageModal.openDialog(url)
  }

  deleteItem(id, imagePath) {
    this.listService.deleteList(id, imagePath).subscribe(res => {
      this.list.splice(this.list.findIndex(v => v.id == id), 1)
      this.dataSource.data = this.list//.filter(v=>v.status == true)
    })
  }


  updateStatus(id, status) {

    let element = this.list.find(v => v.id === id)
    element.status = status
    this.listService.updateItem(element)
      .subscribe(res => {
        this.shared.listSbjectToHistory.next(element)
        this.list.splice(this.list.findIndex(v => v.id == id), 1)
        this.dataSource.data = this.list
      })
  }

  addSingle(item){
    let id = item.id
    let status = item.status
    //let element = this.list.find(v => v.id === id)
    item.status = false//status
    console.log(item)
    this.listService.updateItem(item)
      .subscribe(res => {
        this.shared.SbjectTolist.next(item)
        this.list.splice(this.list.findIndex(v => v.id == id), 1)
        this.dataSource.data = this.list
        //this.dataSourceDone.data = this.list.filter(v=>v.status == true)
      })
  }
  addDish(item){
    let newlist = this.list.filter(v=>v.dish == item.dish)
    newlist.map(v=>this.addSingle(v))
  }
  ngOnInit(): void {
    console.log(this.dataSource)
  }

}
