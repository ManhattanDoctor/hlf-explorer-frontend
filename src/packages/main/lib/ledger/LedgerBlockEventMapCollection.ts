import { PaginableDataSourceMapCollection } from '@ts-core/common/map/dataSource';
import { LedgerBlock, LedgerBlockEvent } from '@hlf-explorer/common/ledger';
import { Transport } from '@ts-core/common/transport';
import { IPagination } from '@ts-core/common/dto';
import { TransportHttpCommandAsync } from '@ts-core/common/transport/http';
import { TransformUtil } from '@ts-core/common/util';

export class LedgerBlockEventMapCollection extends PaginableDataSourceMapCollection<LedgerBlockEvent, any> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private transport: Transport) {
        super('uid');
        this.sort.createdDate = false;
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected commitPageIndexProperties(): void {
        this.load();
    }

    protected request(): Promise<IPagination<any>> {
        return this.transport.sendListen(new TransportHttpCommandAsync(`ledger/events`, { data: this.createRequestData() }));
    }

    protected parseItem(item: any): LedgerBlockEvent {
        return TransformUtil.toClass(LedgerBlockEvent, item);
    }
}
