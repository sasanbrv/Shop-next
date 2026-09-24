"use client"

import {useShoppingCartContext } from "../context/ShoppingCartContext";

interface IAddToCart {
    id : string
}

function AddToCart({id} : IAddToCart) {

    const {cartItems , handleIncreaseProductQty} = useShoppingCartContext()

    console.log(cartItems)
    return ( <>
        <div className="flex w-fit items-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">

                  <button
                    className="flex h-10 w-10 items-center justify-center text-lg font-bold text-slate-600 transition hover:bg-blue-600 hover:text-white"
                  >
                    −
                  </button>

                  <span className="flex h-10 min-w-12 items-center justify-center border-x border-slate-200 bg-white text-sm font-bold text-slate-900">
                    {cartItems.find((item) => item.id === parseInt(id))?.qty ?? 0}
                  </span>

                  <button
                  onClick={()=>handleIncreaseProductQty(parseInt(id))}
                    className="flex h-10 w-10 items-center justify-center text-lg font-bold text-slate-600 transition hover:bg-blue-600 hover:text-white"
                  >
                    +
                  </button>

        </div>
    </> );
}
 
export default AddToCart;