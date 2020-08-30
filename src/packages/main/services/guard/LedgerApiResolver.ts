import { Resolve } from '@angular/router';
import { LoadableEvent, DestroyableContainer } from '@ts-core/common';
import { PromiseHandler } from '@ts-core/common/promise';
import { Injectable } from '@angular/core';
import { RouterService } from '../RouterService';
import * as _ from 'lodash';
import { LedgerApiMonitor } from '../LedgerApiMonitor';

@Injectable()
export class LedgerApiResolver extends DestroyableContainer implements Resolve<void> {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private router: RouterService, private monitor: LedgerApiMonitor) {
        super();
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public resolve(): Promise<void> {
        if (this.monitor.isLoaded) {
            return Promise.resolve();
        }

        let promise = PromiseHandler.create();
        let subscription = this.monitor.events.subscribe(data => {
            if (data.type === LoadableEvent.COMPLETE) {
                promise.resolve();
            } else if (data.type === LoadableEvent.ERROR) {
                let message = `Unable to connect to socket ${encodeURIComponent(this.monitor.url)}`;
                if (!_.isNil(data.error)) {
                    message += ` ${data.error.message}`;
                }
                this.router.navigate(`${RouterService.MESSAGE_URL}/${message}`);
                promise.reject(data.error.toString());
            } else if (data.type === LoadableEvent.FINISHED) {
                subscription.unsubscribe();
            }
        });
        return promise.promise;
    }
}
