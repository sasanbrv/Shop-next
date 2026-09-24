import CartItem from "../components/CartItem";

function Cart(){
    return ( 
        <>
        <div className=" container mx-auto">
            <div>
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
            </div>
            <div>
                <h3>total price : <span>43</span></h3>
                <h3>takhfif : <span>43</span></h3>
                <h3>final price : <span>43</span></h3>
                <div>
                    <button className="cursor-pointer px-2 rounded bg-sky-500">submit</button>
                    <input className="border border-1 rounded-lg mx-3" placeholder="input your code ... " type="text"></input>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default Cart