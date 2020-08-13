import { ElementRef } from '@angular/core';
import { Loadable, LoadableStatus } from '@ts-core/common';
import { ViewUtil } from '@ts-core/frontend-angular';
import * as _ from 'lodash';
import { Transport } from '@ts-core/common/transport';
import { TransportHttpCommandAsync } from '@ts-core/common/transport/http';
import { ILedgerSearchResponse, LedgerApi } from '@hlf-explorer/common/api/ledger';
import { RouterService } from '../../services/RouterService';
import { ObjectUtil } from '@ts-core/common/util';
import { LedgerBlockTransaction, LedgerBlock, LedgerBlockEvent } from '../../../../common/ledger';

export class SearchContainerBaseComponent extends Loadable {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public query: string;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef, protected router: RouterService, protected api: LedgerApi) {
        super();
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    public async submit(): Promise<void> {
        if (this.isLoading) {
            return;
        }

        this.status = LoadableStatus.LOADING;
        try {
            let item = await this.api.search(this.query);
            if (item instanceof LedgerBlock) {
                this.router.blockOpen(item);
            } else if (item instanceof LedgerBlockTransaction) {
                this.router.transactionOpen(item);
            } else if (item instanceof LedgerBlockEvent) {
                this.router.eventOpen(item);
            }
        } finally {
            this.status = LoadableStatus.NOT_LOADED;
        }
    }
}
