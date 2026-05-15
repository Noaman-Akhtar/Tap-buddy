import * as SQLite from 'expo-sqlite';

export async function initDatabase() {
  const db = await SQLite.openDatabaseAsync('tapbuddy.db');

  // Create tables if they don't exist
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY NOT NULL,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      time TEXT NOT NULL,
      sync_status INTEGER DEFAULT 1
    );
    CREATE TABLE IF NOT EXISTS activities (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      status TEXT NOT NULL,
      progress INTEGER DEFAULT 0
    );
  `);
  
  return db;
}

export async function saveMessage(db: SQLite.SQLiteDatabase, msg: { id: string, role: string, content: string, time: string }) {
  await db.runAsync(
    'INSERT INTO messages (id, role, content, time) VALUES (?, ?, ?, ?)',
    [msg.id, msg.role, msg.content, msg.time]
  );
}

export async function getMessages(db: SQLite.SQLiteDatabase) {
  return await db.getAllAsync('SELECT * FROM messages ORDER BY id ASC');
}
