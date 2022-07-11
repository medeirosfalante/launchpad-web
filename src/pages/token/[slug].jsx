import PropTypes from "prop-types";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import TokenDetailsArea from "@containers/token-details";
import ProductArea from "@containers/product/layout-03";
import { shuffleArray } from "@utils/methods";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useState } from "react";
import { ethers, Contract, getDefaultProvider, utils } from "ethers";
import erc20 from "../../data/interfaces/erc20.json";
import numeral from "numeral";
import moment from "moment";

const withNoSSR = (Component) =>
    dynamic(() => Promise.resolve(Component), { ssr: false });

// demo data

const TokenDetails = ({ slug }) => {
    const {
        sales,
        contractPresales,
        contractOrder,
        web3Provider,
        categories,
        network,
    } = useSelector((state) => state.wallet);
    const [sale, setSales] = useState({
        balance: "",
        category: {
            name: "",
            icon: "",
            id: "",
            isLive: false,
        },
        creator: "",
        endTime: "",
        finishVesting: "",
        finished: false,
        hasVesting: false,
        id: "",
        initiated: false,
        pair: "",
        price: "",
        startTime: "",
        startVesting: "",
        tokenContract: "",
        tokenPaymentContract: "",

        tokenContractDecimals: 0,
        tokenContractSymbol: "",
        tokenPaymentContractDecimals: 0,
        tokenPaymentContractSymbol: "",
        total: "",
        totalLocked: "",
        totalPercentForward: "",
        totalPercentLiquidPool: "",
        totalSell: "",
        urlProperties: "",
        name: "",
        title: "",
        images: [],
        description: "",
        content_html: "",
    });

    const [history, setHistory] = useState([]);

    useEffect(async () => {
        if (contractPresales != null && slug != undefined) {
            const sale = await contractPresales.getSale(slug);
            let category = categories.find(
                (item) => item.id == sale["category"].toString()
            );
            let response = await fetch(sale["urlProperties"]);
            let responseJson = await response.json();

            const timestampObjEndTime = moment(
                parseInt(sale["endTime"].toString()) * 1000
            );
            const timestampObjstartTime = moment(
                parseInt(sale["startTime"].toString()) * 1000
            );

            const timestampObjstartVesting = moment(
                parseInt(sale["startVesting"].toString()) * 1000
            );
            const timestampObjfinishVesting = moment(
                parseInt(sale["finishVesting"].toString()) * 1000
            );

            const contractPaymentToken = new Contract(
                sale.tokenPaymentContract,
                erc20,
                web3Provider
            );

            const contractToken = new Contract(
                sale.tokenContract,
                erc20,
                web3Provider
            );

            let decimalsPayment = await contractPaymentToken.decimals();
            let symbolPayment = await contractPaymentToken.symbol();

            let decimals = await contractToken.decimals();
            let symbol = await contractToken.symbol();

            const historyBlock = await contractOrder.listBySaleID(slug);

            const history = historyBlock.map((item) => ({
                tokenContract: item["tokenContract"],
                tokenPaymentContract: item["tokenPaymentContract"],
                price:
                    parseInt(item["price"].toString()) /
                    10 ** parseInt(decimalsPayment),
                amountInToken: numeral(item["amountInToken"].toString()).format(
                    "0,0"
                ),
                buyer: item["buyer"],
                path: `${network.blockExplorerUrls[0]}/address/${item["buyer"]}`,
                buyAt:
                    "     " +
                    moment(parseInt(item["buyAt"].toString()) * 1000).format(
                        "YYYY-MM-DD HH:MM:SS"
                    ),
                id: item["id"].toString(),
                tokenContractSymbol: symbol,
                tokenPaymentContractSymbol: symbolPayment,
            }));
            setHistory(history);

            setSales({
                balance: sale["balance"].toString(),
                category: category,
                creator: sale["creator"].toString(),
                startTime: timestampObjstartTime.format("YYYY-MM-DD"),
                endTime: timestampObjEndTime.format("YYYY-MM-DD"),
                startVesting: timestampObjstartVesting.format("YYYY-MM-DD"),
                finishVesting: timestampObjfinishVesting.format("YYYY-MM-DD"),
                finished: sale["finished"],
                hasVesting: sale["hasVesting"],
                id: sale["id"].toString(),
                initiated: sale["initiated"],
                pair: sale["pair"],
                price: sale["price"].toString(),
                tokenContract: sale["tokenContract"],
                tokenContractDecimals: parseInt(decimals),
                tokenContractSymbol: symbol,
                tokenPaymentContract: sale["tokenPaymentContract"],
                tokenPaymentContractDecimals: parseInt(decimalsPayment),
                tokenPaymentContractSymbol: symbolPayment,
                total: sale["total"].toString(),
                totalLocked: sale["totalLocked"].toString(),
                totalPercentForward: sale["totalPercentForward"].toString(),
                totalPercentLiquidPool: sale[
                    "totalPercentLiquidPool"
                ].toString(),
                totalSell: sale["totalSell"].toString(),
                raised: sale["raised"].toString(),
                urlProperties: sale["urlProperties"],
                name: responseJson.name,
                title: responseJson.title,
                images: responseJson.images,
                description: responseJson.description,
                content_html: responseJson.content_html,
                highlight: sale["highlight"],
                liked: parseInt(sale["liked"].toString()),
                softCap: sale["softCap"].toString(),
                hardCap: sale["hardCap"].toString(),
                minPerUser: sale["minPerUser"].toString(),
                maxPerUser: sale["maxPerUser"].toString(),
            });
        }
    }, [contractPresales, contractOrder, slug]);

    return (
        <Wrapper>
            <SEO pageTitle={sale.title} />
            <Header />
            <main id="main-content">
                <Breadcrumb pageTitle={sale.title} currentPage={sale.title} />
                <TokenDetailsArea product={sale} history={history} />
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

TokenDetails.propTypes = {};

export default withNoSSR(TokenDetails);
