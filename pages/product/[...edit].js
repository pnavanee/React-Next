import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/layout";
import { Form, Button } from "react-bootstrap";
import { END_POINT } from "../../constants";
import { withRouter } from 'next/router'

class ProductEdit extends React.Component {
  constructor(props){
      super(props)
      this.state = {
           title : "",
           desc : "",
           isUpdated : false
      }
  }
  static async getInitialProps({ query }) {
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
    const {isUpdated, title, desc} = this.state;
    const {product} = this.props;
       return {
          title : isUpdated && title ? title : product.title,
          description : isUpdated && desc ? desc : product.description
       }
  }


  handleChange = (e) => {
       this.setState({
           [e.target.name] : e.target.value,
           isUpdated : true
       })
  }

  handleSubmit = async (isEdit) => {
     const { router } = this.props;
     const product = this.getProduct()
     const {query} = router;
     if (isEdit) {
       const pid = query.edit[1];
       fetch(`${END_POINT}/products/${pid}`, {
         method: "PUT",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(product),
       }).then((r) => {
         alert("product edited");
         console.log(r);
       });
     } else {
       fetch(`${END_POINT}/products`, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(product),
       }).then((r) => {
         alert("product added");
         console.log(r);
       });
     }
  }


  render() {
    const { router} = this.props;
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
        <h6 className="back-txt">
          <Link href="/">
            <a>Back to home</a>
          </Link>
        </h6>
        <Form>
          <Form.Group controlId="formGroupTitle">
            <Form.Control as="input" name="title" type="text" value={productTitle} onChange={this.handleChange} placeholder="Title" />
          </Form.Group>
          <Form.Group controlId="formGroupDescription">
            <Form.Control as="input" name="desc" type="text" value={productDesc} onChange={this.handleChange} placeholder="Description" />
          </Form.Group>
          <Button variant="primary" onClick={()=>{this.handleSubmit(isEdit)}}>{isEdit ? "Edit" : "Add"}</Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(ProductEdit);
