import { Component, ElementRef, Input } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ViewUtil } from '@ts-core/frontend-angular';
import { RouterService } from '../../../../services/RouterService';
import { LedgerBlockEventMapCollection } from '../../../../lib/ledger/LedgerBlockEventMapCollection';

@Component({
    selector: 'ledger-events',
    templateUrl: 'ledger-events.component.html'
})
export class LedgerEventsComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @Input()
    public events: LedgerBlockEventMapCollection;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef, public router: RouterService) {
        super();
        ViewUtil.addClasses(element, 'd-block');
    }
}
