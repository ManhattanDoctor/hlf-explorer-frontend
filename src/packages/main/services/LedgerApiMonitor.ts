import { WindowService, NotificationService } from '@ts-core/frontend-angular';
import { LedgerApiSocket, LedgerApi } from '@hlf-explorer/common/api';
import { LedgerInfo } from '@hlf-explorer/common/ledger';
import * as _ from 'lodash';
import { ILogger } from '@ts-core/common/logger';
import { LoadableEvent } from '@ts-core/common';
import { filter, takeUntil } from 'rxjs/operators';

export class LedgerApiMonitor extends LedgerApiSocket {
    // --------------------------------------------------------------------------
    //
    //  Constants
    //
    // --------------------------------------------------------------------------

    public static LEDGER_NAME = 'Karma';

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(logger: ILogger, private api: LedgerApi, private windows: WindowService, private notifications: NotificationService) {
        super(logger, LedgerApiMonitor.LEDGER_NAME);

        this.events
            .pipe(filter(event => event.type === LoadableEvent.COMPLETE))
            .pipe(takeUntil(this.destroyed))
            .subscribe(() => this.notifications.remove(this.socketDisconnectNotificationId));

        this.events
            .pipe(filter(event => event.type === LoadableEvent.ERROR && !this.notifications.has(this.socketDisconnectNotificationId)))
            .pipe(takeUntil(this.destroyed))
            .subscribe(async event => {
                await this.notifications.question('error.socketDisconnected', { error: event.data }, null, {
                    id: this.socketDisconnectNotificationId
                }).yesNotPromise;
                this.connect();
            });
    }

    //--------------------------------------------------------------------------
    //
    //  Event Handlers
    //
    //--------------------------------------------------------------------------

    protected ledgerListReceivedHandler(items: Array<LedgerInfo>): void {
        super.ledgerListReceivedHandler(items);

        if (!_.isNil(this.ledger)) {
            this.api.settings.defaultLedgerId = this.ledger.id;
        } else {
            this.windows.info('error.noLedger', { name: LedgerApiMonitor.LEDGER_NAME });
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Properties
    //
    //--------------------------------------------------------------------------

    private get socketDisconnectNotificationId(): string {
        return `socketDisconnect`;
    }
}
