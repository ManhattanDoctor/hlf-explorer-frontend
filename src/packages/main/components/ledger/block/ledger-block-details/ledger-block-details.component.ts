import { Component, ViewContainerRef, Input } from '@angular/core';
import { ViewUtil, IWindowContent, ISelectListItem, SelectListItems, SelectListItem } from '@ts-core/frontend-angular';
import { LedgerBlock, LedgerBlockEvent, LedgerBlockTransaction } from '@hlf-explorer/common/ledger';
import { TextHighlightUtil } from '../../../../lib/util/TextHighlightUtil';
import * as _ from 'lodash';
import { MapCollection } from '@ts-core/common/map';
import { RouterService } from '../../../../services/RouterService';
import { LanguageService } from '@ts-core/frontend/language';

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
    public tabs: SelectListItems<ISelectListItem<string>>;
    public blockEvents: MapCollection<LedgerBlockEvent>;
    public blockTransactions: MapCollection<LedgerBlockTransaction>;

    private _block: LedgerBlock;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ViewContainerRef, language: LanguageService, public router: RouterService) {
        super(container);
        ViewUtil.addClasses(container.element, 'd-flex flex-column');

        this.blockEvents = new MapCollection('uid');
        this.blockTransactions = new MapCollection('uid');

        this.tabs = new SelectListItems(language);
        this.tabs.add(new SelectListItem('block.details', 0, 'details'));
        this.tabs.add(new SelectListItem('block.transaction.transactions', 1, 'transactions'));
        this.tabs.add(new SelectListItem('block.event.events', 2, 'events'));
        this.tabs.add(new SelectListItem('block.rawData', 3, 'rawData'));
        this.tabs.complete(0);
        this.addDestroyable(this.tabs);
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

        let value = null;

        value = TextHighlightUtil.text(JSON.stringify(this.block.rawData, null, 4));
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
}
