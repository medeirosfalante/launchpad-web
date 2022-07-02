import { useState, useEffect } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import AuthorIntroArea from "@containers/author-intro";
import AuthorProfileArea from "@containers/author-profile";

import { useDispatch, useSelector } from "react-redux";

// Demo data
import authorData from "../data/author.json";
import productData from "../data/products.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Author = () => {

    const { address } = useSelector((state) => state.wallet);

    useEffect(() => {
        console.log(address);
    }, [address]);
    return (
        <Wrapper>
            <SEO pageTitle="Author" />
            <Header />
            <main id="main-content">
                <AuthorIntroArea data={authorData} />
                <AuthorProfileArea data={{ products: productData }} />
            </main>
            <Footer />
        </Wrapper>
    );
};

export default Author;
