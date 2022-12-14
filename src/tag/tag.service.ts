import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationInput } from 'src/pagination/input/pagination.input';
import { CreateTagInput } from './input/createTag.input';
import { UpdateTagInput } from './input/updateTag.input';
import { Tag } from './schema/tag.schema';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag.name)
    private readonly tagModel: Model<Tag>,
  ) {}

  async create(createTagInput: CreateTagInput): Promise<Tag> {
    const createNew = new this.tagModel(createTagInput);
    try {
      return await createNew.save();
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async findAll(input: PaginationInput): Promise<any> {
    let options: any;

    if (input.search)
      options = {
        $or: [{ name: new RegExp(`^.*${input.search}.*$`, 'i') }],
      };

    const data = await this.tagModel
      .find({ deletedAt: { $exists: false } })
      .skip(input.skip || 0)
      .limit(input.limit);

    const total = await this.tagModel.find(options).count();

    return { data, total };
  }

  async findOne(id: string): Promise<Tag> {
    const tag = await this.tagModel.findById(id).exec();
    if (!tag) throw new NotFoundException(`Tag ${id} Not Found`);
    return tag;
  }

  async update(input: UpdateTagInput): Promise<Tag> {
    const tag = await this.tagModel
      .findByIdAndUpdate(input._id, input)
      .setOptions({ new: true });
    if (!tag) throw new NotFoundException(`Tag ${input._id} Not Found`);
    return tag;
  }

  async remove(id: string): Promise<Tag> {
    const tag = await this.tagModel
      .findByIdAndUpdate(id, { deletedAt: Date.now().toString() })
      .setOptions({ new: true });
    if (!tag) throw new NotFoundException(`Tag ${id} Not Found`);
    return tag;
    /*   const tag = await this.tagModel.findByIdAndDelete(id);
    if (!tag) throw new NotFoundException(`Tag id ${id} Not Found`);
    return tag; */
  }
}
