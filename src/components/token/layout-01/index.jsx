import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import CountdownTimer from "@ui/countdown/layout-01";
import ClientAvatar from "@ui/client-avatar";
import ShareDropdown from "@components/token-share-dropdown";
import ProductBid from "@components/product-bid";
import Button from "@ui/button";
import { ImageType } from "@utils/types";
import PlaceBidModal from "@components/modals/placebid-modal";
import { useSelector } from "react-redux";
import { ethers, Contract, getDefaultProvider, utils } from "ethers";
import erc20 from "../../../data/interfaces/erc20.json";

const Product = ({
    overlay,
    placeBid,
    disableShareDropdown,
    product,
}) => {
    const [showBidModal, setShowBidModal] = useState(false);

    const [productRef, setProductRef] = useState({
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

    const handleBidModal = () => {
        setShowBidModal((prev) => !prev);
    };

    const { sales, contract, web3Provider, categories } = useSelector(
        (state) => state.wallet
    );

    useEffect(async () => {
        if (product != undefined) {
            const contractPaymentToken = new Contract(
                product.tokenPaymentContract,
                erc20,
                web3Provider
            );

            const contractToken = new Contract(
                product.tokenContract,
                erc20,
                web3Provider
            );

            let decimalsPayment = await contractPaymentToken.decimals();
            let symbolPayment = await contractPaymentToken.symbol();

            let decimals = await contractToken.decimals();
            let symbol = await contractToken.symbol();

            setProductRef({
                ...product,
                tokenContractDecimals: parseInt(decimals),
                tokenContractSymbol: symbol,
                tokenPaymentContractDecimals: parseInt(decimalsPayment),
                tokenPaymentContractSymbol: symbolPayment,
            });
        }
    }, []);

    return (
        <>
            <div
                className={clsx(
                    "product-style-one",
                    !overlay && "no-overlay",
                    placeBid && "with-placeBid"
                )}
            >
                <div className="card-thumbnail">
                    {productRef.images.length > 0 && (
                        <Anchor path={`/token/${product.id}`}>
                            <Image
                                src={productRef.images[0]}
                                alt={"NFT_portfolio"}
                                width={533}
                                height={533}
                            />
                        </Anchor>
                    )}
                    {productRef.endTime && (
                        <CountdownTimer date={productRef.endTime} />
                    )}
                </div>
                <div className="product-share-wrapper">
                    <Anchor path={`/token/${product.id}`}>
                        <span className="product-name">{productRef.title}</span>
                    </Anchor>
                    <div className="profile-share">
                        <ClientAvatar
                            key={productRef.creator}
                            slug={productRef.creator}
                            name={productRef.creator}
                            image={"/images/client/client-2.png"}
                        />
                    </div>
                    {!disableShareDropdown && <ShareDropdown />}
                </div>
                <br />
                <span className="latest-bid">
                    Launch Type:{" "}
                    <strong>
                        <br />
                        IDO
                    </strong>{" "}
                </span>
                <br />
                <span className="latest-bid">
                    Liquidity: <br />
                    <strong>{productRef.totalPercentLiquidPool}%</strong>
                </span>
                <br />
                <span className="latest-bid">
                    Soft Cap: <br /> <strong>{productRef.softCap} USDT</strong>
                </span>
                <br />
                <span className="latest-bid">
                    hard Cap: <br />
                    <strong>{productRef.hardCap} { productRef.tokenPaymentContractSymbol}</strong>
                </span>
                <br />
                <span className="latest-bid">
                    Total Raised: <br />
                    <strong>{productRef.totalSell}</strong><br></br> {productRef.tokenContractSymbol}
                </span>
                <br />
                <span className="latest-bid">
                    Availability: <br /> <strong>{productRef.balance}<br></br> {productRef.tokenContractSymbol}</strong>
                </span>
                <br />
                <br />
                <ProductBid
                    price={{ amount:  parseFloat(
                        productRef.price /
                            10 **
                                productRef.tokenPaymentContractDecimals
                    ), currency: productRef.tokenPaymentContractSymbol }}
                    likeCount={productRef.liked}
                />
            </div>
            <PlaceBidModal show={showBidModal} handleModal={handleBidModal} />
        </>
    );
};

Product.propTypes = {};

Product.defaultProps = {
    overlay: false,
};

export default Product;
