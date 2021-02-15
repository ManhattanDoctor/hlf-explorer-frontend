import { ElementRef } from '@angular/core';
import { Loadable, LoadableStatus } from '@ts-core/common';
import * as _ from 'lodash';
import { LedgerApiClient } from '@hlf-explorer/common/api';
import { RouterService } from '../../services/RouterService';
import { LedgerBlockTransaction, LedgerBlock, LedgerBlockEvent } from '@hlf-explorer/common/ledger';

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

    constructor(protected router: RouterService, protected api: LedgerApiClient) {
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
