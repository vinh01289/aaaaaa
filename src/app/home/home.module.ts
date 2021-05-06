import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoNgZorroAntdModule } from 'src/shared/ng-zoro-antd.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { ShopOrderComponent } from './shop-order/shop-order.component';
import { ShopProductComponent } from './shop-product/shop-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConversationComponent } from './chat/conversation/conversation.component';
import { ShareModule } from 'src/shared/share.module';



@NgModule({
  declarations: [
    HomeComponent,
    ShopOrderComponent,
    ShopProductComponent,
    ConversationComponent
  ],
  
  exports:[HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    DemoNgZorroAntdModule,
    ShareModule
  ]
})
export class HomeModule { }
