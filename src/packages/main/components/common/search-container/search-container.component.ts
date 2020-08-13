import { Component, ElementRef } from '@angular/core';
import * as _ from 'lodash';
import { Transport } from '@ts-core/common/transport';
import { LedgerApiMonitor } from '../../../services/LedgerApiMonitor';
import { RouterService } from '../../../services/RouterService';
import { SearchContainerBaseComponent } from '../SearchContainerBaseComponent';
import { ViewUtil } from '@ts-core/frontend-angular';
import { LedgerApi } from '@hlf-explorer/common/api/ledger';

@Component({
    selector: 'search-container',
    templateUrl: 'search-container.component.html'
})
export class SearchContainerComponent extends SearchContainerBaseComponent {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public query: string;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef, router: RouterService, api: LedgerApi, public monitor: LedgerApiMonitor) {
        super(element, router, api);
        ViewUtil.addClasses(element, 'd-flex background border rounded');
    }
}
