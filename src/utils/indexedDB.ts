export const openDB = (dbName: string, storeName: string, dbVersion: number): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBRequest).result as IDBDatabase;
            const storeExists = db.objectStoreNames.contains(storeName);

            if (!storeExists) {
                db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
            }
        };
        request.onsuccess = (event) => {
            const db = (event.target as IDBRequest).result as IDBDatabase;

            resolve(db);
        };
        request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
};
export const initializeDB = async (dbName: string, storeName: string, openDB: () => Promise<IDBDatabase>) => {
    try {
        const db = await openDB();
        const storeExists = db.objectStoreNames.contains(storeName);

        console.log(`Database "${dbName}" opened successfully!`);

        if (!storeExists) {
            console.warn(`Object store "${storeName}" not found.`);

            return false;
        }

        console.log(`Object store "${storeName}" found.`);

        return true;
    } catch (error) {
        console.error(`Error initializing database "${dbName}":`, error);

        return false;
    }
};
export const addItemToDB = async <T>(storeName: string, item: T, openDB: () => Promise<IDBDatabase>) => {
    const db = await openDB();

    return new Promise<IDBValidKey>((resolve, reject) => {
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);

        const request = store.add(item);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};
export const readItemsFromDB = async <T>(storeName: string, openDB: () => Promise<IDBDatabase>) => {
    const db = await openDB();

    return new Promise<T[]>((resolve, reject) => {
        const transaction = db.transaction(storeName, "readonly");
        const store = transaction.objectStore(storeName);

        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};
export const updateItemInDB = async <T>(storeName: string, item: T, openDB: () => Promise<IDBDatabase>) => {
    const db = await openDB();

    return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);

        const request = store.put(item);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};
export const deleteItemFromDB = async (storeName: string, itemID: IDBValidKey, openDB: () => Promise<IDBDatabase>) => {
    const db = await openDB();

    return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);

        const request = store.delete(itemID);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};
export const clearStore = async (storeName: string, openDB: () => Promise<IDBDatabase>) => {
    const db = await openDB();

    return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);

        const request = store.clear();

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};
export const getItemById = async <T>(storeName: string, key: IDBValidKey, openDB: () => Promise<IDBDatabase>) => {
    const db = await openDB();

    return new Promise<T | undefined>((resolve, reject) => {
        const transaction = db.transaction(storeName, "readonly");
        const store = transaction.objectStore(storeName);

        const request = store.get(key);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};
