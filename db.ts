import { DB } from "https://deno.land/x/sqlite/mod.ts";

export const db = new DB("queue.db");

db.execute(`
CREATE TABLE IF NOT EXISTS tracks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filename TEXT,
  path TEXT,
  size INTEGER,
  created_at TEXT
);
`)

async function addTrack(filePath: string) {
    const stat = await Deno.stat(filePath);
    const filename = filePath.split("/").pop();

    db.query(
        "INSERT INTO tracks (filename, path, size, created_at) VALUES (?, ?, ?, ?)",
        [
            filename,
            filePath,
            stat.size,
            new Date().toISOString()
        ]
    );
}

function close() {
    db.close();
}