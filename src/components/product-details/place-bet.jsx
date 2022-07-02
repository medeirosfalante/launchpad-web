import { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Anchor from "@ui/anchor";
import Button from "@ui/button";
import PlaceBidModal from "@components/modals/placebid-modal";
import Countdown from "@ui/countdown/layout-02";
import { ImageType } from "@utils/types";

const PlaceBet = ({ product }) => {
    const [showBidModal, setShowBidModal] = useState(false);
    const handleBidModal = () => {
        setShowBidModal((prev) => !prev);
    };
    return (
        <>
            <div className="place-bet-area">
                <div className="rn-bet-create">
                    <div className="bid-list winning-bid">
                        <h6 className="title">Sale details</h6>
                        <div className="top-seller-inner-one">
                            <div className="top-seller-wrapper">
                                <div className="thumbnail">
                                    <Anchor path={product.creator}>
                                        <Image
                                            src={"/images/client/client-1.png"}
                                            alt="Nft_Profile"
                                            width={44}
                                            height={44}
                                            layout="fixed"
                                        />
                                    </Anchor>
                                </div>
                                <div className="top-seller-content">
                                    <span className="heighest-bid">
                                        Vendido por:{" "}
                                        <Anchor path={product.creator}>
                                            {product.creator.substring(0,10)}...
                                        </Anchor>
                                    </span>
                                    <span className="count-number">
                                        por: {product.price} {product.tokenPaymentContractSymbol}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    {product.endTime && (
                        <div className="bid-list left-bid">
                            <h6 className="title">This sale ends in:</h6>
                            <Countdown
                                className="mt--15"
                                date={product.endTime}
                            />
                        </div>
                    )}
                </div>
                <Button
                    color="primary-alta"
                    className="mt--30"
                    onClick={handleBidModal}
                >
                    Buy
                </Button>
            </div>
            <PlaceBidModal show={showBidModal} handleModal={handleBidModal} />
        </>
    );
};

PlaceBet.propTypes = {
    // highest_bid: PropTypes.shape({
    //     amount: PropTypes.string,
    //     bidder: PropTypes.shape({
    //         name: PropTypes.string,
    //         image: ImageType,
    //         slug: PropTypes.string,
    //     }),
    // }),
    // auction_date: PropTypes.string,
};

export default PlaceBet;
