import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/layout";
import { Form, Button, Row, Col } from "react-bootstrap";
import {House} from 'react-bootstrap-icons';
import { END_POINT } from "../../constants";
import { withRouter } from 'next/router';
import Alert from '../../components/alert';
import {addProduct, editProduct,getProduct} from '../../store/action';
import {bindActionCreators} from 'redux';
import { connect } from "react-redux";

class ProductEdit extends React.Component {
  constructor(props){
      super(props)
      this.state = {
           title : "",
           desc : "",
           isUpdated : false,
           message : "",
           errors : {}
      }
  }
  static async getInitialProps({query, store}) {
    if(query.edit[0] === "edit") {
    const pid = query.edit[1];
    const action = await getProduct(pid);
    store.dispatch(action);
  }
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

  validateForm = () => {
      const {title, desc} = this.state;
      let errors = {};
      if(!title || (title && !(title.trim()))){
          errors["title"] = "Product title is required"
      }
      if(!desc || (desc && !(desc.trim()))){
          errors["desc"] = "Product description is required"
      }
      this.setState({errors});
      return errors;
  }

  handleSubmit = async (isEdit) => {
     const { router, addProduct, editProduct } = this.props;
     const product = this.getProduct()
     const {query} = router;
     const errors = this.validateForm();
     if(Object.keys(errors).length === 0) {
     if (isEdit) {
       const pid = query.edit[1];
       editProduct(pid, product)
     } else {
       addProduct(product);
     }
    }
  }

  componentDidMount(){
        const {product} = this.props;
        this.setState({
            title : product.title,
            desc : product.description
        })
  }

  componentDidUpdate(prevProps){
      const {product} = this.props;
      if(prevProps.product !== product && Object.keys(product).length === 0){
           this.setState({
              title : "",
              desc : ""
           })
      }
  }


  render() {
    const { router, alertMessage} = this.props;
    const {errors} = this.state;
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
        <Form className="product-form"> 
          <Form.Group controlId="formGroupTitle">
            <Form.Control as="input" name="title" type="text" value={productTitle} onChange={this.handleChange} placeholder="Title" required/>
            <Form.Text className="text-error">
                {errors.title}
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formGroupDescription">
            <Form.Control as="input" name="desc" type="text" value={productDesc} onChange={this.handleChange} placeholder="Description" required/>
            <Form.Text className="text-error">
                {errors.desc}
            </Form.Text>
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
          alertMessage : state.alertMessage,
          product : state.product
     }
}

const mapDispatchToProps = dispatch => {
     return {
         addProduct : bindActionCreators(addProduct, dispatch),
         editProduct : bindActionCreators(editProduct, dispatch)
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductEdit));
