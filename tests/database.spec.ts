import { test, expect } from '@playwright/test';
import Database from 'better-sqlite3';

test('UI + DB integration test', async ({ page }) => {
  const db = new Database('./foobar.db');

    db.exec('DROP TABLE IF EXISTS users');
  db.exec(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT
    )
  `);
  db.prepare('INSERT INTO users (name, email) VALUES (?, ?)').run('Alice', 'a@example.com');
  console.log('Database initialized');
  const result = db.prepare('SELECT * FROM users').all();
  console.log('Database query result:', result);

  db.close();


});
