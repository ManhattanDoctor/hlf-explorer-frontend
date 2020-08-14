import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import * as _ from 'lodash';
import { LedgerBlock } from '@hlf-explorer/common/ledger';
import { RouterService } from '../RouterService';
import { WindowService } from '@ts-core/frontend-angular';
import { LedgerApi } from '@hlf-explorer/common/api';

@Injectable({ providedIn: 'root' })
export class LedgerBlockResolver implements Resolve<LedgerBlock> {
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

    public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<LedgerBlock> {
        let hashOrNumber = route.params.hashOrNumber;
        if (_.isNil(hashOrNumber)) {
            let message = `Block number or hash ${hashOrNumber} is invalid`;
            this.windows.info(message);
            this.router.navigate(RouterService.DEFAULT_URL);
            return Promise.reject(message);
        }

        try {
            return await this.api.getBlock(hashOrNumber);
        } catch (error) {
            this.router.navigate(RouterService.DEFAULT_URL);
            return Promise.reject(error.toString());
        }
    }
}
