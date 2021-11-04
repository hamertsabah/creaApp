import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ProductM } from 'src/app/models/product';
import { ToolsItem } from 'src/app/models/tools-item';
import { ToolsPrdDetailService } from './tools-prd-detail.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  loading: boolean = false;
  prdId: number;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private toolsPrdServ: ToolsPrdDetailService
  ) {

  }

  sideItems: ToolsItem[] = this.toolsPrdServ.tools;

  product: ProductM;
  

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(params => {
    //   this.loading = true;
    //   this.productService.getProductById(params["id"]).subscribe(data => {
    //     this.product = data;
    //     this.loading = false;
    //   })
    // })
    //this.prdId = this.product.id;
  }

}
