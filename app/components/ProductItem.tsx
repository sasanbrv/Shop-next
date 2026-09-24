

export interface IProductItemProps {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
}

function ProductItem({
  image,
  title,
  description,
  price,
}: IProductItemProps) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-500/10">
      
      {/* Product Image */}
      <div className="relative flex h-64 items-center justify-center overflow-hidden bg-slate-50 p-6">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />

        {/* Sale Badge */}
        <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white shadow-lg shadow-blue-500/20">
          New
        </span>

        {/* Favorite */}
        <button
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow-md backdrop-blur transition-all duration-300 hover:scale-110 hover:text-red-500"
          aria-label="Add to favorites"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0 5.25-9 10.5-9 10.5S3 13.5 3 8.25A4.5 4.5 0 0 1 12 6.47a4.5 4.5 0 0 1 9 1.78Z"
            />
          </svg>
        </button>
      </div>

      {/* Product Content */}
      <div className="p-5">
        <h3 className="mb-2 line-clamp-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600">
          {title}
        </h3>

        <p className="mb-5 line-clamp-2 min-h-12 text-sm leading-6 text-slate-500">
          {description}
        </p>

        {/* Price + Cart */}
        <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div>
            <span className="text-xs font-medium text-slate-400">
              Price
            </span>

            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900">
                ${price}
              </span>
            </div>
          </div>

          <button
            className="flex h-11 items-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-bold text-white transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437m0 0L6.75 15.75h10.5l2.25-8.25H5.106ZM6.75 15.75l-.75 2.25h12.75"
              />
            </svg>

            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
