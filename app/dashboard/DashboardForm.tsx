"use client";

import { useState, type FormEvent } from "react";
import axios from "axios";

function Dashboard() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  const handleAddProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");

    if (
      !title.trim() ||
      !price ||
      !category.trim() ||
      !description.trim() ||
      !image.trim()
    ) {
      setMessage("Please fill in all fields.");
      setMessageType("error");
      return;
    }

    const numericPrice = Number(price);

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      setMessage("Please enter a valid price greater than zero.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/api/products", {
        title: title.trim(),
        price: numericPrice,
        category: category.trim(),
        description: description.trim(),
        image: image.trim(),
      });

      setMessage("Product added successfully!");
      setMessageType("success");

      setTitle("");
      setPrice("");
      setCategory("");
      setDescription("");
      setImage("");
    } catch (error) {
      console.error("Add product error:", error);

      if (axios.isAxiosError(error)) {
        setMessage(
          error.response?.data?.message ?? "Could not add product."
        );
      } else {
        setMessage("Could not add product.");
      }

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            Sasy Shop
          </span>

          <h1 className="mt-2 text-3xl font-black text-slate-900">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Add a new product to your store.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 sm:p-8">
          <div className="mb-7">
            <h2 className="text-xl font-black text-slate-900">
              Add Product
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Enter the product information below.
            </p>
          </div>

          <form onSubmit={handleAddProduct} className="space-y-5">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Product Title
              </label>

              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter product title"
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Price
              </label>

              <input
                id="price"
                type="number"
                min="0.01"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="109.95"
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Category
              </label>

              <input
                id="category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. electronics, clothing"
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label
                htmlFor="image"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Image URL
              </label>

              <input
                id="image"
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Description
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description..."
                rows={6}
                required
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {message && (
              <div
                role={messageType === "error" ? "alert" : "status"}
                className={`rounded-xl px-4 py-3 text-sm font-medium ${
                  messageType === "success"
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-500"
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;