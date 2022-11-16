import { v4 as uuidv4 } from 'uuid';

export type Task = {
    id: string,
    title: string,
    description: string,
    completed?: boolean
}

export type ItemList = Task[];

export class Storage {
    private static storage: Storage;
    private _storage = localStorage;
    private STORAGE_KEY = 'tasks';
    private constructor() {
    }
    get(id: string) {
        const items: ItemList = this.getAll();
        return items.find((item) => item.id === id);
    }

    getAll(): ItemList {
        const items: ItemList = JSON.parse(this._storage.getItem(this.STORAGE_KEY) || "[]");
        return items;
    }

    delete(id: string) {
        const items = this.getAll();
        const index = items.findIndex((item) => item.id === id)
        items.splice(index, 1);
        this._storage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    }

    add(task: Partial<Task>) {
        const items: ItemList = this.getAll();
        task = { ...task, id: uuidv4() };
        items.push(task as Task);
        this._storage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    }

    update(task: Task) {
        const items = this.getAll();
        const index = items.findIndex((item) => item.id === task.id);
        items.splice(index, 1, task);
        this._storage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    }

    public static getInstance() {
        if (!Storage.storage) {
            Storage.storage = new Storage();
        }
        return Storage.storage;
    }
}