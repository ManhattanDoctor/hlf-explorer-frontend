import { Component, ElementRef } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ViewUtil } from '@ts-core/frontend-angular';
import { LedgerService } from '../../../services/LedgerService';
import { LedgerBlockEventMapCollection } from '../../../lib/ledger/LedgerBlockEventMapCollection';

@Component({
    templateUrl: 'events.component.html'
})
export class EventsComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef, public service: LedgerService) {
        super();
        ViewUtil.addClasses(element, 'd-block');

        if (!this.items.isDirty) {
            this.items.reload();
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get items(): LedgerBlockEventMapCollection {
        return this.service.events;
    }
}
