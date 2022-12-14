import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SortOrder } from 'src/enum/sortOrder.enum';
import { TagService } from 'src/tag/tag.service';
import { CreateProductInput } from './input/createProduct.input';
import { GetProductsInput } from './input/getProducts.input';
import { UpdateProductInput } from './input/updateProduct.input';
import { Product } from './schema/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    private tagService: TagService,
  ) {}

  async create(input: CreateProductInput) {
    try {
      await this.validateCreateProduct(input);
      input.tags.forEach(async (tag) => {
        await this.tagService.findOne(tag);
      });
      const createNew = new this.productModel(input);
      return await (await createNew.save()).populate('tags');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(input: GetProductsInput): Promise<Product[]> {
    let perPage = 10;

    const page = input.page || 1;
    if (input.page == 0) {
      perPage = 0;
    }

    return await this.productModel
      .find({
        name: { $regex: input.name || '', $options: 'i' },
        code: input.code || { $exists: true },
        tags: input.tagId || { $exists: true },
      })
      .sort({ [input.sortBy]: input.sortOrder === SortOrder.ASC ? 1 : -1 })
      .limit(perPage)
      .skip((page - 1) * perPage)
      .populate('tags')
      .exec();
  }

  async findById(id: string) {
    const product = await this.productModel
      .findById(id)
      .populate('tags')
      .exec();
    if (!product) throw new NotFoundException(`Product ${id} Not Found`);
    return product;
  }

  async findByName(name: string) {
    const product = await this.productModel
      .findOne({ name: name })
      .populate('tags')
      .exec();
    if (!product) throw new NotFoundException(`Product ${name} Not Found`);
    return product;
  }

  async findByCode(code: string) {
    const product = await this.productModel
      .findOne({ code: { $regex: code || '', $options: 'i' } })
      .populate('tags')
      .exec();
    if (!product) throw new NotFoundException(`Product ${code} Not Found`);
    return product;
  }

  async update(input: UpdateProductInput) {
    try {
      await this.validateUpdateProduct(input);
      input.tags.forEach((tag) => {
        this.tagService.findOne(tag);
      });
      const product = await this.productModel
        .findByIdAndUpdate(input._id, input)
        .setOptions({ new: true });
      if (!product)
        throw new NotFoundException(`Product ${input._id} Not Found`);
      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) throw new NotFoundException(`Product id ${id} Not Found`);
    return product;
  }

  async validateCreateProduct(input: CreateProductInput) {
    if (!input.name) throw new Error('Product name is required');
    if (!input.price) throw new Error('Product price is required');
    if (!input.quantity) throw new Error('Quantity is required');
    if (!input.tags) throw new Error('Product tags is required');
    if (input.isAvailable == null)
      throw new Error('Avaialable status is required');

    if (input.tags.length === 0) {
      throw new Error('At least one tag should be added');
    }
    const product = await this.productModel
      .findOne({ $or: [{ name: input.name }, { code: input.code }] })
      .exec();
    if (product)
      throw new ConflictException('Product name or code already exists');
  }

  async validateUpdateProduct(input: UpdateProductInput) {
    if (!input.name) throw new Error('Product name is required');
    if (!input.code) throw new Error('Product code is required');
    if (!input.price) throw new Error('Product price is required');
    if (!input.quantity) throw new Error('Quantity is required');
    if (!input.tags) throw new Error('Product tags is required');
    if (input.isAvailable == null)
      throw new Error('Avaialable status is required');

    if (input.tags.length === 0) {
      throw new Error('At least one tag should be added');
    }
    const product = await this.productModel
      .findOne({ $or: [{ name: input.name, code: input.code }] })
      .exec();
    if (product && product.id !== input._id) {
      throw new ConflictException('Product name or code already exists');
    }
  }
}
