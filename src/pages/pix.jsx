import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import Pix from "@containers/pix";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Connect = () => (
    <Wrapper>
        <SEO pageTitle="Deposit fiat" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Convert pix to DRL"
                currentPage="Make your payment easier"
            />
            <Pix />
        </main>
        <Footer />
    </Wrapper>
);

export default Connect;
