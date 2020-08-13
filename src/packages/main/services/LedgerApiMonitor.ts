import { ExtendedError } from '@ts-core/common/error';
import { FilterableMapCollection } from '@ts-core/common/map';
import { NotificationService, WindowService } from '@ts-core/frontend-angular';
import { LedgerApi } from '@hlf-explorer/common/api/ledger';
import { LedgerBlock, LedgerInfo } from '@hlf-explorer/common/ledger';
import * as _ from 'lodash';
import { TransformUtil } from '@ts-core/common/util';
import { ILogger } from '@ts-core/common/logger';

export class LedgerApiMonitor extends LedgerApi {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private items: FilterableMapCollection<LedgerInfo>;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(logger: ILogger, private windows: WindowService, private notifications: NotificationService) {
        super(logger);
        this.items = new FilterableMapCollection('id');
    }

    //--------------------------------------------------------------------------
    //
    //  Event Handlers
    //
    //--------------------------------------------------------------------------

    protected ledgersHandler(items: Array<LedgerInfo>): void {
        super.ledgersHandler(items);

        this.items.clear();
        for (let item of items) {
            this.items.add(item);
        }
        
        if (this.items.length > 0) {
            this.settings.defaultLedgerId = this.items.getFirst().id;
        }
    }

    protected ledgerUpdatedHandler(item: Partial<LedgerInfo>): void {
        super.ledgerUpdatedHandler(item);

        let ledger = this.items.get(item.id.toString());
        if (_.isNil(ledger)) {
            return;
        }

        let block = TransformUtil.toClass(LedgerBlock, item.blockLast);

        ledger.blockLast = block;
        ledger.blocksLast.add(block);
        ledger.eventsLast.addItems(block.events);
        ledger.transactionsLast.addItems(block.transactions);
    }

    protected exceptionHandler(error: ExtendedError): void {
        super.exceptionHandler(error);
        this.windows.info(error.message);
    }

    protected socketConnectedHandler(event: any): void {
        super.socketConnectedHandler(event);
        this.notifications.remove(this.socketDisconnectNotificationId);
    }

    protected socketDisconnectedHandler(event: any): void {
        super.socketDisconnectedHandler(event);
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

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get ledger(): LedgerInfo {
        return this.items.collection[0];
    }
}
