import Link from "next/link";
import ProductItem from "../components/ProductItem";
import { IProductItemProps } from './../components/ProductItem';

async function Store() {

    const result = await fetch("http://localhost:3004/products")
    const data = await result.json() as IProductItemProps[]
    return ( 
    <div>
        
        <div className="grid grid-cols-4 gap-4">
        {data.map((item) => (
            <Link key={item.id} href={`/store/${item.id}`}>
                <ProductItem  {...item} />
            </Link>

            
        )) }
        </div>
    </div> );
}
 
export default Store;