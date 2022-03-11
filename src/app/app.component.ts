import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {HttpClient} from '@angular/common/http';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'iris';








  displayedColumns: string[] = ['listo', 'todoName', 'category', 'date', 'action'];
  dataSource !: MatTableDataSource<any>

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;






  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    
    ) {}

  
 



ngOnInit(): void {
 this.getTodos(); 
}









  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // if(result === 'save'){
        this.getTodos();
      // }
    });
  }




editTodo(row:any){
  const dialogRef = this.dialog.open(DialogComponent, {
    width: '350px',
    data:row,
  });

  dialogRef.afterClosed().subscribe(result => {
    this.getTodos();
  });
}




  getTodos(){
    this.api.getTodos().subscribe({
      next: (res)=>{
        // console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator; //ViewChild
        this.dataSource.sort = this.sort //ViewChild
        this.isLoadingResults = false;
      },
      error: (err)=>{
        console.log("error")
      }
    })
  }




deleteTodo(id:number){
  this.api.deleteProduct(id).subscribe({
    next: (res)=>{
      alert("Todo eliminado!");
      this.getTodos();
    },
    error: () =>{
      alert("Error al eliminar!")
    }
  })
}


}
