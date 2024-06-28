import React from "react";
import { Container, Row, Col } from "reactstrap";
import useGetData from "../custom-hooks/useGetData";

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

const Orders = () => {
  const { data: orders, loading } = useGetData("orders");
  console.log(orders);

  const deleteOrder = async (id) => {
    await deleteDoc(doc(db, "orders", id));
    toast.success("Order deleted!");
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="fw-bold">Orders</h4>
          </Col>
          <Col lg="12" className="pt-5">
            <table className="table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
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
                    <td>
                      <h5 className="pt-5 fw-bold">Loading...</h5>
                    </td>
                  </tr>
                ) : (
                  orders.map((order, index) => (
                    <tr key={order.id}>
                      <td key={index}>{order.userId}</td>
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
  );
};

export default Orders;
