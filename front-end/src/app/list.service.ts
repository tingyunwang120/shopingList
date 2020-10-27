import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject } from "rxjs";
import { List } from './model'
import { stringify } from 'querystring';
@Injectable({
  providedIn: 'root'
})
export class ListService {
  //url = '/api'//'ec2-3-129-70-95.us-east-2.compute.amazonaws.com:4000'//config.apiUrl
  url = 'http://localhost:4000'
  constructor(private http: HttpClient) { }

  addList(input: any) {
    console.log(this.url + "/api/lists")
    const listData = new FormData()
    listData.append('name', input.name)
    listData.append('type', input.type)
    listData.append('status', JSON.stringify(input.status))
    listData.append('image', input.image)
    listData.append('id', JSON.stringify(input.id))
    listData.append('dish', input.dish)
    return this.http
      .post<{ message: string, imagePath: string, listId: string }>(this.url + "/api/lists", listData)

  }
  editList(input: List) {
    this.http
      .post<{ message: string, ListId: string }>(this.url + "/api/lists", input)
      .subscribe(responseData => {
      });
  }
  getList() {
    return this.http
      .get<{ message: string, list: Array<List> }>(this.url + "/api/lists")
  }


  deleteList(id, imagePath) {
    console.log('imagePath', imagePath)
    return this.http
      .post<{ message: string }>(this.url + "/api/lists/delete", { id: id, imagePath: imagePath })
  }
  deleteDish(lists) { 
    console.log('deleteDishserver',lists)
    return this.http
    .post<{ message: string }>(this.url + "/api/lists/deleteMany",  lists )

  }


  updateItem(list) {
    return this.http
      .put(this.url + "/api/lists", list)
  }
  updateGroup(listArr) {
    console.log('updateGroup(,', listArr)
    return this.http
      .put(this.url + "/api/lists/group", listArr)
  }
}
