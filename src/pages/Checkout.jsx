import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/checkout.css";
import { useSelector } from "react-redux";
import { db } from "../firebase.config";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuth from "../custom-hooks/useAuth";
import { useTranslation } from "react-i18next";

const Checkout = () => {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const { currentUser } = useAuth();

  const [orderName, setOrderName] = useState("");
  const [orderEmail, setOrderEmail] = useState("");
  const [orderPhoneNumber, setOrderPhoneNumber] = useState("");
  const [orderAddress, setOrderAddress] = useState("");
  const [orderCity, setOrderCity] = useState("");
  const [orderPostalCode, setOrderPostalCode] = useState("");
  const [orderCountry, setOrderCountry] = useState("");
  const [t] = useTranslation("global");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const orderObj = {
      userId: currentUser.uid,
      name: orderName,
      email: orderEmail,
      phone: orderPhoneNumber,
      address: orderAddress,
      city: orderCity,
      postalcode: orderPostalCode,
      country: orderCountry,
      totalAmount: totalAmount,
      totalQty: totalQty,
    };

    if (
      orderObj.userId &&
      orderObj.name &&
      orderObj.email &&
      orderObj.phone &&
      orderObj.address &&
      orderObj.city &&
      orderObj.postalcode &&
      orderObj.country &&
      orderObj.totalAmount &&
      orderObj.totalQty !== ""
    ) {
      console.log(orderObj);
      const docRef = collection(db, "orders");
      await addDoc(docRef, orderObj);

      toast.success(t("checkout.orderplaced"));
      navigate("/home");
      window.location.reload();
    } else {
      toast.error(t("checkout.fillblanks"));
    }
  };

  return (
    <Helmet title={t("cart.checkout")}>
      <CommonSection title={t("cart.checkout")} />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">{t("checkout.billing")}</h6>
              <Form className="billing__form" onSubmit={submitHandler}>
                <FormGroup className="form__group">
                  <input
                    required
                    type="text"
                    placeholder={t("checkout.name")}
                    value={orderName}
                    onChange={(e) => setOrderName(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    required
                    type="email"
                    placeholder={t("checkout.email")}
                    value={orderEmail}
                    onChange={(e) => setOrderEmail(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    required
                    type="number"
                    placeholder={t("checkout.phone")}
                    value={orderPhoneNumber}
                    onChange={(e) => setOrderPhoneNumber(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    required
                    type="text"
                    placeholder={t("checkout.address")}
                    value={orderAddress}
                    onChange={(e) => setOrderAddress(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    required
                    type="text"
                    placeholder={t("checkout.city")}
                    value={orderCity}
                    onChange={(e) => setOrderCity(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    required
                    type="text"
                    placeholder={t("checkout.postal")}
                    value={orderPostalCode}
                    onChange={(e) => setOrderPostalCode(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    required
                    type="text"
                    placeholder={t("checkout.country")}
                    value={orderCountry}
                    onChange={(e) => setOrderCountry(e.target.value)}
                  />
                </FormGroup>
              </Form>
            </Col>
            <Col lg="4">
              <div className="checkout__cart">
                <h6>
                  {t("checkout.totalquantity")}:{" "}
                  <span>
                    {totalQty} {t("checkout.items")}
                  </span>
                </h6>
                <h6>
                  {t("cart.subtotal")}: <span>${totalAmount}</span>
                </h6>
                <h6>
                  <span>
                    {t("checkout.shipping")}: <br />
                    {t("checkout.freeshipping")}
                  </span>
                  <span>$0</span>
                </h6>
                <h6>{t("checkout.freeshipping")}</h6>
                <h4>
                  {t("checkout.totalcost")}: <span>${totalAmount}</span>
                </h4>
                <button
                  onClick={submitHandler}
                  className="shop__btn auth__btn w-100 "
                >
                  {t("checkout.placeorder")}
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
