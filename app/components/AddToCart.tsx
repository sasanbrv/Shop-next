
"use client";

import { useShoppingCartContext } from "../context/ShoppingCartContext";

interface IAddToCart {
  id: string;
}

function AddToCart({ id }: IAddToCart) {
  const {
    cartItems,
    handleIncreaseProductQty,
    handleDecreaseProductQty,
  } = useShoppingCartContext();

  const currentItem = cartItems.find((item) => item.id === id);
  const quantity = currentItem?.qty ?? 0;

  return (
    <>
      <div className="flex w-fit items-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
        <button
          type="button"
          onClick={() => handleDecreaseProductQty(id)}
          disabled={quantity === 0}
          aria-label="Decrease quantity"
          className="flex h-10 w-10 items-center justify-center text-lg font-bold text-slate-600 transition hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          −
        </button>

        <span className="flex h-10 min-w-12 items-center justify-center border-x border-slate-200 bg-white text-sm font-bold text-slate-900">
          {quantity}
        </span>

        <button
          type="button"
          onClick={() => handleIncreaseProductQty(id)}
          aria-label="Increase quantity"
          className="flex h-10 w-10 items-center justify-center text-lg font-bold text-slate-600 transition hover:bg-blue-600 hover:text-white"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={() => handleIncreaseProductQty(id)}
        className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/25 active:translate-y-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437m0 0L6.75 15.75h10.5l2.25-8.25H5.106ZM6.75 15.75l-.75 2.25h12.75"
          />
        </svg>

        Add to Cart
      </button>
    </>
  );
}

export default AddToCart;
