import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import TokenHeroArea from "@containers/hero/token";
import LiveExploreArea from "@containers/live-explore/layout-01";
import ExploreProductArea from "@containers/explore-token/layout-03";
import TopSellerArea from "@containers/top-seller/layout-01";
import ServiceArea from "@containers/services/layout-01";
import CollectionArea from "@containers/collection/layout-01";
import { normalizedData } from "@utils/methods";
import Lottie from "react-lottie";

import { useSelector } from "react-redux";

// Demo data
import homepageData from "../data/homepages/home-04.json";
import sellerData from "../data/sellers.json";
import productData from "../data/products.json";
import collectionsData from "../data/collections.json";
import IMarketplace from "../data/IMarketplace.json";

import animationData from "../data/loading/99274-loading.json";

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Home = () => {
    const { sales, loading } = useSelector((state) => state.wallet);

    const content = normalizedData(homepageData?.content || []);
    const liveAuctionData = productData
        .filter(
            (prod) =>
                prod?.auction_date && new Date() <= new Date(prod?.auction_date)
        )
        .sort(
            (a, b) =>
                Number(new Date(b.published_at)) -
                Number(new Date(a.published_at))
        )
        .slice(0, 5);

    return (
        <Wrapper>
            <SEO pageTitle="Home Four" />
            <Header />
            <main id="main-content">
                {loading ? (
                    <Lottie options={defaultOptions} height={400} width={400} />
                ) : (
                    <>
                        <TokenHeroArea
                            data={{
                                section: "hero-section",
                                badge:
                                    sales.length > 0
                                        ? sales[0].category.name
                                        : "",
                                title: sales.length > 0 ? sales[0].title : "",
                                description:
                                    sales.length > 0
                                        ? sales[0].description
                                        : "",
                                buttons:
                                    sales.length > 0
                                        ? [
                                              {
                                                  id: 1,
                                                  path: `/token/${sales[0].id}`,
                                                  content: "Buy now",
                                              },
                                          ]
                                        : [],
                                banners: sales.map((item) => ({
                                    id: 1,
                                    title: item.title,
                                    client: "Bordcast",
                                    path: `/token/${item.id}`,
                                    image: {
                                        src: item.images[0],
                                    },
                                })),
                            }}
                        />

                        <ExploreProductArea
                            data={{
                                ...{
                                    section_title: {
                                        title: "Explore IDO",
                                    },
                                },
                                products: sales,
                            }}
                        />
                    </>
                )}

                {/* <TopSellerArea
                    data={{
                        ...content["top-sller-section"],
                        sellers: sellerData,
                    }}
                />
                <ServiceArea data={content["service-section"]} />
                <CollectionArea
                    data={{
                        ...content["collection-section"],
                        collections: collections,
                    }}
                /> */}
            </main>
            <Footer />
        </Wrapper>
    );
};

export default Home;
