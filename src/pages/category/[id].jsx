import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ExploreProductArea from "@containers/explore-product/layout-01";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

// Demo data
import productData from "../../data/products.json";

const withNoSSR = (Component) =>
    dynamic(() => Promise.resolve(Component), { ssr: false });

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
            id: params.id,
            // product,
            // recentViewProducts,
            // relatedProducts,
        }, // will be passed to the page component as props
    };
}

const Explore = ({ id }) => {
    const { orders } = useSelector((state) => state.wallet);

    const ordersByCategory = orders.filter((item) => {
        if (item.category === id) {
            return item;
        }
    });

    console.log(ordersByCategory);

    return (
        <Wrapper>
            <SEO pageTitle="Explore Category" />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle="Explore Filter"
                    currentPage="Explore With Filter"
                />
                <ExploreProductArea
                    data={{
                        section_title: {
                            title: "Explore Category",
                        },
                        products: ordersByCategory,
                    }}
                />
            </main>
            <Footer />
        </Wrapper>
    );
};

export default withNoSSR(Explore);
