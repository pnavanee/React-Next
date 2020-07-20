import Link from "next/link";
import Head from "next/head";
import Layout from "../../../components/layout";
import {connect} from 'react-redux';
import {getProduct} from '../../../store/action';
import { END_POINT } from "../../../constants";

class ProductDetail extends React.Component {
  static async getInitialProps({store, query }) {
    const { pid } = query;
    const action = await getProduct(pid);
    store.dispatch(action);
  }

  render() {
    const { product } = this.props;
    return (
      <div className="container">
          <Head>
            <title>Product Detail</title>
          </Head>
          <h6 className="back-txt">
            <Link href="/">
              <a>Back to home</a>
            </Link>
          </h6>
          <h3>Product Detail</h3>
          <p><b>{product.title}</b></p>
          <p><i>{product.description}</i></p>
          <Link href="/product/[pid]/[demo]" as={`/product/${product.id}/demo`}>Test Route</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
         product : state.product
    }
}

export default connect(mapStateToProps, null)(ProductDetail);
