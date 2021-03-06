import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import * as _ from 'lodash';
import { LedgerBlockEvent } from '@hlf-explorer/common/ledger';
import { RouterService } from '../RouterService';
import { WindowService } from '@ts-core/frontend-angular';
import { LedgerApi } from '@hlf-explorer/common/api';

@Injectable({ providedIn: 'root' })
export class LedgerBlockEventResolver implements Resolve<LedgerBlockEvent> {
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

    public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<LedgerBlockEvent> {
        let uid = route.params.uid;
        if (_.isEmpty(uid)) {
            let message = `Event uid ${uid} is invalid`;
            this.windows.info(message);
            this.router.navigate(RouterService.DEFAULT_URL);
            return Promise.reject(message);
        }

        try {
            return await this.api.getEvent(uid);
        } catch (error) {
            this.router.navigate(RouterService.DEFAULT_URL);
            return Promise.reject(error.toString());
        }
    }
}
