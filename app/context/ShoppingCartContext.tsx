"use client"
import { createContext, useContext, useState } from "react";


type ShoppingCartContextProviderProps={
    children : React.ReactNode
}

type CartItems = {
    id: number , 
    qty: number ,
}

type TShoppingCartItems = {
    cartItems : CartItems[]
    handleIncreaseProductQty : (id: number) => void
}
const ShoppingCartContext = createContext({} as TShoppingCartItems)


export const useShoppingCartContext = () => {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartContextProvider({children} : ShoppingCartContextProviderProps ){
    const [cartItems,setCartItems] = useState<CartItems[]>([])

    const handleIncreaseProductQty = (id: number ) =>{ 
        setCartItems(currentItems => {
            const isNotProductExist = currentItems.find(item => item.id == id) == null

            if(isNotProductExist){
                return [...currentItems , {id : id , qty : 1}]
            }
            else { 
                return currentItems.map(item => {
                    if(item.id == id){
                        return {
                            ...item,
                            qty: item.qty + 1 
                        }
                    } 
                    else{
                        return item
                    }
                })
            }
        })
    }

    return(
        <ShoppingCartContext.Provider value={{cartItems , handleIncreaseProductQty}} >
            {children}
        </ShoppingCartContext.Provider>
    )
}