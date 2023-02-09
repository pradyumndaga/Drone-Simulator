import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss'],
})
export class UserInputComponent implements OnInit {
  fileContent: string = '';
  @Output() data = new EventEmitter<
    { time: number; lat: number; lng: number }[]
  >();

  inputForm!: FormGroup;
  @Input() hideInputs: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.inputForm = this.formBuilder.group({
      markers: this.formBuilder.array([]),
    });

    this.addLatLngFormItem();
    this.addLatLngFormItem();
  }

  onFileUpload(fileList: any): void {
    // Read input file and call fetchData with required json data.
    fileList = fileList?.target?.files;
    let file = fileList[0];
    let self = this;
    let fileReader: FileReader = new FileReader();
    fileReader.onloadend = (x) => {
      self.fileContent = fileReader.result as string;
      const rows = JSON.parse(self.fileContent);
      self.hideInputs = true;
      self.fetchData(rows);
    };
    fileReader.readAsText(file);
  }

  /**
   * @returns void
   * @param rows
   * @description Transform the inputed data from user and emit the data to App Component
   */
  fetchData(rows: any[]): void {
    let rowData: { time: number; lat: number; lng: number }[] = [];
    console.log(rows);
    rows.forEach((row) => {
      rowData.push({ time: row.time, lat: row.x_lat, lng: row.y_long });
    });
    this.data.emit(rowData);
  }

  /**
   *
   * @returns FormArray
   * @description Get Markers FormArray
   */
  markers(): FormArray {
    return <FormArray>this.inputForm.get('markers');
  }

  /**
   *
   * @returns FormGroup
   * @description Return new Dynamic FormGroup
   */
  newLatLngFormItem(): FormGroup {
    return this.formBuilder.group({
      time: new FormControl(null, Validators.required),
      x_lat: new FormControl(null, Validators.required),
      y_long: new FormControl(null, Validators.required),
    });
  }

  /**
   * @returns void
   * @description Add new Dynamic FormGroup
   */
  addLatLngFormItem(): void {
    this.markers().push(this.newLatLngFormItem());
  }

  /**
   * @returns void
   * @param i number
   * @description Remove Dynamic created FormGroup
   */
  removeLatLngFormItem(i: number): void {
    this.markers().removeAt(i);
  }

  /**
   * @returns void
   * @description If input is valid, call fetchData and hide input fields from UI
   */
  submit(): void {
    if (this.inputForm.valid) {
      this.fetchData(this.inputForm.value.markers);
      this.hideInputs = true;
    }
  }
}
