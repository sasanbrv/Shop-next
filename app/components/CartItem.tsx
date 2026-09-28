
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { IProductItemProps } from "./ProductItem";

interface ICartItem {
  id: number;
  qty: number;
}

function CartItem({ id, qty }: ICartItem) {
  const [data, setData] = useState({} as IProductItemProps);

  useEffect(() => {
    axios(`http://localhost:3004/products/${id}`).then((result) => {
      const { data } = result;

      setData(data);
    });
  }, [id]);

  return (
    <div className="group m-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60">
      <div className="grid grid-cols-12 items-center">

        {/* Product Info */}
        <div className="col-span-8 p-5 sm:col-span-9">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">
            Sasy Shop
          </span>

          <h2 className="mt-1 line-clamp-1 text-base font-bold text-slate-900 transition-colors group-hover:text-blue-600 sm:text-lg">
            {data.title}
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            {/* Quantity */}
            <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2">
              <span className="text-xs font-medium text-slate-400">
                Qty
              </span>

              <span className="text-sm font-bold text-slate-800">
                {qty}
              </span>
            </div>

            {/* Price */}
            <div>
              <span className="text-xs text-slate-400">
                Price
              </span>

              <p className="text-lg font-black text-slate-900">
                ${data.price}
              </p>
            </div>
          </div>

          {/* Total */}
          <div className="mt-3">
            <span className="text-xs text-slate-400">
              Total
            </span>

            <span className="ml-2 text-sm font-bold text-blue-600">
              ${data.price * qty}
            </span>
          </div>
        </div>

        {/* Product Image */}
        <div className="col-span-4 flex h-36 items-center justify-center bg-slate-50 p-3 sm:col-span-3 sm:h-40">
          {data.image && (
            <img
              src={data.image}
              alt={data.title}
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CartItem;
