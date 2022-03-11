import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  todoForm !: FormGroup;
  actionBtn: string = "Save";

  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any, //info para editar con Material
    private formBuilder: FormBuilder, 
    private api: ApiService,
    public dialogRef: MatDialogRef<DialogComponent>,
    ) { }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      todoName: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      listo: [''],
    });

    // console.log(this.editData);

    //if data: patch values
    if(this.editData){
      this.actionBtn = "Update";
      this.todoForm.controls['todoName'].setValue(this.editData.todoName);
      this.todoForm.controls['category'].setValue(this.editData.category);
      this.todoForm.controls['date'].setValue(this.editData.date);
      this.todoForm.controls['listo'].setValue(this.editData.listo);
    }
  }
  // closeDialogAdd() {
    
  // }
  addTodo(){
    if(!this.editData){
    // console.log(this.todoForm.value)
        if(this.todoForm.valid){
          this.api.postTodo(this.todoForm.value).subscribe({
            next: (res) =>{ 
              // alert("Todo agregado con exito!");
              this.todoForm.reset();
              // this.closeDialogAdd();
              this.dialogRef.close('save');
            },
            error: () =>{
              alert("Error agregando todo");
            }
          });
        }
    }else{
      this.updateTodo();
    }
  }



updateTodo(){
  this.api.putProduct(this.todoForm.value, this.editData.id).subscribe({
    next: (res)=>{
     // alert("Todo updated!");
      this.todoForm.reset();
      this.dialogRef.close('update');
    },
    error: ()=>{
      alert("Error updating!")
    }
  })
}


}
