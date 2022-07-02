import { useState, useEffect } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import OpenIntroArea from "@containers/open-intro";
import OpenProfileArea from "@containers/open-profile";

import { useDispatch, useSelector } from "react-redux";

// Demo data
import authorData from "../data/author.json";
import productData from "../data/products.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Open = () => {

    const { address } = useSelector((state) => state.wallet);
    return (
        <Wrapper>
            <SEO pageTitle="Open Enablers" />
            <Header />
            <main id="main-content">
                <OpenIntroArea data={authorData} />
                <OpenProfileArea data={{ products: productData }} title="NFT" />
            </main>
            <Footer />
        </Wrapper>
    );
};

export default Open;
