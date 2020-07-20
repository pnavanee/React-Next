import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/layout";
import { Form, Button, Row, Col } from "react-bootstrap";
import {House} from 'react-bootstrap-icons';
import { END_POINT } from "../../constants";
import { withRouter } from 'next/router';
import Alert from '../../components/alert';
import {addProduct, editProduct} from '../../store/action';
import {bindActionCreators} from 'redux';
import { connect } from "react-redux";

class ProductEdit extends React.Component {
  constructor(props){
      super(props)
      this.state = {
           title : "",
           desc : "",
           isUpdated : false,
           message : ""
      }
  }
  static async getInitialProps({query}) {
    if(query.edit[0] === "edit") {
    const pid = query.edit[1];
    const res = await fetch(`${END_POINT}/products/${parseInt(pid)}`);
    const product = await res.json();
    return {
      product: product,
    };
  }
    return {product : {
       title : "",
       desc : ""
    }}
  }

  getProduct = () => {
    const {title, desc} = this.state;
       return {
          title : title,
          description : desc
       }
  }


  handleChange = (e) => {
       this.setState({
           [e.target.name] : e.target.value,
           isUpdated : true
       })
  }

  handleSubmit = async (isEdit) => {
     const { router, addProduct, editProduct } = this.props;
     const product = this.getProduct()
     const {query} = router;
     if (isEdit) {
       const pid = query.edit[1];
       editProduct(pid, product)
     } else {
       addProduct(product);
     }
  }

  componentDidMount(){
        const {product} = this.props;
        this.setState({
            title : product.title,
            desc : product.description
        })
  }


  render() {
    const { router, alertMessage} = this.props;
    const {message} = this.state;
    const {query} = router;
    const isEdit = query.edit[0] === "edit";
    const product = this.getProduct();
    const productTitle =  product.title;
    const productDesc = product.description;
    return (
      <div className="container">
        <Head>
          <title>Product Add</title>
        </Head>
        {alertMessage ? <Alert message={alertMessage}/> : null} 
        <h6 className="back-txt">
          <Link href="/">
              <House size={30} className="home-icon"/>
          </Link>
        </h6>
      <Row>
        <Col lg="6">
            <h3>{isEdit ? "Edit" : "Add"} {' '} {"Product"}</h3>
        </Col>
      </Row>
      <Row>
        <Col lg="6">
        <Form>
          <Form.Group controlId="formGroupTitle">
            <Form.Control as="input" name="title" type="text" value={productTitle} onChange={this.handleChange} placeholder="Title" />
          </Form.Group>
          <Form.Group controlId="formGroupDescription">
            <Form.Control as="input" name="desc" type="text" value={productDesc} onChange={this.handleChange} placeholder="Description" />
          </Form.Group>
          <Button variant="primary" onClick={()=>{this.handleSubmit(isEdit)}}>{isEdit ? "Edit" : "Add"}</Button>
        </Form>
        </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
     return {
          alertMessage : state.alertMessage
     }
}

const mapDispatchToProps = dispatch => {
     return {
         addProduct : bindActionCreators(addProduct, dispatch),
         editProduct : bindActionCreators(editProduct, dispatch)
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductEdit));
