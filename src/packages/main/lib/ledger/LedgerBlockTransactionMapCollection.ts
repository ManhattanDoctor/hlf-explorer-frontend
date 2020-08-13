import { PaginableDataSourceMapCollection } from '@ts-core/common/map/dataSource';
import { LedgerBlockTransaction } from '@hlf-explorer/common/ledger';
import { IPagination } from '@ts-core/common/dto';
import { LedgerApi } from '@hlf-explorer/common/api/ledger';

export class LedgerBlockTransactionMapCollection extends PaginableDataSourceMapCollection<LedgerBlockTransaction, LedgerBlockTransaction> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private api: LedgerApi) {
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

    protected request(): Promise<IPagination<LedgerBlockTransaction>> {
        return this.api.getTransactionList(this.createRequestData());
    }

    protected parseItem(item: LedgerBlockTransaction): LedgerBlockTransaction {
        return item;
    }
}
