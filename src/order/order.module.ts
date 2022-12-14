import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from 'src/product/product.module';
import { OrderResolover } from './order.resolver';
import { OrderService } from './order.service';
import { Order, OrderSchema } from './schema/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ProductModule,
  ],
  providers: [OrderService, OrderResolover],
  exports: [OrderService],
})
export class OrderModule {}
