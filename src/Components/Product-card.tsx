function ProductCard(props: {
  imgURL: string;
  productTitle: string;
  productContent: string;
}) {
  return (
    <>
      <div className="product">
        <div className="product-img-container">
          <img src={props.imgURL} />
        </div>
        <h3 className="product-title text-3xl">{props.productTitle}</h3>
        <p className="product-content text-sm">{props.productContent}</p>
      </div>
    </>
  );
}

export default ProductCard;
