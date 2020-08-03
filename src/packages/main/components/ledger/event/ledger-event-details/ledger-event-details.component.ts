import { Component, ViewContainerRef, Input } from '@angular/core';
import { ViewUtil, IWindowContent } from '@ts-core/frontend-angular';
import { LedgerBlockEvent } from '@hlf-explorer/common/ledger';
import * as _ from 'lodash';
import { RouterService } from '../../../../services/RouterService';
import { PipeService } from '../../../../services/PipeService';
import { LedgerBlockEventWrapper } from '../../../../lib/ledger/LedgerBlockEventWrapper';

@Component({
    selector: 'ledger-event-details',
    templateUrl: 'ledger-event-details.component.html'
})
export class LedgerEventDetailsComponent extends IWindowContent {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public wrapper: LedgerBlockEventWrapper;

    public eventData: string;
    public initiatorId: string;

    private _event: LedgerBlockEvent;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ViewContainerRef, private pipe: PipeService, public router: RouterService) {
        super(container);
        ViewUtil.addClasses(container.element, 'd-flex flex-column');
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private commitEventProperties(): void {
        let value = null;

        let event = (this.wrapper = new LedgerBlockEventWrapper(this.event));

        value = event.eventData;
        if (value !== this.eventData) {
            this.eventData = value;
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
