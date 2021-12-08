import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../../../../services/base.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  pageTitle: string = "Products..";
  products: any;


  constructor(
    public httpClient: HttpClient,
    public baseService: BaseService
  ) { }


  getProducts() {
    
    console.log("getProducts()... from baseService")

    this.baseService.allProduct('wc/v3/products').subscribe(
      res => {
        console.log("res", res)
        this.products = res

        console.log( "Prodcut:", this.products )
      },
      err => console.log("err", err)
    )
  }


  ngOnInit(): void {
    this.getProducts()
  }

}
