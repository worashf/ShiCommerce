import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_SUCCESS,
  CLEAR_ERRORS,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_RESET,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
  NEW_REVIEW_FAIL,
  NEW_PRODUCT_REQUEST,NEW_PRODUCT_SUCCESS,NEW_PRODUCT_FAIL,NEW_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET, UPDATE_PRODUCT_RESET
} from "../constants/productConstants";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
    case ADMIN_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resPerPage: action.payload.resPerPage,
      };
    case ADMIN_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case ALL_PRODUCTS_FAIL:
    case ADMIN_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {

      case NEW_PRODUCT_REQUEST:
          return {
              ...state,
              loading: true
          }

      case NEW_PRODUCT_SUCCESS:
          return {
              loading: false,
              success: action.payload.success,
              product: action.payload.product
          }

      case NEW_PRODUCT_FAIL:
          return {
              ...state,
              error: action.payload
          }

      case NEW_PRODUCT_RESET:
          return {
              ...state,
              success: false
          }

      case CLEAR_ERRORS:
          return {
              ...state,
              error: null
          }

      default:
          return state
  }
}

export const productActionReducer = (state = {}, action) => {
  switch (action.type) {

      case DELETE_PRODUCT_REQUEST:
      case UPDATE_PRODUCT_REQUEST:
          return {
              ...state,
              loading: true
          }

      case DELETE_PRODUCT_SUCCESS:
          return {
              ...state,
              loading: false,
              isDeleted: action.payload
          }

      case UPDATE_PRODUCT_SUCCESS:
          return {
              ...state,
              loading: false,
              isUpdated: action.payload
          }


      case DELETE_PRODUCT_FAIL:
      case UPDATE_PRODUCT_FAIL:
          return {
              ...state,
              error: action.payload
          }

      case DELETE_PRODUCT_RESET:
          return {
              ...state,
              isDeleted: false
          }

      case UPDATE_PRODUCT_RESET:
          return {
              ...state,
              isUpdated: false
          }

      case CLEAR_ERRORS:
          return {
              ...state,
              error: null
          }

      default:
          return state
  }
}

export const productDetailReducer = (
  state = { productDetail: {} },
  { type, payload }
) => {
  switch (type) {
    case GET_PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        productDetail: payload,
      };
    case GET_PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const newReviewReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case NEW_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: payload,
      };
    case NEW_REVIEW_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
