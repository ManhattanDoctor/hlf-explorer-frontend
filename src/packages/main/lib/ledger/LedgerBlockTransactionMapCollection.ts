import { PaginableDataSourceMapCollection } from '@ts-core/common/map/dataSource';
import { LedgerBlock, LedgerBlockTransaction } from '@hlf-explorer/common/ledger';
import { Transport } from '@ts-core/common/transport';
import { IPagination } from '@ts-core/common/dto';
import { TransportHttpCommandAsync } from '@ts-core/common/transport/http';
import { TransformUtil } from '@ts-core/common/util';

export class LedgerBlockTransactionMapCollection extends PaginableDataSourceMapCollection<LedgerBlockTransaction, any> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private transport: Transport) {
        super('hash');
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
        return this.transport.sendListen(new TransportHttpCommandAsync(`ledger/transactions`, { data: this.createRequestData() }));
    }

    protected parseItem(item: any): LedgerBlockTransaction {
        return TransformUtil.toClass(LedgerBlockTransaction, item);
    }
}
