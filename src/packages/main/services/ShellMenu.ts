import { ISelectListItem, SelectListItem, SelectListItems } from '@ts-core/frontend-angular';
import { LanguageService } from '@ts-core/frontend/language';
import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { RouterService } from './RouterService';

@Injectable()
export class ShellMenu extends SelectListItems<ISelectListItem<string>> {
    // --------------------------------------------------------------------------
    //
    //	Constants
    //
    // --------------------------------------------------------------------------

    private static DASHBOARD = 0;
    private static BLOCKS = 1;
    private static TRANSACTIONS = 1;
    private static EVENTS = 2;

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(language: LanguageService, router: RouterService) {
        super(language);

        let item: ShellListItem = null;

        item = new ShellListItem('tab.dashboard', ShellMenu.DASHBOARD, `/${RouterService.DASHBOARD_URL}`);
        this.add(item);

        item = new ShellListItem('tab.blocks', ShellMenu.BLOCKS, `/${RouterService.BLOCKS_URL}`);
        this.add(item);

        item = new ShellListItem('tab.transactions', ShellMenu.TRANSACTIONS, `/${RouterService.TRANSACTIONS_URL}`);
        this.add(item);

        item = new ShellListItem('tab.events', ShellMenu.EVENTS, `/${RouterService.EVENTS_URL}`);
        this.add(item);

        for (let item of this.collection) {
            item.action = item => router.navigate(item.data);
            item.checkSelected = item => router.isUrlActive(item.data);
        }
        this.complete();
        this.refresh();
        // Router
        router.finished.subscribe(() => this.refreshSelection());
    }
}

class ShellListItem extends SelectListItem<string> {
    constructor(translationId: string, sortIndex: number, url: string, iconId?: string, className?: string, selectedClassName: string = 'active') {
        super(translationId, sortIndex, url);
        this.iconId = iconId;
        this.className = className;
        this.selectedClassName = selectedClassName;
    }
}
