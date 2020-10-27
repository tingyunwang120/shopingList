import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select'
import { MatRadioModule } from '@angular/material/radio'
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatNativeDateModule } from '@angular/material/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HistoryComponent } from './history/history.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ImageViewComponent } from './image-view/image-view.component';
import { MatDialogModule } from '@angular/material/dialog'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatMenuModule } from '@angular/material/menu';
import { TabletemplateComponent } from './tabletemplate/tabletemplate.component'
//import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    HistoryComponent,
    ImageViewComponent,
    TabletemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    FontAwesomeModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    MatSortModule,
    MatToolbarModule,
    MatBottomSheetModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatMenuModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
