import { createDishesServiceProps, DishGetAllServiceProps, updateDishesServiceProps } from "./services.js";
import { Request } from "express";

export type createDishesControllerRequst = Request<[], {}, createDishesServiceProps, {}>;
export type updateDishesControllerRequst = Request<[], {}, updateDishesServiceProps, {}>;
export type deleteDishesControllerRequst = Request<{ id: string }, {}, {}, {}>;
export type getDishesControllerRequst = Request<[], {}, {}, DishGetAllServiceProps>;