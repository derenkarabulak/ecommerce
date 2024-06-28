import React from "react";
import { motion } from "framer-motion";
import "../../styles/product-card.css";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";
import { favActions } from "../../redux/slices/favSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase.config";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import useAuth from "../../custom-hooks/useAuth";
import { useTranslation } from "react-i18next";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [t] = useTranslation("global");

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        productName: item.productName,
        price: item.price,
        imgUrl: item.imgUrl,
      })
    );

    toast.success(t("productdetails.productadded"));
  };

  const addToFavs = async () => {
    dispatch(
      favActions.addItem({
        id: item.id,
        productName: item.productName,
        price: item.price,
        imgUrl: item.imgUrl,
      })
    );

    const favObj = {
      id: item.id,
      productName: item.productName,
      price: item.price,
      imgUrl: item.imgUrl,
    };

    try {
      const userDocRef = doc(db, "users", currentUser.uid);

      await updateDoc(userDocRef, {
        favorites: arrayUnion(favObj),
      });

      toast.success(t("productcard.productaddedfavs"));
    } catch (error) {
      console.error("Error adding to favorites: ", error);
      toast.error("Error adding product to favorites.");
      navigate("/login");
    }
  };

  return (
    <Col lg="3" md="4" className="mb-2">
      <div className="product__item">
        <div className="product__img">
          <motion.img
            onClick={() => {
              navigate(`/shop/${item.id}`);
            }}
            whileHover={{ scale: 0.9 }}
            src={item.imgUrl}
            alt=""
          />
        </div>
        <div className="p-2 product__info">
          <h3 className="product__name">
            <Link to={`/shop/${item.id}`}>{item.productName}</Link>
          </h3>
          <span>{item.category}</span>
        </div>
        <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
          <span className="price">${item.price}</span>
          <div>
            <motion.span
              className="inline-block"
              whileTap={{ scale: 1.2 }}
              onClick={addToCart}
            >
              <i className="ri-add-line"></i>
            </motion.span>
            <motion.span
              className="inline-block ml-2"
              whileTap={{ scale: 1.2 }}
              onClick={addToFavs}
            >
              <i className="ri-heart-fill"></i>
            </motion.span>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
