import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";
import Wallet from "@components/wallet";
import Anchor from "@ui/anchor";

import { useDispatch, useSelector } from "react-redux";

const ConnectArea = ({ className, space }) => {
    const { address, assets, network } = useSelector((state) => state.wallet);

    console.log(network);

    return (
        <div
            className={clsx(
                "rn-connect-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
        >
            <div className="container">
                <div className="row g mb--50 mb_md--30 mb_sm--30 align-items-center">
                    <div
                        className="col-lg-6"
                        data-sal="slide-up"
                        data-sal-delay="150"
                        data-sal-duration="800"
                    >
                        <h3 className="connect-title">
                            Buy DRL with pix for facilite to buy your nft and
                            token
                        </h3>
                        <p className="connect-td">
                            <Anchor path="/collection">What is a DRL?</Anchor>
                        </p>
                    </div>
                    <div
                        className="col-lg-6"
                        data-sal="slide-up"
                        data-sal-delay="200"
                        data-sal-duration="800"
                    >
                        <p className="wallet-bootm-disc">
                            We do not own your private keys and cannot access
                            your funds without your confirmation.
                        </p>
                    </div>
                </div>
                <div className="row g-5">
                    <div
                        className="col-lg-6"
                        data-sal="slide-up"
                        data-sal-delay="150"
                        data-sal-duration="500"
                    >
                        <div className="connect-thumbnail">
                            <div className="left-image">
                                {address != "" && network != undefined && (
                                    <iframe
                                        height="1000"
                                        src={`https://testnet.pix.whaledefi.io/home/DRL?address=${address}&network=${network.key}`}
                                    ></iframe>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="row g-5">
                            <div
                                className="col-12"
                                data-sal="slide-up"
                                data-sal-delay="150"
                                data-sal-duration="800"
                            >
                                Buy DRL with pix
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ConnectArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};
ConnectArea.defaultProps = {
    space: 1,
};

export default ConnectArea;
