import React, { useEffect, useState } from "react";
import "../styles/cart.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Col, Container, Row } from "reactstrap";
import { motion } from "framer-motion";
import useGetData from "../custom-hooks/useGetData";
import { toast } from "react-toastify";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../firebase.config";
import useAuth from "../custom-hooks/useAuth";
import { useTranslation } from "react-i18next";

const Favorites = () => {
  const { data: users } = useGetData("users");
  const [favs, setFavs] = useState([]);
  const { currentUser } = useAuth();
  const [t] = useTranslation("global");

  useEffect(() => {
    window.scroll(0, 0);
    if (currentUser) {
      for (let index = 0; index < users.length; index++) {
        if (users[index].uid === currentUser.uid) {
          setFavs(users[index].favorites);
        }
      }
    } else {
      setFavs(null);
    }
  }, [users, currentUser.uid]);

  const Tr = ({ item }) => {
    const deleteFav = async (item) => {
      try {
        const userDocRef = doc(db, "users", currentUser.uid);

        const favObj = {
          id: item.id,
          productName: item.productName,
          price: item.price,
          imgUrl: item.imgUrl,
        };

        await updateDoc(userDocRef, {
          favorites: arrayRemove(favObj),
        });

        setFavs((prevFavs) => prevFavs.filter((fav) => fav.id !== item.id));
        toast.success("Favorite deleted!");
      } catch (error) {
        console.error("Error deleting favorite: ", error);
        toast.error("Error deleting favorite.");
      }
    };

    return (
      <tr>
        <td>
          <img src={item.imgUrl} alt="" />
        </td>
        <td>{item.productName}</td>
        <td>${item.price}</td>
        <td>
          <motion.i
            whileTap={{ scale: 1.2 }}
            onClick={() => deleteFav(item)}
            className="ri-delete-bin-line"
          ></motion.i>
        </td>
      </tr>
    );
  };

  return (
    <Helmet title={t("favorites.favorites")}>
      <CommonSection title={t("favorites.favorites")} />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {favs.length === 0 ? (
                <h2 className="fs-4 text-center">{t("cart.noitem")}</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>{t("cart.image")}</th>
                      <th>{t("cart.title")}</th>
                      <th>{t("cart.price")}</th>
                      <th>{t("cart.delete")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {favs.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Favorites;
