function ProductCard(props: {
  imgURL: string;
  productTitle: string;
  productContent: string;
}) {
  return (
    <>
      <div className="product w-[200px] m-2 h-fit">
        <div className="product-img-container">
          <img className="rounded-lg" src={props.imgURL} />
        </div>
        <h3 className="product-title text-xl">{props.productTitle}</h3>
        <p className="product-content text-sm">{props.productContent}</p>
      </div>
    </>
  );
}

export default ProductCard;
