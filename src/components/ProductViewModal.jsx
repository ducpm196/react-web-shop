import React, { useRef, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import ProductView from "./ProductView";

import Button from "./Button";

import { remove } from "../redux/product-modal/productModalSlice";

import productData from "../assets/fake-data/products";

const ProductViewModal = () => {
  const menu_ref = useRef(null);
  const menu_content_ref = useRef(null);

  const productSlug = useSelector((state) => state.productModal.value);

  const dispatch = useDispatch();

  const [product, setProduct] = useState(undefined);

  useEffect(() => {
    setProduct(productData.getProductBySlug(productSlug));
  }, [productSlug]);

  const clickOutsideRef = (content_ref, outside_ref) => {
    document.addEventListener("click", (e) => {
      // user click outside toggle and content
      if (
        content_ref.current?.classList?.contains("active") &&
        !outside_ref.current?.contains(e.target)
      ) {
        dispatch(remove());
      }
    });
  };

  clickOutsideRef(menu_ref, menu_content_ref);

  return (
    <div
      ref={menu_ref}
      className={`product-view__modal ${product === undefined ? "" : "active"}`}
    >
      <div ref={menu_content_ref} className="product-view__modal__content">
        <ProductView product={product} />
        <div className="product-view__modal__content__close">
          <Button size="sm" onClick={() => dispatch(remove())}>
            đóng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;
