
import { IDatabaseProvider } from '../../server/database';

export class MockDatabaseProvider implements IDatabaseProvider {
    public database: any = {};
    
    constructor(database: Object = {}) {
        this.database = database;
    }

    public get(table: string): Promise<Object> {
        return new Promise((resolve) => {
            return resolve(this.database[table] || null);
        });
    }

    public post(table: string, data: Object): Promise<Object> {
        return new Promise((resolve, reject) => {
            return resolve(Object || null);
        });
    }

    public delete(table: string, id: Number): Promise<Object> {
        return new Promise((resolve, reject) => {
            return resolve(Object || null);
        });
    }

    public put(table: string, id: Number, obj: Object): Promise<Object> {
        return new Promise((resolve, reject) => {
            return resolve(Object || null);
        });
    }
}