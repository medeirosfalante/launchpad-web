import { useState } from "react";
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

const Product = ({
    overlay,
    title,
    id,
    latestBid,
    price,
    likeCount,
    auction_date,
    image,
    bitCount,
    authors,
    placeBid,
    disableShareDropdown,
    endTime,
    creator,
    totalPercentLiquidPool,
    totalSell,
    balance,
    liked,
}) => {
    const [showBidModal, setShowBidModal] = useState(false);
    const handleBidModal = () => {
        setShowBidModal((prev) => !prev);
    };

    console.log(creator);
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
                    {image && (
                        <Anchor path={`/token/${id}`}>
                            <Image
                                src={image}
                                alt={"NFT_portfolio"}
                                width={533}
                                height={533}
                            />
                        </Anchor>
                    )}
                    {endTime && <CountdownTimer date={endTime} />}
                </div>
                <div className="product-share-wrapper">
                    <Anchor path={`/token/${id}`}>
                        <span className="product-name">{title}</span>
                    </Anchor>
                    <div className="profile-share">
                        <ClientAvatar
                            key={creator}
                            slug={creator}
                            name={creator}
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
                    <strong>{totalPercentLiquidPool}%</strong>
                </span>
                <br />
                <span className="latest-bid">
                    Soft Cap: <br /> <strong>{price} USDT</strong>
                </span>
                <br />
                <span className="latest-bid">
                    hard Cap: <br />
                    <strong>{price} USDT</strong>
                </span>
                <br />
                <span className="latest-bid">
                    Total Raised: <br />
                    <strong>{totalSell}</strong>
                </span>
                <br />
                <span className="latest-bid">
                    availability: <br /> <strong>{balance}</strong>
                </span>
                <br />
                <br />
                <ProductBid
                    price={{ amount: price, currency: "USDT" }}
                    likeCount={liked}
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
