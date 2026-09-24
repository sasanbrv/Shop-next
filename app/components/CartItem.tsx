function CartItem() {
    return(
        <>
            <div className="grid grid-cols-12 bg-gray-300 m-2">
                <div className="col-span-9">
                    <h2>product name</h2>
                    <p>count: <span>2</span></p>
                    <p>price: <span>20</span></p>
                    <div>
                        <button className="p-2 bg-sky-400">+</button>
                        <span className="mx-3">3</span>
                        <button className="p-2 bg-sky-400">-</button>
                    </div>
                </div>
                <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png" alt="" className="col-span-3 w-32"/> 
            </div>
        </>
    )
}

export default CartItem