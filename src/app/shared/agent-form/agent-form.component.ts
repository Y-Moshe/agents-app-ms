import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-agent-form',
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.scss']
})
export class AgentFormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<{}>();
  @Input() data?: any;

  form: FormGroup;

  constructor() { }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(45)]),
      imgURL: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      role: new FormControl(null, [Validators.required, Validators.maxLength(45)]),
      biography: new FormControl(null, [Validators.required, Validators.maxLength(300)]),
      abilities: new FormGroup({
        abilityQ: new FormGroup({
          name: new FormControl(null),
          description: new FormControl(null),
          image: new FormControl(null),
          videoURL: new FormControl(null)
        }),
        abilityE: new FormGroup({
          name: new FormControl(null),
          description: new FormControl(null),
          image: new FormControl(null),
          videoURL: new FormControl(null)
        }),
        abilityC: new FormGroup({
          name: new FormControl(null),
          description: new FormControl(null),
          image: new FormControl(null),
          videoURL: new FormControl(null)
        }),
        abilityX: new FormGroup({
          name: new FormControl(null),
          description: new FormControl(null),
          image: new FormControl(null),
          videoURL: new FormControl(null)
        })
      })
    });

  }

  handleSubmit(): void {
    if (this.form.invalid) {
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
