import Head from "next/head";
import Link from "next/link";
import React, { Fragment,useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import {connect, useSelector, useDispatch} from 'react-redux';
import {getProducts, deleteProduct} from '../store/action';
import {END_POINT} from '../constants';
import {Trash, Pencil, PlusSquareFill} from 'react-bootstrap-icons';
import Alert from '../components/alert';
import {wrapper} from '../store';




const Home = (props) => {

     const [message, setMessage] = useState("")
     const dispatch = useDispatch();
     const {products, alertMessage} = useSelector(state => state);

    const removeProduct = async (pid) => {
         dispatch(deleteProduct(pid));
    }

    return (
      <div className="container">
        <Head>
          <title>Products</title>
        </Head>
        {alertMessage ? <Alert message={alertMessage}/> : null} 
        <Row>
         <Col lg="6">
          <h3>Products</h3>
          </Col> 
          <Col lg="6">
              <Link href="/product/[...edit]" as="/product/add">
                <Button variant="primary" className="add-prod-btn"><span>Add</span></Button>
              </Link>
          </Col>
        </Row>
        <Row>
          {products && products.map((prod, i) => {
            const prodDesc =
              prod.description.length > 100
                ? prod.description.substring(0, 100) + "..."
                : prod.description;
            return (
              <Col xl="3" key={i}>
                <Card className="prod-card">
                <Link href={`/product/${prod.id}`}> 
                  <Card.Body>
                    <Card.Title>{prod.title}</Card.Title>
                    <Card.Text>{prodDesc}</Card.Text>
                  </Card.Body>
                  </Link>
                  <Card.Footer>
                  <Link href="/product/[...edit]" as={`/product/edit/${prod.id}`}>
                    <Pencil className="edit-icon"/>
                  </Link>
                    <Trash onClick={()=>{removeProduct(prod.id)}}/>
                  </Card.Footer>   
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    )
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  const action = await getProducts();
  store.dispatch(action);
})


// Home.getInitialProps = async() => {
// const res = await fetch(`${END_POINT}/products`);
// const products = await res.json();
// return {
//     products : products
// }
// }

export default Home;
