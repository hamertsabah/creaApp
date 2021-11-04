import { Component, OnInit } from '@angular/core';
import { ProductM } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ToolsPrdDetailService } from '../product-detail/tools-prd-detail.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: ProductM[] = [];

  public selectedItem: ProductM = null;

  constructor(
    private productService: ProductService,
    private toolsPrdServ: ToolsPrdDetailService,
    private commentServ: CommentService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getProducts().subscribe(response => {
      this.products = response;
      
    })
  }

  getSelectedItem(item: ProductM) {
    this.selectedItem = item;
    this.toolsPrdServ.objGetter(this.selectedItem);
    this.commentServ.prdGetter(this.selectedItem);
  }

}
