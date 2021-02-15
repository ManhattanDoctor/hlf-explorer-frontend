import { Component, ElementRef } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ViewUtil } from '@ts-core/frontend-angular';
import { ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { LedgerBlock } from '@hlf-explorer/common/ledger';
import * as _ from 'lodash';
import { ObjectUtil } from '@ts-core/common/util';

@Component({
    templateUrl: 'block.component.html'
})
export class BlockComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef, private route: ActivatedRoute) {
        super();
        ViewUtil.addClasses(element, 'd-block');
        let item = this.block.rawData;
        this.parseObject(item);
    }

    private parseObject(item: any): void {
        if (_.isNil(item) || !_.isObject(item)) {
            return;
        }
        item = item as any;
        if (!ObjectUtil.hasOwnProperties(item, ['type', 'data']) || item.type !== 'Buffer') {
            for (let value of Object.values(item)) {
                if (_.isObject(value)) {
                    this.parseObject(value);
                }
            }
            return;
        }
        let data = Buffer.from(item.data).toString();
        item.data = ObjectUtil.isJSON(data) ? JSON.parse(data) : data;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get block(): LedgerBlock {
        return this.route.snapshot.data.block;
    }
}
