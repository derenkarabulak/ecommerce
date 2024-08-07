import React, { useEffect, useState } from "react";
import "../styles/cart.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Col, Container, Row } from "reactstrap";
import { motion } from "framer-motion";
import { cartActions } from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const navigate = useNavigate();
  const [t] = useTranslation("global");

  return (
    <Helmet title={t("header.cart")}>
      <CommonSection title={t("header.cart")} />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItems.length === 0 ? (
                <h2 className="fs-4 text-center">{t("cart.noitem")}</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>{t("cart.image")}</th>
                      <th>{t("cart.title")}</th>
                      <th>{t("cart.price")}</th>
                      <th>{t("cart.qty")}</th>
                      <th>{t("cart.delete")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                  {t("cart.subtotal")}
                  <span className="fs-4 fw-bold">${totalAmount}</span>
                </h6>
              </div>
              <p className="fs-6 mt-2">{t("cart.taxes")}</p>
              <div>
                <button
                  onClick={() => navigate("/checkout")}
                  className="shop__btn w-100"
                >
                  <Link to="/checkout">{t("cart.checkout")}</Link>
                </button>
                <button
                  onClick={() => navigate("/shop")}
                  className="shop__btn w-100 mt-3"
                >
                  <Link to="/shop">{t("cart.continueshopping")}</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = ({ item }) => {
  const dispatch = useDispatch();

  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };
  return (
    <tr>
      <td>
        <img src={item.imgUrl} alt="" />
      </td>
      <td>{item.productName}</td>
      <td>{item.price}</td>
      <td>{item.quantity}</td>
      <td>
        <motion.i
          whileTap={{ scale: 1.2 }}
          onClick={deleteProduct}
          className="ri-delete-bin-line"
        ></motion.i>
      </td>
    </tr>
  );
};

export default Cart;
