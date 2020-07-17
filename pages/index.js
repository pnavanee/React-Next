import Head from "next/head";
import Link from "next/link";
import React, { Fragment,useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import {connect, useSelector} from 'react-redux';
import {getProducts} from '../store/action';
import {END_POINT} from '../constants';
import {bindActionCreators} from 'redux';
import {Trash, Pencil, PlusSquareFill} from 'react-bootstrap-icons';
import Alert from '../components/alert';
import {wrapper} from '../store';


export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  const action = await getProducts();
  store.dispatch(action);
})


const Home = (props) => {

  const deleteProduct = async (pid) => {
    await fetch(`${END_POINT}/products/${pid}`,{
       method : "DELETE"
    }).then( r => {
         setMessage("Product Delete Successfully");
         window.location.reload(true)
         setTimeout(()=>{
            setMessage("");
         }, 2000)
    })
}

     const [message, setMessage] = useState("")
     const {products} = useSelector(state => state);

    return (
      <div className="container">
        <Head>
          <title>Products</title>
        </Head>
        {message ? <Alert message={message}/> : null}
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

// Home.getInitialProps = async() => {
// const res = await fetch(`${END_POINT}/products`);
// const products = await res.json();
// return {
//     products : products
// }
// }

export default Home;
