import Head from "next/head";
import Link from "next/link";
import React, { Fragment,useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import {connect, useDispatch, useSelector} from 'react-redux';
import {getProducts} from '../store/action';
import {END_POINT} from '../constants';
import {bindActionCreators} from 'redux';
import {Trash, Pencil} from 'react-bootstrap-icons';
import {wrapper} from '../store';


const deleteProduct = async (pid) => {
    await fetch(`${END_POINT}/products/${pid}`,{
       method : "DELETE"
    }).then( r => {
         alert("product deleted")
    })
}

const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const products = useSelector(state => state.products);

    return (
      <div className="container">
        <Head>
          <title>Products</title>
        </Head>
        <Row>
         <Col lg="6">
          <h3>Products</h3>
          </Col> 
          <Col lg="6">
              <Link href="/product/[...edit]" as="/product/add">
                <Button variant="primary" className="add-prod-btn">Add Product</Button>
              </Link>
          </Col>
        </Row>
        <Row>
          {products.map((prod, i) => {
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
                    <Pencil/>
                  </Link>
                    <Trash onClick={()=>{deleteProduct(prod.id)}}/>
                  </Card.Footer>   
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    )
}

export default Home;
