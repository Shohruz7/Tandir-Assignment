import { Router } from "express";
import Order from "../models/Order.js";

const router = Router();

// GET /api/orders  -> newest first
router.get("/", async (_req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/orders/:id
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/orders  -> create from a checkout payload
// subtotal is recomputed here so we never trust the client's total
router.post("/", async (req, res) => {
  try {
    const { items, customer } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Order must contain at least one item" });
    }

    const cleanItems = items.map((i) => ({
      name: i.name,
      price: Number(i.price),
      qty: Number(i.qty),
    }));
    const subtotal = cleanItems.reduce((sum, i) => sum + i.price * i.qty, 0);

    const order = await Order.create({ items: cleanItems, subtotal, customer });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/orders/:id  -> update (e.g. status)
router.put("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/orders/:id
router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ deleted: true, id: req.params.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
