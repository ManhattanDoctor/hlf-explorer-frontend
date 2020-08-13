import { Injectable } from '@angular/core';
import { CookieService } from '@ts-core/frontend-angular';
import { SettingsBaseService } from '@ts-core/frontend/service';

@Injectable()
export class SettingsService extends SettingsBaseService {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(private cookies: CookieService) {
        super();
    }
}
