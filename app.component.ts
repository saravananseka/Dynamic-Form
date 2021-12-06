import { Component } from '@angular/core';
import {FormGroup,FormControl,FormBuilder} from '@angular/forms'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
filterForm: FormGroup;
  filterFields: any[];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.filterFields = [
      {
        key: "common",
        title: "main fields",
        group: [
          {
label: "Date of Birth (YYYY-MM-DD)",
key: "birthday",
isRequired: true,
order: 1,
isReadonly: false,
type: "date"
},
{
label: "Gestational Age",
key: "gestationalAge",
isRequired: true,
order: 3,
unit: "weeks",
isReadonly: false,
type: "number"
},
{
label: "Sex",
items: [
{
value: "male",
text: "Male"
},
{
value: "female",
text: "Female"
}
],
key: "sex",
isRequired: true,
order: 4,
isReadonly: false,
type: "dropdown"
},
{
label: "Height",
key: "height",
isRequired: true,
order: 5,
unit: "cm",
isReadonly: false,
type: "number"
},
{
label: "Weight",
key: "weight",
isRequired: true,
order: 6,
unit: "kg",
isReadonly: false,
type: "number"
},
{
label: "BMI",
key: "bmi",
order: 11,
unit: "kg/m²",
isReadonly: true,
type: "number"
}
]
}
];

    this.filterForm = this.generateFilterForm();
  }

  generateFilterForm(): FormGroup {
    const baseForm = this.fb.group({});
    this.filterFields.forEach(field => {
      baseForm.addControl(field.key, this.generateFormGroup(baseForm, field));
    });
    console.log(baseForm);
    return baseForm;
  }

  generateFormGroup(baseForm: FormGroup, field: { group: any[]; }): FormGroup|FormControl {
    if (field.group) {
      const formGroup = this.fb.group({});
      field.group.forEach(item => {
        formGroup.addControl(item.key, this.generateFormGroup(formGroup, item));
      });
      return formGroup;
    }

      return new FormControl("");
  }}
