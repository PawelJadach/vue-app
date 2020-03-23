import * as express from 'express';
import { DatabaseProvider } from "./../database";
const products = new DatabaseProvider();

interface IProduct {
    id: number,
    name: string;
    url: string;
    prize: number;
}

export class ProductsController {
    static getAllItems(req: express.Request, res: express.Response) {
        return products.get('products').then((data: IProduct[]) => {
            res.status(200).json(data);
        }).catch((err) => {
            console.error(err);
            res.status(500).json({ 'error' : true });
        })
    }

    static addNewItem(req: express.Request, res: express.Response) {
        return products.post('products', req.body).then(( obj: IProduct) => {
            res.status(200).json({ message: 'Item added', item: obj });
        }).catch((err) => {
            console.error(err);
            res.status(500).json({ 'error' : true });
        })
    }

    static deleteItem(req: express.Request, res: express.Response) {
        return products.delete('products', Number(req.params.id)).then(( obj: IProduct) => {
            res.status(200).json({ message: 'Item deleted', item: obj });
        }).catch((err) => {
            console.error(err);
            res.status(500).json({ 'error' : true });
        })
    }

    static updateItem(req: express.Request, res: express.Response) {
        return products.put('products', Number(req.params.id), req.body).then(( obj ) => {
            if(obj['message'] === 'Bad data') res.status(400).json({ message: obj['message']});
            else res.status(200).json({ message: 'Item update', item: obj });
        }).catch((err) => {
            console.error(err);
            res.status(500).json({ 'error' : true });
        })
    }
}