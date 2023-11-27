import {checkIfRestaurantExists} from './restaurantMiddleWare';
import {Request} from 'express';
import {checkIfDishExists, checkIfExtraExists} from './dishesMiddelWare';

export async function errorHandlingImage(_req: Request) {
  const restaurantName: string = _req.body.restaurant;

  if (await checkIfRestaurantExists(restaurantName) === false) {
    return 'Post Images failed: Restaurant does not exist';
  }
  const base64: string = _req.body.image.base64;
  const filename: string = _req.body.image.filename;
  const contentType: string = _req.body.image.contentType;
  const size: number = _req.body.image.size;
  const dishName: string = _req.body.dish;
  const extraName: string = _req.body.extra;

  if (!base64)
    return 'Post Images failed: base64 missing';
  if (!filename)
    return 'Post Images failed: filename missing';
  if (!contentType)
    return 'Post Images failed: contentType missing';
  if (size === undefined || size === null || isNaN(Number(size))) {
    return 'Post Images failed: size missing or not a number';
  }
  if (dishName) {
    if (await checkIfDishExists(restaurantName, dishName) === false)
      return 'Post Images failed: Dish does not exist';
  }
  if (extraName) {
    if (await checkIfExtraExists(restaurantName, extraName) === false)
      return 'Post Images failed: Extra does not exist';
  }
}
