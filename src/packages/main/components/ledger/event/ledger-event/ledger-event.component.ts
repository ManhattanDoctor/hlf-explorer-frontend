import { Component, ElementRef, Input } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ViewUtil } from '@ts-core/frontend-angular';
import { LedgerBlockEvent } from '@hlf-explorer/common/ledger';
import { PipeService } from '../../../../services/PipeService';
import { LedgerBlockEventWrapper } from '../../../../lib/ledger/LedgerBlockEventWrapper';
import * as _ from 'lodash';

@Component({
    selector: 'ledger-event',
    templateUrl: 'ledger-event.component.html'
})
export class LedgerEventComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private _event: LedgerBlockEvent;

    public name: string;
    public date: string;
    public data: string;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef, private pipe: PipeService) {
        super();
        ViewUtil.addClasses(element, 'd-flex flex-grow-1 align-items-center');
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private commitEventProperties(): void {
        let value = null;

        let event = new LedgerBlockEventWrapper(this.event);

        value = this.pipe.momentDate.transform(event.createdDate);
        if (value !== this.date) {
            this.date = value;
        }

        value = event.name;
        if (value !== this.name) {
            this.name = value;
        }

        value = event.eventData;
        if (value !== this.data) {
            this.data = value;
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public get event(): LedgerBlockEvent {
        return this._event;
    }
    @Input()
    public set event(value: LedgerBlockEvent) {
        if (value === this._event) {
            return;
        }
        this._event = value;
        if (this._event) {
            this.commitEventProperties();
        }
    }
}
