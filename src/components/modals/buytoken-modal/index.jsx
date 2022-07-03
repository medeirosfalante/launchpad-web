import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "@ui/button";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ethers, Contract, getDefaultProvider, utils } from "ethers";
import erc20 from "../../../data/erc20.json";

const PlaceBidModal = ({ show, handleModal, product }) => {
    const [amount, setAmount] = useState(0);
    const { sales, contract, web3Provider, categories } = useSelector(
        (state) => state.wallet
    );

    const approve = async () => {
        const contractPaymentToken = new Contract(
            product.tokenPaymentContract,
            erc20,
            web3Provider
        );


        // let transaction = await contractPaymentToken.approve(
        //     ethers.utils.formatUnits(amount, "wei")
        // );
        // console.log(ethers.utils.formatUnits(amount, "wei"));
    };

    return (
        <Modal
            className="rn-popup-modal placebid-modal-wrapper"
            show={show}
            onHide={handleModal}
            centered
        >
            {show && (
                <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleModal}
                >
                    <i className="feather-x" />
                </button>
            )}
            <Modal.Header>
                <h3 className="modal-title">{product.title}</h3>
            </Modal.Header>
            <Modal.Body>
                <p>You are about to purchase This Product in EnablersDAO</p>
                <div className="placebid-form-box">
                    <h5 className="title">Your purchase</h5>
                    <div className="bid-content">
                        <div className="bid-content-top">
                            <div className="bid-content-left">
                                <input
                                    id="value"
                                    type="number"
                                    name="amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                                <span>USDT</span>
                            </div>
                        </div>

                        <div className="bid-content-mid">
                            <div className="bid-content-left">
                                <span>Min</span>
                                <span>max</span>
                                <span>Price</span>
                                <span>Amount in tokens</span>
                                <span>Total Pay</span>
                                <span>Vesting time</span>
                            </div>
                            <div className="bid-content-right">
                                <span>
                                    {product.minPerUser}{" "}
                                    {product.tokenPaymentContractSymbol}
                                </span>
                                <span>
                                    {product.maxPerUser}{" "}
                                    {product.tokenPaymentContractSymbol}
                                </span>
                                <span>
                                    {product.price /
                                        10 **
                                            product.tokenPaymentContractDecimals}{" "}
                                    {product.tokenPaymentContractSymbol}
                                </span>
                                <span>
                                    {(
                                        amount /
                                        parseFloat(
                                            product.price /
                                                10 **
                                                    product.tokenPaymentContractDecimals
                                        )
                                    ).toFixed(4)}{" "}
                                    {product.tokenContractSymbol}
                                </span>

                                <span>
                                    {amount}{" "}
                                    {product.tokenPaymentContractSymbol}
                                </span>
                                <span>10 month</span>
                            </div>
                        </div>
                    </div>
                    <div className="bit-continue-button">
                        <Button
                            onClick={() => approve()}
                            size="medium"
                            fullwidth
                        >
                            approve
                        </Button>
                        <Button
                            color="primary-alta"
                            size="medium"
                            className="mt--10"
                            onClick={handleModal}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

PlaceBidModal.propTypes = {
    // show: PropTypes.bool.isRequired,
    // handleModal: PropTypes.func.isRequired,
};
export default PlaceBidModal;
