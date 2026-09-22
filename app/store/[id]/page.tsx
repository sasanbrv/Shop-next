import { IProductItemProps } from "@/app/components/ProductItem";

interface IProductProps {
    params: Promise<{id: string}>,
    searchParams: Promise<object> , 
}

async function Product({params} : IProductProps) {

    const {id} = await params

    const result = await fetch(`http://localhost:3004/products/${id}`)
    const data = await result.json() as IProductItemProps

    return ( <>
    <div className="grid grid-cols-12 shadow-md">
        <div className="col-span-9">
            <h2>{data.title}</h2>
            <p>{data.description}</p>
            <p>price: <span>{data.price}</span></p>
            <div>
                <button className="p-2 bg-sky-400">+</button>
                <span className="mx-3">3</span>
                <button className="p-2 bg-sky-400">-</button>
            </div>
        </div>
        <div className="col-span-3">
            <img src={data.image} alt="" />
        </div>
    </div>
    </> );
}
 
export default Product;