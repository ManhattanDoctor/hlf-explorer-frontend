import { NotificationService, WindowConfig, WindowService } from '@ts-core/frontend-angular';
import { LanguageService } from '@ts-core/frontend/language';
import { TextContainerComponent } from '../../components/common/text-container/text-container.component';
import { RouterService } from '../RouterService';
import { ShellService } from '../ShellService';
import { LedgerApiClient } from '@hlf-explorer/common/api';
import { ResetContainerComponent } from '../../components/common/reset-container/reset-container.component';
import { takeUntil } from 'rxjs/operators';

export class ShellServiceBaseImpl extends ShellService {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        protected api: LedgerApiClient,
        protected windows: WindowService,
        protected notifications: NotificationService,
        protected language: LanguageService,
        protected router: RouterService
    ) {
        super();
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public textOpen(text: string): void {
        let windowId = 'textOpen' + text;
        if (this.windows.setOnTop(windowId)) {
            return;
        }

        let config = new WindowConfig(false, true, 800, 600);
        config.id = windowId;
        config.propertiesId = 'textOpen';

        let content = this.windows.open(TextContainerComponent, config) as TextContainerComponent;
        content.text = text;
    }

    public async resetOpen(): Promise<void> {
        let windowId = 'resetOpen';
        if (this.windows.setOnTop(windowId)) {
            return Promise.reject('Already opened');
        }

        let config = new WindowConfig(true, false, 600);
        config.id = windowId;

        let content = this.windows.open(ResetContainerComponent, config) as ResetContainerComponent;
        content.events.pipe(takeUntil(content.destroyed)).subscribe(async event => {
            switch (event) {
                case ResetContainerComponent.EVENT_SUBMITTED:
                    try {
                        content.isDisabled = true;
                        await this.api.reset(content.serialize().password);
                        this.notifications.info('explorer.resetNotification');
                    } finally {
                        content.isDisabled = false;
                    }
                    content.close();
                    break;
            }
        });
    }
}
