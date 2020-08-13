import { Component, ElementRef } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ViewUtil } from '@ts-core/frontend-angular';
import { LedgerApiMonitor } from '../../../services/LedgerApiMonitor';
import { LedgerInfo } from '@hlf-explorer/common/ledger';

@Component({
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef, public monitor: LedgerApiMonitor) {
        super();
        ViewUtil.addClasses(element, 'd-block');
    }
}
