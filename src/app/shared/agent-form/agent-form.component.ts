import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-agent-form',
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.scss']
})
export class AgentFormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<{}>();
  @Input() formData?: any;
  @Input() isLoading = false;

  form: FormGroup;

  constructor() { }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl(this.formData?.name, [Validators.required, Validators.maxLength(45)]),
      imgURL: new FormControl(this.formData?.imgURL, [Validators.required, Validators.maxLength(250)]),
      role: new FormControl(this.formData?.role, [Validators.required, Validators.maxLength(45)]),
      biography: new FormControl(this.formData?.biography, [Validators.required, Validators.maxLength(300)]),
      abilities: new FormGroup({
        abilityQ: new FormGroup({
          name: new FormControl(this.formData?.abilities[0]?.name),
          description: new FormControl(this.formData?.abilities[0]?.description),
          image: new FormControl(this.formData?.abilities[0]?.image),
          videoURL: new FormControl(this.formData?.abilities[0]?.videoURL)
        }),
        abilityE: new FormGroup({
          name: new FormControl(this.formData?.abilities[1]?.name),
          description: new FormControl(this.formData?.abilities[1]?.description),
          image: new FormControl(this.formData?.abilities[1]?.image),
          videoURL: new FormControl(this.formData?.abilities[1]?.videoURL)
        }),
        abilityC: new FormGroup({
          name: new FormControl(this.formData?.abilities[2]?.name),
          description: new FormControl(this.formData?.abilities[2]?.description),
          image: new FormControl(this.formData?.abilities[2]?.image),
          videoURL: new FormControl(this.formData?.abilities[2]?.videoURL)
        }),
        abilityX: new FormGroup({
          name: new FormControl(this.formData?.abilities[3]?.name),
          description: new FormControl(this.formData?.abilities[3]?.description),
          image: new FormControl(this.formData?.abilities[3]?.image),
          videoURL: new FormControl(this.formData?.abilities[3]?.videoURL)
        })
      })
    });

  }

  handleSubmit(): void {
    if (this.form.invalid && this.isLoading) {
      return;
    }

    const abilities = Object.keys(this.form.value.abilities).map(key => {
      return {
        ...this.form.value.abilities[key]
      };
    });

    const data = {
      ...this.form.value,
      abilities
    };

    this.formSubmit.emit(data);
  }
}
