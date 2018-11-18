import {Product, ProductList} from '../entities';
import {ApiClient} from '../infrastructure';
import {ProductFactory, UserFactory} from '../factories';
import {ProductListFactory, ProductJsonProps} from '../factories/product_list';

export interface ProductTypes {
    fashion: ProductList[];
    beauty: ProductList[];
}

export class ProductService {

    public static async getAll() {
        const res = await ApiClient.get('/products/');

        const data: ProductTypes = {
            fashion: [],
            beauty: [],
        };

        res.fashion.forEach((d: ProductJsonProps) => data.fashion.push(ProductListFactory.createFromJSON(d)));
        res.beauty.forEach((d: ProductJsonProps) => data.beauty.push(ProductListFactory.createFromJSON(d)));

        return data;
    }

    public static async getVotedProducts() {
        // TODO
        return [];
    }

    public static async get(id: number) {
        const res = await ApiClient.get(`/products/${id}`);
        const product = ProductFactory.createFromJSON(res);
        return product;
    }
}
