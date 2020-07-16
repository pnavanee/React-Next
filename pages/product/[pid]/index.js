import Link from "next/link";
import Head from "next/head";
import Layout from "../../../components/layout";
import { END_POINT } from "../../../constants";

class ProductDetail extends React.Component {
  static async getInitialProps({ query }) {
    const { pid } = query;
    const res = await fetch(`${END_POINT}/products/${parseInt(pid)}`);
    const product = await res.json();
    return {
      product: product,
    };
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
          <Link href="/product/[pid]/[demo]" as={`/product/${product.id}/demo`}>Demo Route</Link>
      </div>
    );
  }
}

export default ProductDetail;
