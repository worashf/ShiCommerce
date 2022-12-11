import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Carousel, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  clearErrors,
  getProductdetails,
} from "../../redux/actions/productAction";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData"
import { toast } from "react-toastify";

const ProductDetail = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, productDetail } = useSelector(
    (state) => state.product
  );
  const { id } = useParams();

  const handleShowReviewRating = () => {
    setShow(true);
  };
  const handleShowReviewRatingClose = () => {
    setShow(false);
  };
  useEffect(() => {
    dispatch(getProductdetails(id));
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, []);
  return (
    <>

      {loading ? (
        <Loader />
      ) : (
          <>
                  <MetaData  title ={productDetail.name}/>
        <div className="row f-flex justify-content-around">
          <div className="col-12 col-lg-5 img-fluid" id="product_image">
            <Carousel pause="hover">
              {productDetail.images &&
                productDetail.images.map((image) => (
                  <Carousel.Item key={image.public_id}>
                    <img
                      className="d-block w-100"
                      src={image.url}
                      alt={productDetail.name}
                    />
                  </Carousel.Item>
                ))}
            </Carousel>
          </div>

          <div className="col-12 col-lg-5 mt-5">
            <h3>{productDetail.name}</h3>
            <p id="product_id">Product # {productDetail._id}</p>

            <hr />

            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(productDetail.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">
              ({productDetail.numOfReviews} Reviews)
            </span>

            <hr />

            <p id="product_price">{productDetail.price}</p>
            <div className="stockCounter d-inline">
              <span className="btn btn-danger minus">-</span>

              <input
                type="number"
                className="form-control count d-inline"
                value="1"
                readOnly
              />

              <span className="btn btn-primary plus">+</span>
            </div>
            <button
              type="button"
              id="cart_btn"
              className="btn btn-primary d-inline ml-4"
            >
              Add to Cart
            </button>

            <hr />

            <p>
              Status:{" "}
              <span
                id="stock_status"
                className={productDetail.stock > 0 ? "greenColor" : "redColor"}
              >
                {" "}
                {productDetail.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </p>

            <hr />

            <h4 className="mt-2">Description:</h4>
            <p>{productDetail.description}</p>
            <hr />
            <p id="product_seller mb-3">
              Sold by: <strong>Amazon</strong>
            </p>

            <button
              id="review_btn"
              type="button"
              className="btn btn-primary mt-4"
              onClick={handleShowReviewRating}
            >
              Submit Your Review
            </button>

            <div className="row mt-2 mb-5">
              <div className="rating w-50">
                <Modal
                  show={show}
                  onHide={handleShowReviewRatingClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Submit Review</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="modal-body">
                      <ul className="stars">
                        <li className="star">
                          <i className="fa fa-star"></i>
                        </li>
                        <li className="star">
                          <i className="fa fa-star"></i>
                        </li>
                        <li className="star">
                          <i className="fa fa-star"></i>
                        </li>
                        <li className="star">
                          <i className="fa fa-star"></i>
                        </li>
                        <li className="star">
                          <i className="fa fa-star"></i>
                        </li>
                      </ul>

                      <textarea
                        name="review"
                        id="review"
                        className="form-control mt-3"
                      ></textarea>

                      <button
                        className="btn my-3 float-right review-btn px-4 text-primary"
                 
                      >
                        Submit
                      </button>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
            </div>
            </>
      )}
    </>
  );
};

export default ProductDetail;
