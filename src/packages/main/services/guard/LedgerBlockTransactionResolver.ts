import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Transport } from '@ts-core/common/transport';
import * as _ from 'lodash';
import { LedgerBlockTransaction } from '@hlf-explorer/common/ledger';
import { RouterService } from '../RouterService';
import { TransportHttpCommandAsync } from '@ts-core/common/transport/http';
import { ILedgerBlockTransactionGetResponse } from '@hlf-explorer/common/api/ledger/transaction';
import { TransformUtil } from '@ts-core/common/util';
import { WindowService } from '@ts-core/frontend-angular';
import { LedgerApi } from '@hlf-explorer/common/api/ledger';

@Injectable({ providedIn: 'root' })
export class LedgerBlockTransactionResolver implements Resolve<LedgerBlockTransaction> {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private api: LedgerApi, private router: RouterService, private windows: WindowService) {}

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<LedgerBlockTransaction> {
        let hash = route.params.hash;
        if (_.isEmpty(hash)) {
            let message = `Transaction hash  ${hash} is invalid`;
            this.windows.info(message);
            this.router.navigate(RouterService.DEFAULT_URL);
            return Promise.reject(message);
        }

        try {
            return await this.api.getTransaction(hash);
        } catch (error) {
            this.router.navigate(RouterService.DEFAULT_URL);
            return Promise.reject(error.toString());
        }
    }
}
