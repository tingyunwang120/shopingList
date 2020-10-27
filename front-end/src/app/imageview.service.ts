import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageViewComponent } from './image-view/image-view.component'

@Injectable({
  providedIn: 'root'
})
export class ImageviewService {

  constructor(public dialog: MatDialog) { }

  openDialog(url) {
    const dialogRef = this.dialog.open(ImageViewComponent,
      {
        width: '100%',
        data: {imagePath:url}
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
