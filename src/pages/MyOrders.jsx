import React, { useEffect, useState } from "react";
import useGetData from "../custom-hooks/useGetData";
import useAuth from "../custom-hooks/useAuth";
import { Col, Container, Row } from "reactstrap";
import { db } from "../firebase.config";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { useTranslation } from "react-i18next";

const MyOrders = () => {
  const { currentUser } = useAuth();
  const [myOrders, setMyOrders] = useState([]);
  const { data: orders, loading } = useGetData("orders");
  const [t] = useTranslation("global");

  useEffect(() => {
    const filteredOrders = orders.filter(
      (item) => item.userId === currentUser.uid
    );
    setMyOrders(filteredOrders);
  }, [orders, currentUser.uid]);

  const deleteOrder = async (id) => {
    await deleteDoc(doc(db, "orders", id));
    toast.success("Order deleted!");
  };

  return (
    <Helmet title={"My Orders"}>
      <CommonSection title={"My Orders"} />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <h4 className="fw-bold">My Orders</h4>
            </Col>
            <Col lg="12" className="pt-5">
              <table className="table">
                <thead>
                  <tr>
                    <th>{t("checkout.name")}</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Country</th>
                    <th>City</th>
                    <th>Postal Code</th>
                    <th>Total Amount</th>
                    <th>Total Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="10" className="text-center">
                        <h5 className="pt-5 fw-bold">Loading...</h5>
                      </td>
                    </tr>
                  ) : myOrders.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="text-center">
                        <h1 className="fs-4">No Orders are found!</h1>
                      </td>
                    </tr>
                  ) : (
                    myOrders.map((order, index) => (
                      <tr key={order.id}>
                        <td>{order.name}</td>
                        <td>{order.email}</td>
                        <td>{order.phone}</td>
                        <td>{order.address}</td>
                        <td>{order.country}</td>
                        <td>{order.city}</td>
                        <td>{order.postalcode}</td>
                        <td>{order.totalAmount}</td>
                        <td>{order.totalQty}</td>
                        <td>
                          <button
                            onClick={() => deleteOrder(order.id)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default MyOrders;
