import { Component, OnInit, Output, OnChanges, Input, EventEmitter, SimpleChange } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

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
  /**
   * Will omit whenever the submit button clicked.
   * With a form data object, transformed and rdy to be sent.
   */
  @Output() formSubmit = new EventEmitter<any>();

  /**
   * (optional) the form data.
   * the object must be identical to the form.value object.
   */
  @Input() formData?: any;
  /**
   * Used to disable/enable the form buttons.
   */
  @Input() isLoading = false;

  form: FormGroup;

  constructor() { }

  ngOnInit(): void {

    // initialazing the form with all null value
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
    // To [IAbility, IAbility, ...etc]
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

    this.formSubmit.emit(data);
  }
}
