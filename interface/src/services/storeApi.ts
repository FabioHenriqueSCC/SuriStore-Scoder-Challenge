import axios, { type AxiosResponse } from "axios";

import type { Product } from "../types/products";
import type { LoginFormValues } from "../types/user";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

/**
 * Sends a POST request to authenticate a user and retrieve a token.
 *
 * This function makes an API call to the `/auth/login` endpoint with the provided login information (`loginInfos`),
 * and returns a promise that resolves to the response containing the authentication token.
 * If the request fails, it logs the error and throws it.
 *
 * @param {LoginFormValues} loginInfos - The login information, including the username and password.
 *
 * @returns {Promise<AxiosResponse<{ token: string }>>} A promise that resolves to the API response containing the authentication token.
 *
 * @throws {Error} Throws an error if the API request fails.
 *
 * @example
 * // Example usage:
 * // const response = await postUserAuth({ username: 'user', password: 'pass' });
 * // const token = response.data.token;
 */
export const postUserAuth = async (
  loginInfos: LoginFormValues
): Promise<AxiosResponse<{ token: string }>> => {
  const url = "/auth/login";

  try {
    const apiResponse = api.post(url, loginInfos);
    return apiResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

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

/**
 * Fetches a product by its ID.
 *
 * This function sends a GET request to the `/products/:id` endpoint to retrieve product details for the given `id`.
 * It returns a promise that resolves to the product data from the API response.
 * If the request fails, it logs the error and throws it.
 *
 * @param {string | undefined} id - The ID of the product to fetch.
 *
 * @returns {Promise<AxiosResponse<Product>>} A promise that resolves to the product data from the API response.
 *
 * @throws {Error} Throws an error if the API request fails.
 *
 * @example
 * // Example usage:
 * // const response = await getProductWithID('123');
 * // const product = response.data;
 */
export const getProductWithID = async (
  id: string | undefined
): Promise<AxiosResponse<Product>> => {
  const url = `/products/${id}`;

  try {
    const apiResponse = api.get(url);
    return apiResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
