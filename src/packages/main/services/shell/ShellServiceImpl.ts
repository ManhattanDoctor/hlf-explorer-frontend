import { Injectable } from '@angular/core';
import { NotificationService, WindowService } from '@ts-core/frontend-angular';
import { LanguageService } from '@ts-core/frontend/language';
import { RouterService } from '../RouterService';
import { ShellServiceBaseImpl } from './ShellServiceBaseImpl';
import { LedgerApi } from '@hlf-explorer/common/api';

@Injectable()
export class ShellServiceImpl extends ShellServiceBaseImpl {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(api: LedgerApi, windows: WindowService, notifications: NotificationService, language: LanguageService, router: RouterService) {
        super(api, windows, notifications, language, router);
    }
}
