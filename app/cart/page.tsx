
"use client";

import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { useShoppingCartContext } from "../context/ShoppingCartContext";
import { IProductItemProps } from "./../components/ProductItem";
import axios from "axios";

interface IDiscount {
  id: number;
  code: string;
  percenttage: number;
}

function Cart() {
  const { cartItems } = useShoppingCartContext();

  const [discountCode, setDiscountCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const [discountSuccess, setDiscountSuccess] = useState("");

  const [data, setData] = useState<IProductItemProps[]>([]);

  useEffect(() => {
    axios("http://localhost:3004/products").then((result) => {
      const { data } = result;

      setData(data);
    });
  }, []);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    const selectedProduct = data.find(
      (product) => product.id == item.id
      
    );
    

    return total + item.qty * (selectedProduct?.price || 0);
  }, 0);

  // Calculate discount amount
  const discountAmount =
    totalPrice * (discountPercentage / 100);

  // Calculate final price
  const finalPrice = totalPrice - discountAmount;

  const handleSubmitDiscount = async () => {
    if (!discountCode.trim()) {
      setDiscountError("Please enter a discount code.");
      setDiscountSuccess("");
      return;
    }

    try {
      const result = await axios.get(
        `http://localhost:3004/discount?code=${discountCode.trim()}`);

      const discounts: IDiscount[] = result.data;

      if (discounts.length == 0) {
        setDiscountPercentage(0);
        setDiscountError("Invalid discount code.");
        setDiscountSuccess("");
        return;
      }

      const discount = discounts[0];

      setDiscountPercentage(discount.percenttage);
      setDiscountError("");
      setDiscountSuccess(
        `${discount.percenttage}% discount applied successfully!`
      );
    } catch (error) {
      setDiscountPercentage(0);
      setDiscountError("Something went wrong. Please try again.");
      setDiscountSuccess("");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            Sasy Shop
          </span>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Shopping Cart
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Review your products and apply your discount code.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

          {/* Cart Items */}
          <div className="lg:col-span-8">

            {cartItems.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                  🛒
                </div>

                <h2 className="mt-5 text-xl font-bold text-slate-900">
                  Your cart is empty
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Add some products to your cart and come back here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    {...item}
                  />
                ))}
              </div>
            )}

          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50">

              {/* Summary Header */}
              <div className="border-b border-slate-100 p-6">
                <h2 className="text-xl font-black text-slate-900">
                  Order Summary
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Your order details
                </p>
              </div>

              <div className="p-6">

                {/* Total Price */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Total Price
                  </span>

                  <span className="font-bold text-slate-900">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Discount */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Discount
                  </span>

                  <span className="font-bold text-green-600">
                    -${discountAmount.toFixed(2)}
                  </span>
                </div>

                {/* Divider */}
                <div className="my-5 h-px bg-slate-100" />

                {/* Final Price */}
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-xs text-slate-400">
                      Final Price
                    </span>

                    <p className="mt-1 text-3xl font-black text-slate-900">
                      ${finalPrice.toFixed(2)}
                    </p>
                  </div>

                  {discountPercentage > 0 && (
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-600">
                      {discountPercentage}% OFF
                    </span>
                  )}
                </div>

                {/* Discount Code */}
                <div className="mt-7">

                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Discount Code
                  </label>

                  <div className="flex gap-2">

                    <input
                      value={discountCode}
                      onChange={(e) => {
                        setDiscountCode(e.target.value);
                        setDiscountError("");
                        setDiscountSuccess("");
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSubmitDiscount();
                        }
                      }}
                      className="h-11 min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      placeholder="e.g. OFF20"
                      type="text"
                    />

                    <button
                      onClick={handleSubmitDiscount}
                      className="h-11 rounded-xl bg-slate-900 px-4 text-sm font-bold text-white transition-all duration-300 hover:bg-blue-600 active:scale-95"
                    >
                      Apply
                    </button>

                  </div>

                  {/* Success Message */}
                  {discountSuccess && (
                    <div className="mt-3 flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2.5 text-xs font-medium text-green-600">
                      <span>✓</span>
                      <span>{discountSuccess}</span>
                    </div>
                  )}

                  {/* Error Message */}
                  {discountError && (
                    <div className="mt-3 flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-xs font-medium text-red-500">
                      <span>!</span>
                      <span>{discountError}</span>
                    </div>
                  )}

                </div>

                {/* Checkout */}
                <button
                  disabled={cartItems.length === 0}
                  className="mt-6 flex h-13 w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  Proceed to Checkout
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

export default Cart;
