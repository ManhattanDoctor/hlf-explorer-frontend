import { Component, ViewContainerRef } from '@angular/core';
import { ISerializable } from '@ts-core/common';
import { ViewUtil } from '@ts-core/frontend-angular';
import { IWindowContent } from '@ts-core/frontend-angular';
import { ILedgerResetRequest, LedgerApiClient } from '@hlf-explorer/common/api';

@Component({
    templateUrl: 'reset-container.component.html',
})
export class ResetContainerComponent extends IWindowContent implements ISerializable<ILedgerResetRequest> {
    //--------------------------------------------------------------------------
    //
    //  Constants
    //
    //--------------------------------------------------------------------------

    public static EVENT_SUBMITTED = 'EVENT_SUBMITTED';

    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------

    public password: string;

    //--------------------------------------------------------------------------
    //
    //  Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ViewContainerRef, private api: LedgerApiClient) {
        super(container);
        ViewUtil.addClasses(container.element, 'd-block');
    }

    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------

    public serialize(): ILedgerResetRequest {
        return { password: this.password, ledgerName: null};
    }

    public submit(): void {
        this.emit(ResetContainerComponent.EVENT_SUBMITTED);
    }
}
