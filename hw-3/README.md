# Tandir — Assignment 3 (React + Express + MongoDB)

The Tandir restaurant site from Homework 2, now backed by a real REST API. The menu is
served from MongoDB (not hardcoded in the frontend) and placed orders are saved to the
database. One Express process serves both the API and the built React app.

```
hw-3/
├── client/          # React + Vite frontend (fetches the menu, posts orders)
├── server/          # Express + Mongoose REST API + static host for the build
└── package.json     # root scripts: dev / build / start / seed
```

## Stack
- **Frontend:** React 19, Vite, Tailwind v4
- **Backend:** Node.js, Express 4, Mongoose 8
- **Database:** MongoDB (Atlas in the cloud)

---

## 1. Local setup

**Prerequisites:** Node 18+, and a MongoDB connection string (a free
[MongoDB Atlas](https://www.mongodb.com/atlas) M0 cluster works great).

```bash
cd hw-3
npm run install:all                 # installs root, client, and server deps
cp server/.env.example server/.env  # then paste your MONGODB_URI into server/.env
npm run seed                        # loads the 15 menu items into MongoDB
npm run dev                         # client on :5173, API on :5001
```

Open http://localhost:5173. The menu is fetched from `GET /api/menu`; checkout sends the
cart to `POST /api/orders`.

`server/.env`:
```
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/tandir?retryWrites=true&w=majority
PORT=5001
```

---

## 2. REST API

Base URL: `/api` (proxied to `http://localhost:5001` in dev).

| Method | Path              | Purpose                                  |
| ------ | ----------------- | ---------------------------------------- |
| GET    | `/api/menu`       | List all menu items                      |
| POST   | `/api/menu`       | Create a menu item                       |
| PUT    | `/api/menu/:id`   | Update a menu item                       |
| DELETE | `/api/menu/:id`   | Delete a menu item                       |
| GET    | `/api/orders`     | List orders (newest first)               |
| GET    | `/api/orders/:id` | Get one order                            |
| POST   | `/api/orders`     | Place an order (subtotal computed server-side) |
| PUT    | `/api/orders/:id` | Update an order (e.g. `status`)          |
| DELETE | `/api/orders/:id` | Delete an order                          |

---

## 3. CRUD demo commands (for the required video)

Record these side-by-side with MongoDB Compass / the Atlas "Browse Collections" view so
each database change is visible in real time. Replace `$BASE` with `http://localhost:5001`
locally or your hosted URL.

```bash
BASE=http://localhost:5001

# READ — the frontend does this on load
curl $BASE/api/menu

# CREATE (menu) — a new dish appears in the `menuitems` collection
curl -X POST $BASE/api/menu -H "Content-Type: application/json" \
  -d '{"name":"Norin","desc":"Cold hand-cut noodles with horse meat.","price":18,"category":"mains"}'

# CREATE (order) — also happens when you click Checkout in the app
curl -X POST $BASE/api/orders -H "Content-Type: application/json" \
  -d '{"items":[{"name":"Osh (Plov)","price":22,"qty":2}]}'

# UPDATE (menu) — change a price; watch the document update live
curl -X PUT $BASE/api/menu/<ITEM_ID> -H "Content-Type: application/json" \
  -d '{"price":25}'

# UPDATE (order) — advance the order status
curl -X PUT $BASE/api/orders/<ORDER_ID> -H "Content-Type: application/json" \
  -d '{"status":"confirmed"}'

# DELETE — the document disappears from the collection
curl -X DELETE $BASE/api/menu/<ITEM_ID>
curl -X DELETE $BASE/api/orders/<ORDER_ID>
```

Grab an `_id` from the output of `curl $BASE/api/menu` or `curl $BASE/api/orders`.

---

## 4. Deploy (single service on Render + Atlas)

**MongoDB Atlas:** create a free M0 cluster, add a database user, allow network access from
`0.0.0.0/0`, and copy the SRV connection string.

**Render** → New → Web Service, connected to this repo:
- **Root Directory:** `hw-3`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Environment variables:**
  - `MONGODB_URI` = your Atlas connection string
  - `NODE_ENV` = `production`

  (Render provides `PORT` automatically.)

After the first deploy, seed the cloud database once — either run `npm run seed` locally
with `server/.env` pointing at Atlas, or use the Render shell. Your submission URL is the
Render service URL, which serves the full app and the API from the same origin.

---

## Notes
- `hw-2/` (the original static version) is left untouched; this folder is the Assignment 3 deliverable.
- Order subtotals are recomputed on the server so the client can't spoof the total.
- `server/.env` is git-ignored — never commit your real connection string.
