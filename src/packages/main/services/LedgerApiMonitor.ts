import { WindowService, NotificationService } from '@ts-core/frontend-angular';
import { LedgerApiSocket, LedgerApi } from '@hlf-explorer/common/api';
import { LedgerInfo } from '@hlf-explorer/common/ledger';
import * as _ from 'lodash';
import { ILogger } from '@ts-core/common/logger';

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

    protected socketConnectedHandler(): void {
        super.socketConnectedHandler();
        this.notifications.remove(this.socketDisconnectNotificationId);
    }

    protected socketDisconnectedHandler(): void {
        super.socketDisconnectedHandler();
        if (!this.notifications.has(this.socketDisconnectNotificationId)) {
            this.notifications
                .question('error.socketDisconnected', null, null, { id: this.socketDisconnectNotificationId })
                .yesNotPromise.then(() => this.connect());
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
