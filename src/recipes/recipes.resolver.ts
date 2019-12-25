import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewRecipeInput, NewAccountInput, NewSolveInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { Recipe } from './models/recipe.entity';
import { RecipesService } from './recipes.service';

const pubSub = new PubSub();

@Resolver(of => Recipe)
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) { }

  @Query(returns => Recipe)
  async recipe(@Args('id') id: string): Promise<Recipe> {
    const recipe = await this.recipesService.findOneById(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }

  @Query(returns => [Recipe])
  getAccount(): Promise<Recipe[]> {
    console.log("resceive dreq");
    return this.recipesService.findAll();
  }

  @Mutation(returns => Recipe)
  async addAccount(
    @Args('newAccountData') newRecipeData: NewRecipeInput,
  ): Promise<Recipe> {
    const recipe = await this.recipesService.create(newRecipeData);
    return recipe;
  }

  @Mutation(returns => Recipe)
  async solve(
    @Args('newSolveData') newSolveData: NewSolveInput,
  ): Promise<Recipe> {
    const solve = await this.recipesService.solve(newSolveData);
    return solve;
  }

  @Mutation(returns => Recipe)
  async getMoney(
    @Args('newAccountData') newRecipeData: NewAccountInput,
  ): Promise<Recipe> {
    const recipe = await this.recipesService.getMoney(newRecipeData);
    return recipe;
  }


}
