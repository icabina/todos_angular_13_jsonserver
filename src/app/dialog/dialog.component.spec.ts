import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef  } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';
import { FormBuilder, FormControl } from '@angular/forms';
import { ReactiveFormsModule, FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import{MatFormFieldModule} from '@angular/material/form-field';
import{MatInputModule} from '@angular/material/input';



@Component({
  selector: 'mat-select',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MatSelectStubComponent,
      multi: true,
    },
  ],
})
class MatSelectStubComponent implements ControlValueAccessor {
  writeValue(obj: any) {}
  registerOnChange(fn: any) {}
  registerOnTouched(fn: any) {}
  setDisabledState(isDisabled: boolean) {}
}



describe('DialogComponent', () => {

  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  // let httpMock: HttpTestingController;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogComponent , MatSelectStubComponent ],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue : {}},
        { provide: MatDialogRef, useValue : {}},
        { provide: FormBuilder}
    ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(DialogComponent);
      component = fixture.componentInstance;
    });
    //  httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);

    component.todoForm = formBuilder.group({
      recipientType: new FormControl(
        {
          value: ['mock'],
          disabled: true
        },
        Validators.required
      )
    });
    fixture.detectChanges();
    // component.ngOnInit();
  });


  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
