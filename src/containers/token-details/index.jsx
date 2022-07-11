import PropTypes from "prop-types";
import clsx from "clsx";
import Sticky from "@ui/sticky";
import Button from "@ui/button";
import GalleryTab from "@components/token-details/gallery-tab";
import ProductTitle from "@components/token-details/title";
import ProductCategory from "@components/token-details/category";
import ProductCollection from "@components/token-details/collection";

import PlaceBet from "@components/token-details/place-bet";
import ReactHtmlParser from "react-html-parser";
import productsRef from "../../data/products-02.json"
import BidTab from "@components/token-details/bid-tab";

// Demo Image

const ProductDetailsArea = ({ space, className, product,history }) => {
    const getTokenPrice = (product) => {
        if (product.id == ""){
            return (
                <>
                    
                </>
            );
        }
        return (
            <>
                {product.finalPrice/10**product.tokenPaymentContractDecimals} {product.tokenPaymentContractSymbol}
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
                                images={product.images.map((item) => ({
                                    src: item,
                                }))}
                            />
                        </Sticky>
                    </div>
                    <div className="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
                        <div className="rn-pd-content-area">
                            <ProductTitle title={product.name} likeCount={""} />
                            <span className="bid">
                                Preço do token{" "}
                                <span className="price">
                                    {product && getTokenPrice(product)}
                                </span>
                            </span>
                            <h6 className="title-name">
                                {product.description}
                            </h6>
                            <div className="catagory-collection">
                                {product && (
                                    <ProductCategory
                                        owner={{
                                            name: product.category.name,
                                            image: {
                                                src:
                                                    "/images/client/client-1.png",
                                            },
                                        }}
                                    />
                                )}

                                {product && (
                                    <ProductCollection
                                        collection={{
                                            name: product.category.name,
                                            slug: "/collection",
                                            image: {
                                                src:
                                                    "/images/client/client-2.png",
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
                                <BidTab
                                    bids={productsRef[0]?.bids}
                                    owner={productsRef[0].owner}
                                    properties={productsRef[0]?.properties}
                                    tags={productsRef[0]?.tags}
                                    history={history}
                                    product={product}
                                />
                                <PlaceBet product={product} />
                            </div>
                        </div>
                    </div>
                </div>
                <div>{ReactHtmlParser(product.content_html)}</div>
            </div>
        </div>
    );
};

ProductDetailsArea.propTypes = {
    space: PropTypes.oneOf([1, 2]),
    className: PropTypes.string,
    product: PropTypes.shape({}),
};

ProductDetailsArea.defaultProps = {
    space: 1,
};

export default ProductDetailsArea;
