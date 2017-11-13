import { ApplicationRef, Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs/Subscription';

import {
  Action,
  ActionConfig,
  ListConfig,
  ListEvent,
  EmptyStateConfig,
  Notification,
  NotificationService,
  NotificationType,
} from 'patternfly-ng';

import { Integrations, Integration } from '../model';
import { IntegrationStore } from '../store/integration/integration.store';
import { ModalService } from '../common/modal/modal.service';
import { log, getCategory } from '../logging';

@Component({
  selector: 'syndesis-supporting-page',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportingComponent {
  constructor(
    public store: IntegrationStore,
    public route: ActivatedRoute,
    public router: Router,
    public notificationService: NotificationService,
    public modalService: ModalService,
    public application: ApplicationRef,
  ) {}

  testPaolo(event) {
    let a = 1;
    a++;
    // linting prevents me to have a dummy block here
  }
}
