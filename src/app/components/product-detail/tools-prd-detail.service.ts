import { Injectable } from '@angular/core';
import { ToolsItem } from 'src/app/models/tools-item';
import { Observable, Subject } from 'rxjs';
import { ProductM } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ToolsPrdDetailService {

  receivedItem$: Observable<any>;
  private receivedItemSubj = new Subject<ProductM>();

  public tools: ToolsItem[] = [
    {
      displayName: 'Product Details',
      route: 'product-detail/details'
    },
    {
      displayName: 'Product Comments',
      route: 'product-detail/comments'
    }
  ]

  constructor() { }

  clearIdsFromRoutes() {
    this.tools[0].route= 'product-detail/details';
    this.tools[1].route = 'product-detail/comments';
  }

  objGetter(data) {
    this.receivedItemSubj.next(data);
    this.tools[0].route = this.tools[0].route + '/' + data.id;
    this.tools[1].route = this.tools[1].route + '/' + data.id;
  }
}
