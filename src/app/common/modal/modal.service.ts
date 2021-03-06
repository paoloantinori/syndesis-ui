import { Injectable, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Modal } from './modal';

@Injectable()
export class ModalService {

  private registeredModals = new Map<string, Modal>();

  constructor(private bsModalService: BsModalService) {}

  registerModal(id: string, template: TemplateRef<any>): void {
    this.registeredModals.set(id, {template: template});
  }

  unregisterModal(id: string): void {
    this.registeredModals.delete(id);
  }

  show(id: string = 'modal'): Promise<Modal> {
    const modal = this.registeredModals.get(id);
    modal.bsModalRef = this.bsModalService.show(modal.template);
    return this.bsModalService.onHide.take(1)
      .toPromise()
      .then(_ => modal);
  }

  hide(id: string, result: boolean): void {
    const modal = this.registeredModals.get(id);
    modal.result = result;
    modal.bsModalRef.hide();
  }
}
