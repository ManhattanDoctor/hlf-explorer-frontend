import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef } from '@angular/core';
import {
    NotificationService,
    ShellBaseComponent,
    ViewUtil
} from '@ts-core/frontend-angular';
import { LanguageService } from '@ts-core/frontend/language';
import { ThemeService } from '@ts-core/frontend/theme';
import { LedgerApiMonitor } from '../../../services/LedgerApiMonitor';
import { ShellMenu } from '../../../services/ShellMenu';

@Component({
    selector: 'shell',
    styleUrls: ['shell.component.scss'],
    templateUrl: 'shell.component.html'
})
export class ShellComponent extends ShellBaseComponent {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        public language: LanguageService,
        public theme: ThemeService,
        public monitor: LedgerApiMonitor,
        public menu: ShellMenu,
        notifications: NotificationService,
        breakpointObserver: BreakpointObserver,
        element: ElementRef
    ) {
        super(notifications, breakpointObserver);
        ViewUtil.addClasses(element, 'd-block w-100 h-100');

        this.initialize();
    }
}
