import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Transport } from '@ts-core/common/transport';
import * as _ from 'lodash';
import { LedgerBlockEvent } from '@hlf-explorer/common/ledger';
import { RouterService } from '../RouterService';
import { TransportHttpCommandAsync } from '@ts-core/common/transport/http';
import { ILedgerBlockTransactionGetResponse } from '@hlf-explorer/common/api/ledger/transaction';
import { TransformUtil } from '@ts-core/common/util';
import { WindowService } from '@ts-core/frontend-angular';

@Injectable({ providedIn: 'root' })
export class LedgerBlockEventResolver implements Resolve<LedgerBlockEvent> {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private transport: Transport, private router: RouterService, private windows: WindowService) {}

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<LedgerBlockEvent> {
        let uid = route.params.uid;
        if (_.isEmpty(uid)) {
            let message = `Event uid ${uid} is invalid`;
            this.windows.info(message);
            this.router.navigate(RouterService.DEFAULT_URL);
            return Promise.reject(message);
        }

        try {
            let item = await this.transport.sendListen(
                new TransportHttpCommandAsync<ILedgerBlockTransactionGetResponse>('ledger/event', { data: { uid } })
            );
            return TransformUtil.toClass(LedgerBlockEvent, item.value);
        } catch (error) {
            this.router.navigate(RouterService.DEFAULT_URL);
            return Promise.reject(error.toString());
        }
    }
}
