import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ProductM } from 'src/app/models/product';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  loading: boolean = false; 

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    public datepipe: DatePipe
  ) { }

  product: ProductM;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.loading = true;
      this.productService.getProductById(params["id"]).subscribe(data => {
        this.product = data;
        this.loading = false;
        //this.functt()
      })
    })
    //this.datepipe.transform(this.product.product_arrival_date, 'MM.dd.yyyy')
  }

  // functt() {
  //   this.datepipe.transform(this.product.product_arrival_date, 'dd/MM/yyyy')
  // }
}
