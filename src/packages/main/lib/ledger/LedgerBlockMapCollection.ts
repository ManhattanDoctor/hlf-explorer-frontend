import { PaginableDataSourceMapCollection } from '@ts-core/common/map/dataSource';
import { LedgerBlock } from '@hlf-explorer/common/ledger';
import { IPagination } from '@ts-core/common/dto';
import { LedgerApi } from '@hlf-explorer/common/api/ledger';

export class LedgerBlockMapCollection extends PaginableDataSourceMapCollection<LedgerBlock, LedgerBlock> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private api: LedgerApi) {
        super('uid');
        this.sort.number = false;
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected commitPageIndexProperties(): void {
        this.load();
    }

    protected request(): Promise<IPagination<LedgerBlock>> {
        return this.api.getBlockList(this.createRequestData());
    }

    protected parseItem(item: LedgerBlock): LedgerBlock {
        return item;
    }
}
