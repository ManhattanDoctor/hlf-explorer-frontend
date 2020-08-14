import { Component, ElementRef } from '@angular/core';
import * as _ from 'lodash';
import { LedgerApiMonitor } from '../../../services/LedgerApiMonitor';
import { RouterService } from '../../../services/RouterService';
import { SearchContainerBaseComponent } from '../SearchContainerBaseComponent';
import { ViewUtil } from '@ts-core/frontend-angular';
import { LedgerApi } from '@hlf-explorer/common/api';

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
        super(router, api);
        ViewUtil.addClasses(element, 'd-flex background border rounded');
    }
}
