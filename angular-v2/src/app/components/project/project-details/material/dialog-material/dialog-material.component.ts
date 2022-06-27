import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dialog-material',
  templateUrl: './dialog-material.component.html',
  styleUrls: ['./dialog-material.component.css']
})
export class DialogMaterialComponent implements OnInit {

  formMaterial: FormGroup;
  actionBtn : string = "Save";
  actionTitle : string = "New";
  public idp: any;

  constructor(    
    private formBuilder : FormBuilder, 
    private service : AuthService,
    private dialogRef : MatDialogRef<DialogMaterialComponent>,
    @Inject(MAT_DIALOG_DATA) public editData :any,
  ) { }

  ngOnInit(): void {
    this.idp = localStorage.getItem('idpro');
    this.formMaterial = this.formBuilder.group({
      name : ['', Validators.required],
      prix: ['', Validators.required],
      quantity: ['', Validators.required],
      project: [this.idp, Validators.required],
    });
    //console.log("editData", this.editData);
    if(this.editData){
      this.actionTitle = "Update"
      this.actionBtn = "Update";
      this.formMaterial.controls['name'].setValue(this.editData.name);
      this.formMaterial.controls['prix'].setValue(this.editData.prix);
      this.formMaterial.controls['quantity'].setValue(this.editData.quantity);
    }
  }

  addMaterial(){
    if(!this.editData){
      if(this.formMaterial.valid){
        this.service.postNewMaterial(this.formMaterial.value)
        .subscribe({
          next:(res)=>{
            //console.log(this.formMaterial.value);
            alert('material added successfuly');
            this.formMaterial.reset();
            this.dialogRef.close('save');
            // location.reload();
          },
          error:(err)=>{
            console.log('err', err)
          }
        })
      }
    }
    else(
      this.updateMaterial()
    )
  }

  updateMaterial(){
    this.service.updateMaterial(this.formMaterial.value, this.editData.id)
    .subscribe({
      next:(res) => {       
        alert("material updated successfuly");
        this.formMaterial.reset();
        this.dialogRef.close('update');
      },
      error:(err)=>{
        console.log('err', err);
      }
    })
  }
}
