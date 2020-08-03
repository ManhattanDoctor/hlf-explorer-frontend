import { Component, ElementRef } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ViewUtil } from '@ts-core/frontend-angular';
import { ActivatedRoute } from '@angular/router';
import { LedgerBlockEvent } from '@hlf-explorer/common/ledger';

@Component({
    templateUrl: 'event.component.html'
})
export class EventComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef, private route: ActivatedRoute) {
        super();

        ViewUtil.addClasses(element, 'd-block');
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get event(): LedgerBlockEvent {
        return this.route.snapshot.data.event;
    }
}
