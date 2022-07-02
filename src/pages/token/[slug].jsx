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
import erc20 from "../../data/erc20.json";

import moment from "moment";

const withNoSSR = (Component) =>
    dynamic(() => Promise.resolve(Component), { ssr: false });

// demo data


const TokenDetails = ({ id }) => {
    const { sales, contract, web3Provider, categories } = useSelector(
        (state) => state.wallet
    );
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

    useEffect(async () => {
        if (contract != null) {
            const sale = await contract.getSale(1);

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
            let decimalsPayment = await contractPaymentToken.decimals();
            let symbol = await contractPaymentToken.symbol();

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
                tokenPaymentContract: sale["tokenPaymentContract"],
                tokenPaymentContractDecimals: parseInt(decimalsPayment),
                tokenPaymentContractSymbol: symbol,
                total: sale["total"].toString(),
                totalLocked: sale["totalLocked"].toString(),
                totalPercentForward: sale["totalPercentForward"].toString(),
                totalPercentLiquidPool: sale[
                    "totalPercentLiquidPool"
                ].toString(),
                totalSell: sale["totalSell"].toString(),
                urlProperties: sale["urlProperties"],
                name: responseJson.name,
                title: responseJson.title,
                images: responseJson.images,
                description: responseJson.description,
                content_html: responseJson.content_html,
            });
        }
    }, [contract]);

    return (
        <Wrapper>
            <SEO pageTitle={sale.title} />
            <Header />
            <main id="main-content">
                <Breadcrumb pageTitle={sale.title} currentPage={sale.title} />
                <TokenDetailsArea product={sale} />
            </main>
            <Footer />
        </Wrapper>
    );
};

TokenDetails.propTypes = {
    product: PropTypes.shape({}),
    recentViewProducts: PropTypes.arrayOf(PropTypes.shape({})),
    relatedProducts: PropTypes.arrayOf(PropTypes.shape({})),
};

export default withNoSSR(TokenDetails);
