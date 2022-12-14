import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TagService } from './tag.service';
import { CreateTagModel } from './model/createTag.model';
import { CreateTagInput } from './input/createTag.input';
import { UpdateTagInput } from './input/updateTag.input';
import { TagModel } from './model/tag.model';
import { TagPaginationModel } from './model/tagPagination.model';
import { PaginationInput } from 'src/pagination/input/pagination.input';

@Resolver()
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Mutation(() => CreateTagModel)
  async createTag(@Args('input') input: CreateTagInput) {
    return await this.tagService.create(input);
  }

  @Query(() => TagPaginationModel)
  async tags(@Args('input') input: PaginationInput) {
    return await this.tagService.findAll(input);
  }

  @Query(() => TagModel)
  async findTag(@Args('id') id: string) {
    return await this.tagService.findOne(id);
  }

  @Mutation(() => CreateTagModel)
  async updateTag(@Args('input') input: UpdateTagInput) {
    return await this.tagService.update(input);
  }

  @Mutation(() => TagModel)
  async removeTag(@Args('id') id: string) {
    return await this.tagService.remove(id);
  }
}
