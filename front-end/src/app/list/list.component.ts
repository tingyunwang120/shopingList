import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ListService } from '../list.service'
import { mimeType } from "./mime-type.validator";
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ShareFunctionsService } from '../share-functions.service'
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { HistoryComponent } from '../history/history.component'
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ImageviewService } from '../imageview.service'
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit, AfterViewInit {

  faSeedling = this.shared.icon.veg
  faDrumstickBite = this.shared.icon.meat
  faToiletPaper = this.shared.icon.toilet
  faHome = this.shared.icon.home
  faOther = this.shared.icon.other
  faHu
  type
  dataSource
  form: FormGroup;
  imagePreview: string;
  list: any[] = []
  groupName = ''
  groups = []
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort;

  icons = [this.faDrumstickBite, this.faSeedling, this.faToiletPaper, this.faHome, this.faOther]
  iconValues = ['meat', 'veg', 'toilet', 'home', 'other']
  displayedColumns: string[] = ['select', 'name', 'type', 'img', 'dish', 'option']
  selection = new SelectionModel<any>(true, []);
  constructor(
    public listService: ListService,
    private shared: ShareFunctionsService,
    private _bottomSheet: MatBottomSheet,
    private imageModal: ImageviewService
  ) { }

  openBottomSheet(): void {
    this._bottomSheet.open(HistoryComponent, {
      panelClass: 'custom-width'
    });
  }
  orderData(id: string, start?: 'asc' | 'desc') {
    const matSort = this.dataSource.sort;
    matSort.sort({ id });
    this.dataSource.sort = this.sort;
  }

  groupData() {

    let elements = this.selection.selected.map(v => { v.dish = this.groupName; return v })
    this.listService.updateGroup(elements)
      .subscribe(res => {
        this.groups.push(this.groupName)
        this.groupName = null
      })
  }

  iconClass(str) {
    return str
  }
  add() {
    console.log('add function')
    let obj = {
      id: null, name: this.form.value.name,
      status: false,
      type: this.form.value.type,
      image: this.form.value.image,
      dish: this.form.value.dish
    }

    this.listService.addList(obj).subscribe(responseData => {
      if (responseData.message == "Post added successfully") {
        let newList = Object.assign({}, obj, { id: responseData.listId, imagePath:responseData.imagePath })

        this.list.push(newList)
        this.form.patchValue({ image: null });
        this.dataSource.data = this.list
        console.log(this.dataSource.data)
      }
    });

    this.form.patchValue({ name: null });
  }

  onImagePicked(event: Event) {
    console.log('onimage')
    const file = (event.target as HTMLInputElement).files[0];

    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;

    };
    reader.readAsDataURL(file);
  } 


  deleteDish(dish) {
    let deleted = this.list.filter(v => v.dish == dish)
    let newlist = this.list.filter(v => v.dish != dish)
    this.listService.deleteDish(deleted).subscribe(
      res => {
        console.log(res)
        this.groups.splice(this.groups.indexOf(dish),1)
        this.list = newlist
        this.dataSource.data = this.list
      }
    )

  }

  ngOnInit(): void {

    this.listService.getList().subscribe(responseData => {
      console.log(responseData.list)
      this.list = responseData.list.filter(v => v.status == false)
      this.dataSource = new MatTableDataSource(this.list);
      this.dataSource.sort = this.sort
      console.log(this.list)
      this.groups = this.list.map(v=>v.dish)
      this.groups = this.groups.filter((item, pos) => this.groups.indexOf(item) == pos)
      this.groups = this.groups.filter(v=>v!='null')
      console.log(this.groups)
    })


    this.shared.SbjectTolist.subscribe(next => {
      this.list.push(next)
      this.dataSource.data = this.list//.filter(v=>v.status == false)
    })

    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      type: new FormControl(null, { validators: [Validators.required] }),
      dish: new FormControl(null, {}),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
  }
  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }
}
