import { Component, ViewContainerRef, Input } from '@angular/core';
import { ViewUtil, IWindowContent } from '@ts-core/frontend-angular';
import { LedgerBlock, LedgerBlockEvent, LedgerBlockTransaction } from '@hlf-explorer/common/ledger';
import { TextHighlightUtil } from '../../../../lib/util/TextHighlightUtil';
import * as _ from 'lodash';
import { MapCollection } from '@ts-core/common/map';
import { RouterService } from '../../../../services/RouterService';

@Component({
    selector: 'ledger-block-details',
    templateUrl: 'ledger-block-details.component.html'
})
export class LedgerBlockDetailsComponent extends IWindowContent {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public rawText: string;
    public blockEvents: MapCollection<LedgerBlockEvent>;
    public blockTransactions: MapCollection<LedgerBlockTransaction>;

    private _block: LedgerBlock;

    private _mode: Mode;
    private _selectedIndex: number;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ViewContainerRef, public router: RouterService) {
        super(container);
        ViewUtil.addClasses(container.element, 'd-flex flex-column');

        let mode = this.router.getParam<Mode>('tab', Mode.DETAILS);
        this.mode = mode in Mode ? mode : Mode.DETAILS;
        this.blockEvents = new MapCollection('uid');
        this.blockTransactions = new MapCollection('uid');
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private commitBlockProperties(): void {
        this.blockEvents.clear();
        this.blockEvents.addItems(this.block.events);

        this.blockTransactions.clear();
        this.blockTransactions.addItems(this.block.transactions);

        this.checkText();
    }

    private checkText(): void {
        if (_.isNil(this.block) || !(this.mode === 'rawData')) {
            return;
        }

        let value = TextHighlightUtil.text(JSON.stringify(this.block.rawData, null, 4));
        if (value !== this.rawText) {
            this.rawText = value;
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public get block(): LedgerBlock {
        return this._block;
    }

    @Input()
    public set block(value: LedgerBlock) {
        if (value === this._block) {
            return;
        }
        this._block = value;
        if (this._block) {
            this.commitBlockProperties();
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Properties
    //
    //--------------------------------------------------------------------------

    private get detailsIndex(): number {
        return 0;
    }
    private get transactionsIndex(): number {
        return 1;
    }
    private get eventsIndex(): number {
        return 2;
    }
    private get rawDataIndex(): number {
        return 3;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get mode(): Mode {
        return this._mode;
    }

    @Input()
    public set mode(value: Mode) {
        if (value === this._mode) {
            return;
        }
        this._mode = value;
        this.checkText();
        this.router.setParam('tab', value);

        switch (value) {
            case 'details':
                this.selectedIndex = this.detailsIndex;
                break;
            case 'rawData':
                this.selectedIndex = this.rawDataIndex;
                break;
            case 'transactions':
                this.selectedIndex = this.transactionsIndex;
                break;
            case 'events':
                this.selectedIndex = this.eventsIndex;
                break;
        }
    }

    public get selectedIndex(): number {
        return this._selectedIndex;
    }
    public set selectedIndex(value: number) {
        if (value === this._selectedIndex) {
            return;
        }
        this._selectedIndex = value;
        switch (value) {
            case this.detailsIndex:
                this.mode = Mode.DETAILS;
                break;
            case this.rawDataIndex:
                this.mode = Mode.RAW_DATA;
                break;
            case this.transactionsIndex:
                this.mode = Mode.TRANSACTIONS;
                break;
            case this.eventsIndex:
                this.mode = Mode.EVENTS;
                break;
        }
    }
}

enum Mode {
    DETAILS = 'details',
    RAW_DATA = 'rawData',
    TRANSACTIONS = 'transactions',
    EVENTS = 'events'
}
