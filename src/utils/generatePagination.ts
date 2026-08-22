import { Model, QueryFilter } from "mongoose";
import { IPaginationResult } from "../interfaces/pagination";

export async function paginate<T>(
  model: Model<T>,
  filter: QueryFilter<T> = {},
  page: number = 1,
  limit = 5,
): Promise<IPaginationResult<T>> {
  const skip = (page - 1) * limit;
  const [items, totalItems] = await Promise.all([
    model.find(filter).skip(skip).limit(limit),
    model.countDocuments(filter),
  ]);

  return {
    items,
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
    currentPage: page,
    pageSize: limit,
  };
}
