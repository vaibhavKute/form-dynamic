import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import SimpleJSon from '../../assets/simple_form.json';
import AdvancedJSon from '../../assets/advanced_form.json';
import MainJSon from '../../assets/main_form.json';


export interface Options {
  label?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  children?: Array<FormControlObject>;
}

export interface FormControlObject {
  key: string;
  type: string;
  options: Options;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  myForm!: FormGroup;
  simpleForm = SimpleJSon;
  advancedForm = AdvancedJSon;
  mainForm = MainJSon

  constructor(private fb: FormBuilder) { 
    console.log('simpleForm',this.simpleForm);
    console.log('advancedForm',this.advancedForm);
    console.log('mainForm',this.mainForm)
    this.myForm = this.fb.group({})
    // this.createControls(this.advancedForm);
    this.createControls(this.mainForm);
  }

  ngOnInit(): void {
  }

  // createControls(controls: Array<FormControlObject>){
  //  for(let control of controls){
  //    if(control.type == 'group'){
  //     const newGroup = new FormGroup({});
  //     console.log('newGroup',newGroup)
  //     control.options.children?.map(child =>{
  //       console.log('child', child)
  //       const newControl = new FormControl();
  //       newGroup.addControl(child.key,newControl)
  //     });
  //     this.myForm.addControl(control.key, newGroup);

  //    } else if(control.type == 'array'){
  //       const newArray = new FormArray([]);

  //       const oneGroup = new FormGroup({});
  //       control.options.children?.map(child=>{
  //         oneGroup.addControl(child.key, new FormControl());
  //       });
  //       newArray.push(oneGroup);
  //       this.myForm.addControl(control.key, newArray);
  //    }
  //  }
  // }

  createControls(controls){
    for(let control of controls){
      console.log('control',control)
      if(control.type == "formArray"){
        const newArray = new FormArray([]);
        const oneGroup = new FormGroup({});
        console.log('newArray',newArray)
        console.log('oneGroup',oneGroup)
        if(control.formArrayoptions){
          control.formArrayoptions.children.map(child=>{
            console.log('child',child)
            oneGroup.addControl(child.key,new FormControl());
            console.log(oneGroup.addControl(child.key,new FormControl()))
          });
          newArray.push(oneGroup);
          this.myForm.addControl(control.key, newArray);
          console.log(newArray.push(oneGroup))
        }
      }
    }
  }

  getFormArray(key:any){
    return <FormArray>this.myForm.controls[key];
  }

  removeArrayGroup(arrayName:any,index:any){
    const control = this.getFormArray(arrayName);
    control.removeAt(index)
  }

  addArrayGroup(arrayName, objectSchemaChildren){
    const control = this.getFormArray(arrayName);
    const oneGroup = new FormGroup({});
    objectSchemaChildren.map(child=>{
      oneGroup.addControl(child.key, new FormControl());
    });
    control.push(oneGroup)
  }

  submitForm(){
    console.log(JSON.stringify(this.myForm.value));
    alert(JSON.stringify(this.myForm.value))
  }

}
