// storage.js - IndexedDBを活用した写真と編集データの自動永続化モジュール

const AppStorage = {
  dbName: 'DaycareReportDB_v2',
  storeName: 'appState',
  db: null,

  /**
   * IndexedDBの初期化
   */
  async init() {
    if (this.db) return this.db;
    return new Promise((resolve) => {
      try {
        const request = indexedDB.open(this.dbName, 1);
        request.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(this.storeName)) {
            db.createObjectStore(this.storeName);
          }
        };
        request.onsuccess = (e) => {
          this.db = e.target.result;
          resolve(this.db);
        };
        request.onerror = (e) => {
          console.error('IndexedDB初期化エラー:', e);
          resolve(null);
        };
      } catch (err) {
        console.error('IndexedDB非対応またはエラー:', err);
        resolve(null);
      }
    });
  },

  /**
   * 編集状態を自動保存
   * @param {Object} state 保存するアプリケーション状態
   */
  async saveState(state) {
    if (!this.db) await this.init();
    if (!this.db) return false;

    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction([this.storeName], 'readwrite');
        const store = tx.objectStore(this.storeName);
        
        // 保存するデータオブジェクトを作成（循環参照なし）
        const dataToSave = {
          formType: state.formType || 'form1',
          className: state.className || 'ぱんだ',
          dateString: state.dateString || '',
          photos: state.photos || [],
          comment: state.comment || '',
          layoutStyle: state.layoutStyle || 'balanced',
          updatedAt: Date.now()
        };

        store.put(dataToSave, 'currentState');
        tx.oncomplete = () => resolve(true);
        tx.onerror = (e) => {
          console.error('State保存エラー:', e);
          resolve(false);
        };
      } catch (err) {
        console.error('保存処理例外:', err);
        resolve(false);
      }
    });
  },

  /**
   * 前回保存した状態を復元
   * @returns {Object|null} 復元された状態
   */
  async loadState() {
    if (!this.db) await this.init();
    if (!this.db) return null;

    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction([this.storeName], 'readonly');
        const store = tx.objectStore(this.storeName);
        const req = store.get('currentState');
        req.onsuccess = () => {
          resolve(req.result || null);
        };
        req.onerror = () => {
          resolve(null);
        };
      } catch (err) {
        console.error('復元処理例外:', err);
        resolve(null);
      }
    });
  },

  /**
   * データを全消去（ゴミ箱ボタン押下時のみ実行）
   */
  async clearState() {
    if (!this.db) await this.init();
    if (!this.db) return;

    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction([this.storeName], 'readwrite');
        const store = tx.objectStore(this.storeName);
        store.delete('currentState');
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      } catch (err) {
        console.error('クリア例外:', err);
        resolve(false);
      }
    });
  }
};

window.AppStorage = AppStorage;
