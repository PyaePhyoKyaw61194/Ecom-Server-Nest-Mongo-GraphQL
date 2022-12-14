import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { SortOrder } from 'src/enum/sortOrder.enum';
import { ProductService } from 'src/product/product.service';
import { CreateOrderInput } from './input/createOrder.input';
import { CreateOrderItemInput } from './input/createOrderItemInput';
import { GetOrdersInput } from './input/getOrders.input';
import { UpdateOrderInput } from './input/updateOrder.input';
import { UpdateOrderItemsInput } from './input/updateOrderItemsinput';
import { Order } from './schema/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
    private productService: ProductService,
  ) {}

  async create(createOrderInput: CreateOrderInput, user: any): Promise<Order> {
    /*   createOrderInput.orderCode = '####'; */

    try {
      await this.checkProductsInstockQuantity_Create(
        createOrderInput.orderItems,
      );
      await this.reduceProductsInstockQuantity(createOrderInput.orderItems);

      (createOrderInput as any).orderCode = nanoid(8);
      /*    (createOrderInput as any).orderCustomer = user._id; */
      const createNew = new this.orderModel(createOrderInput);
      return await (
        await (await createNew.save()).populate('orderCustomer')
      ).populate('status');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(input: GetOrdersInput): Promise<any> {
    let perPage = 10;
    const page = input.page || 1;
    if (input.page == 0) {
      perPage = 0;
    }
    let where: any = {};
    // const fromDate = new Date(input.fromOrderDate);
    // const toDate = new Date(input.toOrderDate);
    if (input.fromOrderDate && input.toOrderDate) {
      // if (fromDate > toDate) {
      //   return new BadRequestException('check your date');
      // }
      where = {
        $gte: input.fromOrderDate,
        $lte: input.toOrderDate,
      };
    } else if (input.fromOrderDate) {
      where = input.fromOrderDate;
    } else if (input.toOrderDate) {
      where = input.toOrderDate;
    } else {
      where = { $exists: true };
    }

    const orders = await this.orderModel
      .find({
        $or: [
          { orderCode: { $regex: input.search || '', $options: 'i' } },
          { paymentType: { $regex: input.search || '', $options: 'i' } },
          {
            'toDeliverCustomer.name': {
              $regex: input.search || '',
              $options: 'i',
            },
          },
          // FIXME
          // {
          //   orderCustomer: {
          //     $regex: input.search || '',
          //     $options: 'i',
          //   },
          // },
          {
            'orderItems.productName': {
              $regex: input.search || '',
              $options: 'i',
            },
          },
        ],
        'orderItems.productId': input.productId || { $exists: true },
        status: input.statusId || { $exists: true },
        paymentType: input.paymentId || { $exists: true },
        orderCustomer: input.userId || { $exists: true },
        orderDate: where,
        deliveredDate: input.deliveredDate || { $exists: true },
      })
      .sort({
        [input.orderSortBy]: input.sortOrder === SortOrder.ASC ? 1 : -1,
      })
      .limit(perPage)
      .skip((page - 1) * perPage)
      .populate('orderCustomer')
      .populate('status')
      .populate('tags')
      .populate('orderItems')
      .exec();

    return await orders.map(async (order: any) => {
      const orderWithProductTags = order.orderItems.map(async (item: any) => {
        const productId = item.productId;
        const product = await this.productService.findById(productId);
        item.tags = product.tags;
        return item;
      });
      await Promise.all(orderWithProductTags);
      return order;
    });
    /*   await Promise.all(data);
    console.log(data);
    return data; */
    /* const data = await ordersWithProductTags;
    console.log(data); */
    /* console.log(await (await ordersWithProductTags[0]).orderItems[0]); */
    /*  return ordersWithProductTags; */
  }

  // async findAll(input: PaginationInput): Promise<any> {
  //   let options: any;

  //   if (input.search)
  //     options = {
  //       $or: [{ orderCode: new RegExp(`^.*${input.search}.*$`, 'i') }],
  //     };

  //   const data = await this.orderModel
  //     .find(options)
  //     .populate('orderCustomer')
  //     .populate('status')
  //     .exec();

  //   const total = await this.orderModel.find(options).count();

  //   return { data, total };
  // }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel
      .findById(id)
      .populate('orderCustomer')
      .populate('status')
      .populate('tags')
      .exec();

    if (!order) throw new NotFoundException('Order Not Found');
    return order;
  }

  async update(updateOrderInput: UpdateOrderInput) {
    try {
      const order = await this.orderModel
        .findByIdAndUpdate(updateOrderInput._id, updateOrderInput)
        .setOptions({ new: true })
        .populate('orderCustomer')
        .populate('status')
        .populate('tags')
        .exec();
      return order;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateOrderItems(updateOrderItemsInput: UpdateOrderItemsInput) {
    try {
      const order = await this.orderModel.findById(
        updateOrderItemsInput.orderId,
      );
      await this.checkProductsInstockQuantity_Update(
        updateOrderItemsInput.orderItems,
        order.orderItems,
      );
      await this.resetProductsInstockQuantity(order.orderItems);
      await this.reduceProductsInstockQuantity(
        updateOrderItemsInput.orderItems,
      );
      return await this.orderModel
        .findByIdAndUpdate(updateOrderItemsInput.orderId, updateOrderItemsInput)
        .setOptions({ new: true })
        .exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async checkProductsInstockQuantity_Create(
    orderItems: CreateOrderItemInput[],
  ) {
    const data = orderItems.map(async (orderItem) => {
      const productId = orderItem.productId;
      const product = await this.productService.findById(productId);
      const newQuantity = product.quantity - orderItem.boughtQuantity;
      if (newQuantity < 0) {
        return -1;
      }
    });
    const errors = await Promise.all(data);
    if (errors.includes(-1)) {
      throw new BadRequestException('Low Instock Quantity of Product(s)');
    }
  }

  async checkProductsInstockQuantity_Update(
    currentOrderItems: CreateOrderItemInput[],
    oldOrderItems: CreateOrderItemInput[],
  ) {
    const data = currentOrderItems.map(async (currentOrderItem) => {
      let newQuantity = 0;
      const productId = currentOrderItem.productId;
      const product = await this.productService.findById(productId);

      const oldOrderItem = await oldOrderItems.find(
        (orderItem) => orderItem.productId === productId,
      );

      if (oldOrderItem !== undefined) {
        /*      console.log('oldOrderItem', oldOrderItem); */
        newQuantity =
          product.quantity +
          oldOrderItem.boughtQuantity -
          currentOrderItem.boughtQuantity;
      } else {
        newQuantity = product.quantity - currentOrderItem.boughtQuantity;
      }

      if (newQuantity < 0) {
        console.log('Low Q');
        console.log(newQuantity);
        return -1;
      }
    });

    const errors = await Promise.all(data);
    if (errors.includes(-1)) {
      throw new BadRequestException('Low Instock Quantity of Product(s)');
    }
  }

  async reduceProductsInstockQuantity(orderItems: CreateOrderItemInput[]) {
    const data = orderItems.map(async (orderItem) => {
      const productId = orderItem.productId;
      const product = await this.productService.findById(productId);
      product.quantity = product.quantity - orderItem.boughtQuantity;
      await product.save();
    });
    await Promise.all(data);
  }

  async resetProductsInstockQuantity(oldOrderItems: CreateOrderItemInput[]) {
    const data = oldOrderItems.map(async (oldOrderItem) => {
      const productId = oldOrderItem.productId;
      const product = await this.productService.findById(productId);
      product.quantity = product.quantity + oldOrderItem.boughtQuantity;
      await product.save();
    });
    await Promise.all(data);
  }

  async remove(id: string) {
    const order = await this.orderModel.findByIdAndDelete(id);
    if (!order) throw new NotFoundException('Order Not Found');
    await this.resetProductsInstockQuantity(order.orderItems);
    return order;
  }
}
