import { Component, ElementRef, Inject, Renderer2 } from '@angular/core';
import { LoadableEvent } from '@ts-core/common';
import { TransportHttpCommandAsync } from '@ts-core/common/transport/http';
import {
    ApplicationComponent,
    LoginResolver,
    NotificationBaseComponent,
    NotificationComponent,
    NotificationFactory,
    NotificationService,
    PipeBaseService,
    QuestionComponent,
    RouterBaseService,
    UserBaseServiceEvent,
    ViewUtil,
    WindowBaseComponent,
    WindowFactory,
    WindowService
} from '@ts-core/frontend-angular';
import { Language, LanguageService } from '@ts-core/frontend/language';
import { LoadingService, LoadingServiceManager, NativeWindowService } from '@ts-core/frontend/service';
import { ThemeService } from '@ts-core/frontend/theme';
import { takeUntil, filter, map } from 'rxjs/operators';
import { LedgerApiMonitor } from '../../../services/LedgerApiMonitor';
import { RouterService } from '../../../services/RouterService';
import { SettingsService } from '../../../services/SettingsService';
import { ShellService } from '../../../services/ShellService';
import * as _ from 'lodash';
import { LedgerApi } from '@hlf-explorer/common/api';

@Component({
    selector: 'root',
    templateUrl: 'root.component.html',
    styleUrls: ['root.component.scss']
})
export class RootComponent extends ApplicationComponent<SettingsService> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        private windows: WindowService,
        private router: RouterBaseService,
        private shell: ShellService,
        private notifications: NotificationService,
        public loading: LoadingService,
        private pipe: PipeBaseService,
        private api: LedgerApi,
        private monitor: LedgerApiMonitor,
        private nativeWindow: NativeWindowService,
        element: ElementRef,
        protected renderer: Renderer2,
        protected settings: SettingsService,
        protected language: LanguageService,
        protected theme: ThemeService
    ) {
        super(element, 0);
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    protected initialize(): void {
        this.windows.factory = new WindowFactory(WindowBaseComponent);
        this.windows.questionComponent = QuestionComponent;

        this.notifications.factory = new NotificationFactory(NotificationBaseComponent);
        this.notifications.questionComponent = NotificationComponent;

        super.initialize();

        ViewUtil.addClasses(this.element, 'h-100 d-block');
        this.initializeObservers();

        this.api.url = this.monitor.url = this.settings.apiUrl;
        this.api.settings.defaultLedgerName = this.monitor.settings.defaultLedgerName = this.settings.ledgerName;

        this.theme.loadIfExist(this.settings.theme);
        this.language.loadIfExist(this.settings.language);
    }

    private initializeObservers(): void {
        let manager = this.addDestroyable(new LoadingServiceManager(this.loading));
        manager.addLoadable(this.language);
        manager.addLoadable(this.monitor);
        manager.addLoadable(this.api.http);

        this.api.http.events
            .pipe(filter(event => event.type === LoadableEvent.ERROR))
            .pipe(map(<T>(event) => event.data as TransportHttpCommandAsync<T>))
            .pipe(takeUntil(this.destroyed))
            .subscribe(data => this.apiLoadingError(data));
    }

    //--------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    //--------------------------------------------------------------------------

    protected async apiLoadingError<T>(command: TransportHttpCommandAsync<T>): Promise<void> {
        if (command.isHandleError) {
            this.windows.info(command.error.message);
        }
    }

    protected languageLoadingError(item: Language, error: Error): void {
        let message = !_.isNil(error) ? error.message : `Unable to load language "${item.name}"`;
        this.router.navigate(`${RouterService.MESSAGE_URL}/${message}`);
    }

    protected readyHandler(): void {
        this.monitor.connect();
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Properties
    //
    //--------------------------------------------------------------------------

    protected get config(): any {
        return this.nativeWindow.window['viConfig'];
    }

    protected get routerParams(): any {
        return this.router.getParams();
    }
}
