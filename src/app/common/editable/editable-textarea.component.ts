import { Component, ChangeDetectorRef } from '@angular/core';
import { EditableComponent } from './editable.component';

@Component({
  selector: 'syndesis-editable-textarea',
  template: `
    <ng-container *ngIf="!editing">
      <em class="text-muted" *ngIf="!value">
        {{ placeholder }}
      </em>
      <ng-container *ngIf="value">
        {{ value }}
      </ng-container>
      <button type="button" class="btn btn-link" (click)="editing = true">
        <i class="fa fa-pencil" aria-hidden="true" title="Click to edit"></i>
      </button>
    </ng-container>
    <ng-container *ngIf="editing">
      <div class="form-group" [ngClass]="{'has-error': errorMessage}">
        <textarea #textareaInput class="form-control" [ngModel]="value"></textarea>
        <span class="help-block" *ngIf="errorMessage">{{errorMessage}}</span>
      </div>
      <button type="button" class="btn btn-primary" (click)="submit(textareaInput.value.trim())">Save</button>
      <button type="button" class="btn btn-default" (click)="cancel()">Cancel</button>
    </ng-container>
  `,
})
export class EditableTextareaComponent extends EditableComponent {

  constructor(detector: ChangeDetectorRef) {
    super(detector);
  }

}
