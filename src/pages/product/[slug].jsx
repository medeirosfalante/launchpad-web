import PropTypes from "prop-types";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ProductDetailsArea from "@containers/product-details";
import ProductArea from "@containers/product/layout-03";
import { shuffleArray } from "@utils/methods";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import React from "react";

const withNoSSR = (Component) =>
    dynamic(() => Promise.resolve(Component), { ssr: false });

// demo data
import productData from "../../data/products.json";

const ProductDetails = ({ slug }) => {
    const { orders } = useSelector((state) => state.wallet);
    const product = orders.find(({ id }) => id === slug);

    return (
        <Wrapper>
            <SEO pageTitle="Product Details" />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle="Product Details"
                    currentPage="Product Details"
                />
                <ProductDetailsArea product={product} />
                <ProductArea
                    data={{
                        section_title: { title: "Recent View" },
                        products: orders,
                    }}
                />
                <ProductArea
                    data={{
                        section_title: { title: "Related Item" },
                        products: orders,
                    }}
                />
            </main>
            <Footer />
        </Wrapper>
    );
};

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    };
}

export async function getStaticProps({ params }) {
    // const product = productData.find(({ slug }) => slug === params.slug);
    // const { categories } = product;
    // const recentViewProducts = shuffleArray(productData).slice(0, 5);
    // const relatedProducts = productData
    //     .filter((prod) => prod.categories?.some((r) => categories?.includes(r)))
    //     .slice(0, 5);
    return {
        props: {
            className: "template-color-1",
            slug: params.slug,
            // product,
            // recentViewProducts,
            // relatedProducts,
        }, // will be passed to the page component as props
    };
}

ProductDetails.propTypes = {
    product: PropTypes.shape({}),
    recentViewProducts: PropTypes.arrayOf(PropTypes.shape({})),
    relatedProducts: PropTypes.arrayOf(PropTypes.shape({})),
};

export default withNoSSR(ProductDetails);
