var fs = require('fs');
var path = require('path');

var DB_FILE = path.join(__dirname, '../../database.json');

export interface IDatabaseProvider {
    get(table: string) : Promise<Object>;
    post(table: string, data: Object) : Promise<Object>;
    delete(table: string, id: Number) : Promise<Object>;
}

export class DatabaseProvider implements IDatabaseProvider {

    constructor() {}

    public get(table: string): Promise<Object> {
        return new Promise((resolve, reject) => {
           fs.readFile(DB_FILE, (err, data) => {
                if (err) {
                   reject(err);
                }
                return resolve(JSON.parse(data)[table] || null);
            });
        });
    }

    public post(table: string, obj: Object): Promise<Object> {
        return new Promise((resolve, reject) => {
           fs.readFile(DB_FILE, (err, data) => {
                if (err) {
                   reject(err);
                }
                const newData = JSON.parse(data);
                obj['id'] = newData[table].length + 1
                newData[table].push(obj)
                fs.writeFileSync('database.json', JSON.stringify(newData), (err) => {
                      if (err) throw err;
                      return resolve(obj || null);
                  })
                  return resolve(obj || null);
            });
        });
    }

    public delete(table: string, id: Number): Promise<Object> {
        return new Promise((resolve, reject) => {
           fs.readFile(DB_FILE, (err, data) => {
                if (err) {
                   reject(err);
                }
                const newData = JSON.parse(data);
                const deletedItemIndex = newData[table].findIndex(product => product.id === id);
                const deletedItem = newData[table][deletedItemIndex];
                newData[table].splice(deletedItemIndex, 1);
                fs.writeFileSync('database.json', JSON.stringify(newData), (err) => {
                      if (err) throw err;
                      return resolve(deletedItem || null);
                  })
                  return resolve(deletedItem || null);
            });
        });
    }
}