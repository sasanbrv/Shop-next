

export interface IProductItemProps {
    id: number , 
    image: string,
    title: string,
    description : string,
    price:number ,
}

function ProductItem({image,title,price } : IProductItemProps) {
    return ( <>
        <div className=" shadow-md">
            <img src={image} alt="" width={300} height={300} />
            <div>
                <h3>{title}</h3>
                <p>price <span>{price}</span></p>

            </div>

        </div>
        
    </> );
}
 
export default ProductItem;