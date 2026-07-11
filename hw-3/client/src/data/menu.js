// The menu now lives in MongoDB and is fetched from the API (see api.js + Menu.jsx).
// The seed data that used to live here moved to server/src/seed.js.

// quick money formatter, used all over
export const fmt = (n) => "$" + n.toFixed(2);
