import { NotificationService, WindowConfig, WindowService } from '@ts-core/frontend-angular';
import { LanguageService } from '@ts-core/frontend/language';
import { TextContainerComponent } from '../../components/common/text-container/text-container.component';
import { RouterService } from '../RouterService';
import { ShellService } from '../ShellService';
import { LedgerApi } from '@hlf-explorer/common/api';

export class ShellServiceBaseImpl extends ShellService {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        protected api: LedgerApi,
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
}
