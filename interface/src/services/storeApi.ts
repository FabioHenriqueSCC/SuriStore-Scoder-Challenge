import axios, { type AxiosResponse } from "axios";

import type { Product } from "../types/products";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

/**
 * Fetches all products from the API.
 *
 * This asynchronous function sends a GET request to the "/products" endpoint to retrieve a list of products.
 * It returns a promise that resolves to the Axios response containing an array of `Product` objects.
 * If the request fails, an error is logged to the console, and the error is thrown.
 *
 * @async
 * @function getAllProducts
 *
 * @returns {Promise<AxiosResponse<Product[]>>} A promise that resolves to the Axios response containing the list of products.
 *
 * @throws {Error} If the GET request fails, an error is thrown.
 */
export const getAllProducts = async (): Promise<AxiosResponse<Product[]>> => {
  const url = "/products";

  try {
    const allProducts = api.get(url);
    return allProducts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
