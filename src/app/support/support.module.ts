import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionModule, ListModule } from 'patternfly-ng';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { SyndesisCommonModule } from '../common/common.module';
import { SupportingComponent } from './support.component';

@NgModule({
  imports: [
    ActionModule,
    CommonModule,
    ListModule,
    SyndesisCommonModule,
    TooltipModule,
  ],
  declarations: [SupportingComponent],
  exports: [SupportingComponent],
})
export class SupportingModule {}
