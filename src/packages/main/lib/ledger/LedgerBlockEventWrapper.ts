import { LedgerBlockEvent } from '@hlf-explorer/common/ledger';
import * as _ from 'lodash';
import { ObjectUtil } from '@ts-core/common/util';
import { LedgerBlockTransactionWrapper } from './LedgerBlockTransactionWrapper';

export class LedgerBlockEventWrapper extends LedgerBlockEvent {
    // --------------------------------------------------------------------------
    //
    //  Propertes
    //
    // --------------------------------------------------------------------------

    constructor(item: LedgerBlockEvent) {
        super();
        ObjectUtil.copyProperties(item, this);
    }

    // --------------------------------------------------------------------------
    //
    //  Public Propertes
    //
    // --------------------------------------------------------------------------

    public get isHasData(): boolean {
        return !_.isEmpty(this.data);
    }

    public get eventData(): any {
        return this.isHasData ? LedgerBlockTransactionWrapper.parseJSON(this.data) : null;
    }
}
