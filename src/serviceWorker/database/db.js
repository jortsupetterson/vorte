const idb = new IDBDatabase();
const tx = idb.transaction("caches", "readwrite", { durability: "strict" });
const credentialStore = tx.objectStore("credentials");

const db = {
  credentialStore,
};
export default db;
