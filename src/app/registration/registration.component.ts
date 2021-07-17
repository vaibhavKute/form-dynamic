import { Component, ModuleWithComponentFactories, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
// import { map } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  array : any[] = [];
  dataSource: any;
  userform!: FormGroup;
  logData: any;
  radioData: any;
  myArr: any[] = [];
  employees: any[] = [];

  constructor(private fb:FormBuilder, private route:Router, private act: ActivatedRoute) { }

  ngOnInit(): void {
    this.userform = this.createControl();
    this.act.queryParamMap.subscribe((params: any) => {
      // console.log(params);
      this.logData = params['params']
    }); 
    console.log(this.logData, 'logData');

    this.userform.patchValue({
      name : this.logData.name,
      email: this.logData.email,
      password: this.logData.password,
      dob: this.logData.dob,
      country: this.logData.country,
      term: this.logData.term,
      gender: this.logData.gender
      // term: this.logData.checked
    })

// const items = (() => {
//   const fieldValue = localStorage.getItem('dataSource');
//   return fieldValue === null
//     ? []
//     : JSON.parse(fieldValue);
// })();

// items.push(this.logData);

// localStorage.setItem('dataSource', JSON.stringify(items));
  }

  regConfig = 
  [ 
    {
      type: 'input',
      label: 'Username',
      inputType: 'text',
      name: 'name',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Name Required',
        },
        {
          name: 'pattern',
          validator: Validators.pattern('^[a-zA-Z]+$'),
          message: 'Accept only text',
        },
      ],
    },
    {
      type: 'input',
      label: 'Email Address',
      inputType: 'email',
      name: 'email',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Email Required',
        },
        {
          name: 'pattern',
          validator: Validators.pattern(
            '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'
          ),
          message: 'Invalid email',
        },
      ],
    },
    {
      type: 'input',
      label: 'Password',
      inputType: 'password',
      name: 'password',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Password Required',
        },
        {
          name: 'pattern',
          validator: Validators.minLength(6),
          message: 'minimum length should be 6 characters',
        },
      ],
    },
    {
      type: 'radio',
      label: 'Gender',
      name: 'gender',
      options: ['Male', 'Female'],
      value: '',
    },
    {
      type: 'date',
      label: 'DOB',
      name: 'dob',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Date of Birth Required',
        },
      ],
    },
    {
      type: 'select',
      label: 'Country',
      name: 'country',
      value: '',
      options: ['India', 'UAE', 'UK', 'US'],
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Country Required',
        },
      ],
    },
    {
      type: 'checkbox',
      label: 'Accept Terms',
      name: 'term',
      // value: this.isChecked
      value: 'true',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: ' Required',
        },
      ],
    },

{
  type: 'formArray',
  name: 'skills',
  label:'Skill Name',
  formArrayoptions:{
    children:[{
      key:'skill',
      type: 'input',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Email Required',
        },
        {
          name: 'pattern',
          validator: Validators.pattern(
            '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'
          ),
          message: 'Invalid email',
        },
      ]
    }]
  }
},

  ];

  onSubmit() {
    if (this.userform.valid) {
      console.log(this.userform.value);

      const items = (() => {
        const fieldValue = localStorage.getItem('dataSource');
        return fieldValue === null
          ? []
          : JSON.parse(fieldValue);
      })();

  items.push(this.userform.value);

  localStorage.setItem('dataSource', JSON.stringify(items));
  this.route.navigate(['/dynamic']);
  
} else {
  this.validateAllFormFields(this.userform);
  return;
}
  }

createControl() {
    const group = this.fb.group({});
    this.regConfig.forEach((field) => {
      if (field.type === 'button') return;
        if(field.type == 'formArray'){
          const newArray = new FormArray([]);
          const oneGroup = new FormGroup({});
          field.formArrayoptions?.children.map((child: any) =>{
            oneGroup.addControl(child.key, new FormControl());
          })
          newArray.push(oneGroup);
          group.addControl(field.name, newArray);
        }
      const control = this.fb.control(
        field.value,
        this.bindValidations(field.validations || [])
      );
      group.addControl(field.name, control);
    });
    return group;
  }

  removeArrayGroup(arrayName: any, index: any){
    const field = this.getFormArray(arrayName);
    field.removeAt(index)
  }

  addArrayGroup(arrayName: any, objectSchemaChildren: any){
    const control = this.getFormArray(arrayName)
    const oneGroup = new FormGroup({});
    objectSchemaChildren.map((child: any) =>{
        oneGroup.addControl(child.key, new FormControl());
      });
      control.push(oneGroup);
  }

  getFormArray(key: any){
    return <FormArray>this.userform.controls[key];
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList: any[] = [];
      validations.forEach((valid: { validator: any; }) => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  saveChanges(){}

  changeCheckboxStatus(ev:any){
    console.log(ev);
    console.log(ev.target.checked);
  }

  isRadioChange(radiobutton: any){
    console.log(radiobutton);
    this.radioData = radiobutton;
    this.userform.patchValue({
      gender : this.radioData
    })
  }

}
