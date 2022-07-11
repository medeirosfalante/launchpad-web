import PropTypes from "prop-types";
import clsx from "clsx";
import Sticky from "@ui/sticky";
import Button from "@ui/button";
import GalleryTab from "@components/product-details/gallery-tab";
import ProductTitle from "@components/product-details/title";
import ProductCategory from "@components/product-details/category";
import ProductCollection from "@components/product-details/collection";
import BidTab from "@components/product-details/bid-tab";
import PlaceBet from "@components/product-details/place-bet";
import { ImageType } from "@utils/types";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { utils } from "ethers";
import tokens from "../../data/tokens.json";
import productsRef from "../../data/products-02.json"



// Demo Image

const ProductDetailsArea = ({ space, className, product }) => {
    const { network, categories } = useSelector((state) => state.wallet);
    const getTokenPrice = (product) => {
        let token = tokens.find(
            (item) => item.address[network.chainId] == product.tokenContract
        );
        return (
            <>
                {utils.formatUnits(product?.price, token.decimals)}{" "}
                {token.symbol}
            </>
        );
    };

    return (
        <div
            className={clsx(
                "product-details-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
        >
            <div className="container">
                <div className="row g-5">
                    <div className="col-lg-7 col-md-12 col-sm-12">
                        <Sticky>
                            <GalleryTab
                                images={[
                                    {
                                        src:
                                            "https://media.discordapp.net/attachments/989633212743553034/989652537235894282/unknown.png?width=783&height=569",
                                    },
                                    {
                                        src:
                                            "https://media.discordapp.net/attachments/989633212743553034/989819421159731210/Screenshot_49.png?width=814&height=569",
                                    },
                                    {
                                        src:
                                            "https://media.discordapp.net/attachments/978558447261982781/983979993841426432/Screenshot_103.png?width=657&height=569",
                                    },
                                ]}
                            />
                        </Sticky>
                    </div>
                    <div className="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
                        <div className="rn-pd-content-area">
                            <ProductTitle title={"Crypto Soul - Metaverso"} likeCount={""} />
                            <span className="bid">
                               Preço do token{" "}
                                <span className="price">
                                    {product && getTokenPrice(product)}
                                </span>
                            </span>
                            <h6 className="title-name">
                            VENHA SE DIVERTIR NO NOSSO METAVERSO, AQUI VOCÊ CONSTRÓI SUA PRÓPRIA HISTÓRIA!
                            </h6>
                            <div className="catagory-collection">
                                {product && (
                                    <ProductCategory
                                        owner={{
                                            name: "MetaEXP",
                                            image: {
                                                src: "/images/client/client-1.png",
                                            },
                                        }}
                                    />
                                )}

                                {product && (
                                    <ProductCollection
                                        collection={{
                                            name: "MetaVerse",
                                            slug: "/collection",
                                            image: {
                                                src: "/images/client/client-2.png",
                                            },
                                            total_sale: "2500,000",
                                        }}
                                    />
                                )}
                            </div>
                            <Button color="primary-alta" path="#">
                               More details
                            </Button>
                            <div className="rn-bid-details">
                                {/* <BidTab
                                    bids={productsRef[0]?.bids}
                                    owner={productsRef[0].owner}
                                    properties={productsRef[0]?.properties}
                                    tags={productsRef[0]?.tags}
                                    history={productsRef[0]?.history}
                                /> */}
                                <PlaceBet
                                    highest_bid={productsRef[0].highest_bid}
                                    auction_date={productsRef[0]?.auction_date}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductDetailsArea.propTypes = {
    space: PropTypes.oneOf([1, 2]),
    className: PropTypes.string,
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        likeCount: PropTypes.number,
        price: PropTypes.shape({
            amount: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
        }).isRequired,
        owner: PropTypes.shape({}),
        collection: PropTypes.shape({}),
        bids: PropTypes.arrayOf(PropTypes.shape({})),
        properties: PropTypes.arrayOf(PropTypes.shape({})),
        tags: PropTypes.arrayOf(PropTypes.shape({})),
        history: PropTypes.arrayOf(PropTypes.shape({})),
        highest_bid: PropTypes.shape({}),
        auction_date: PropTypes.string,
        images: PropTypes.arrayOf(ImageType),
    }),
};

ProductDetailsArea.defaultProps = {
    space: 1,
};

export default ProductDetailsArea;
