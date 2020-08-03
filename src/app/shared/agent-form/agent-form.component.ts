import { Component, OnInit, Output, OnChanges, Input, EventEmitter, SimpleChange } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-agent-form',
  templateUrl: './agent-form.component.html',
  animations: [
    trigger('in', [
      transition('* <=> *', [
        style({
          opacity: 0.5,
          transform: 'scale(0.7)'
        }),
        animate(500, style({
          opacity: 1,
          transform: 'none'
        }))
      ])
    ])
  ]
})
export class AgentFormComponent implements OnInit, OnChanges {
  @Output() formSubmit = new EventEmitter<{}>();

  @Input() formData?: any;
  @Input() isLoading = false;

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

  ngOnChanges(changes: {formData: SimpleChange}): void {
    // if formData property changes, update and fill the form with the new data
    if (this.form && changes?.formData?.currentValue !== changes?.formData?.previousValue) {
      this.form.patchValue({
        ...changes?.formData?.currentValue
      });
    }
  }

  handleSubmit(): void {
    if (this.form.invalid && this.isLoading) {
      return;
    }

    // preparing abilities to be transformed to an array from { abilityQ: Ability, abilityE: Ability...etc }
    // will be [Ability, Ability, ...etc]
    const abilities = Object.keys(this.form.value.abilities).map(key => {
      return {
        ...this.form.value.abilities[key]
      };
    });

    // making copy from the form.value object, and override abilities property
    const data = {
      ...this.form.value,
      abilities
    };

    // emiting data change
    this.formSubmit.emit(data);
  }
}
