"use client";

import { useState } from "react";
import axios from "axios";

function Dashboard() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "success" | "error"
  >("success");

  const handleAddProduct = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !price ||
      !description.trim() ||
      
      !image.trim()
    ) {
      setMessage("Please fill in all fields.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const newProduct = {
        title: title.trim(),
        price: Number(price),
        description: description.trim(),
        
        image: image.trim(),
        rating: {
          rate: 0,
          count: 0,
        },
      };

      await axios.post(
        "http://localhost:3004/products",
        newProduct
      );

      setMessage("Product added successfully!");
      setMessageType("success");

      // Reset form
      setTitle("");
      setPrice("");
      setDescription("");
      setImage("");
    } catch (error) {
      console.log("Add product error:", error);

      setMessage("Could not add product.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
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

        {/* Form Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 sm:p-8">

          {/* Card Header */}
          <div className="mb-7">
            <h2 className="text-xl font-black text-slate-900">
              Add Product
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Enter the product information below.
            </p>
          </div>

          <form
            onSubmit={handleAddProduct}
            className="space-y-5"
          >

            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Product Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="Enter product title"
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* Price + Category */}
          

              {/* Price */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Price
                </label>

                <input
                  type="number"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                  placeholder="109.95"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>


            {/* Image */}
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Image URL
              </label>

              <input
                type="text"
                value={image}
                onChange={(e) =>
                  setImage(e.target.value)
                }
                placeholder="https://example.com/image.jpg"
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Enter product description..."
                rows={6}
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* Message */}
            {message && (
              <div
                className={`rounded-xl px-4 py-3 text-sm font-medium ${
                  messageType === "success"
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-500"
                }`}
              >
                {message}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Adding Product..."
                : "Add Product"}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;