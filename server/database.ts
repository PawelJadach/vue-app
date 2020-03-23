var fs = require('fs');
var path = require('path');

var DB_FILE = path.join(__dirname, '../../database.json');

export interface IDatabaseProvider {
    get(table: string) : Promise<Object>;
    post(table: string, data: Object) : Promise<Object>;
    delete(table: string, id: Number) : Promise<Object>;
    put(table: string, id: Number, obj: Object) : Promise<Object>;
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

                if(obj.hasOwnProperty('name') && obj['name'].length > 0 && obj.hasOwnProperty('url') && obj['url'].length > 0 && obj.hasOwnProperty('prize') && obj['prize'].length > 0){
                    const newData = JSON.parse(data);
                    obj['id'] = newData[table].length + 1
                    newData[table].push(obj)
                    fs.writeFileSync('database.json', JSON.stringify(newData), (err) => {
                        if (err) throw err;
                        return resolve(obj || null);
                    })
                    return resolve(obj || null);
                    } 
                else return resolve({ message: 'Bad data'})   
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
                if(deletedItemIndex < 0) return resolve({ message: 'Not found'});
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

    public put(table: string, id: Number, obj: Object): Promise<Object> {
        return new Promise((resolve, reject) => {
           fs.readFile(DB_FILE, (err, data) => {
                if (err) {
                   reject(err);
                }

                if(obj.hasOwnProperty('name') && obj['name'].length > 0 && obj.hasOwnProperty('url') && obj['url'].length > 0 && obj.hasOwnProperty('prize') && obj['prize'].length > 0){
                    let newData = JSON.parse(data);
                    const editedItemIndex = newData[table].findIndex(product => product.id === id);
                    if(editedItemIndex < 0) return resolve({ message: 'Not found'});
                    newData[table][editedItemIndex] = obj;
                    newData[table][editedItemIndex]['id'] = id;
                    fs.writeFileSync('database.json', JSON.stringify(newData), (err) => {
                        if (err) throw err;
                    })
                    return resolve(newData[table][editedItemIndex])
                }
                else return resolve({ message: 'Bad data'})     
            });
        });
    }
}