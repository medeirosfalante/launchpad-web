import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "@ui/button";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ethers, Contract, getDefaultProvider, utils, Wallet } from "ethers";
import erc20 from "../../../data/erc20.json";
import presale from "../../../data/presale.json";
import IPreSale from "../../../data/IPreSale.json";

import { toast } from "react-toastify";

const PlaceBidModal = ({ show, handleModal, product }) => {
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [approved, setApproved] = useState(false);
    const { sales, contract, web3Provider, categories, network } = useSelector(
        (state) => state.wallet
    );
    const [txidApprove, setTxidApprove] = useState("");
    const [txidBuy, setTxidBuy] = useState("");
    const [blockExplorer, setBlockExplorer] = useState("");

    const [step, setStep] = useState(0);
    const [inputDisabled, setInputDisabled] = useState(false);

    useEffect(() => {
        setStep(0);
        setInputDisabled(false);
        setTxidBuy("");
        setTxidApprove("");
        setApproved(false);
        setLoading(false);
        setAmount(0);

    },[]);

    const handleModalClose = () => {
        setStep(0);
        setInputDisabled(false);
        setTxidBuy("");
        setTxidApprove("");
        setApproved(false);
        setLoading(false);
        setAmount(0);
        handleModal()
    }

    const approve = async () => {
        setInputDisabled(true);
        try {
            const signer = web3Provider.getSigner();

            var numberOfTokens = ethers.utils.parseUnits(
                amount,
                product.tokenPaymentContractDecimals
            );
            const contractPaymentToken = new Contract(
                product.tokenPaymentContract,
                erc20,
                signer
            );
            setBlockExplorer(network.blockExplorerUrls[0]);
            let transaction = await contractPaymentToken.approve(
                presale.address[network.chainId],
                numberOfTokens
            );

            setApproved(true);
            setLoading(true);

            const receipt = await transaction.wait();
            setTxidApprove(receipt.transactionHash);
            setLoading(false);
        } catch (e) {
            toast.error(e);
            setInputDisabled(false);
        }
    };

    const buy = async () => {
        setInputDisabled(true);
        try {
            const signer = web3Provider.getSigner();

            var numberOfTokens = ethers.utils.parseUnits(
                amount,
                product.tokenPaymentContractDecimals
            );
            const contract = new ethers.Contract(
                presale.address[network.chainId],
                IPreSale.abi,
                signer
            );

            let transaction = await contract.buy(numberOfTokens, product.id);
            setLoading(true);
            const receipt = await transaction.wait();
            setLoading(false);
            setStep(1);
            setTxidBuy(receipt.transactionHash);
        } catch (e) {
            console.log(e.data.message)
            toast.error(e.data.message);
        }
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
                {step == 1 && (
                    <div className="placebid-form-box">
                        <h5 className="title">Your purchase processed</h5>
                        <div className="bid-content">
                            <div className="bid-content-top"></div>

                            <div className="bid-content-mid">
                                <div className="bid-content-left">
                                    <span>Price</span>
                                    <span>Amount in tokens</span>
                                    <span>Total Pay</span>
                                    <span>Vesting time</span>
                                </div>
                                <div className="bid-content-right">
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
                                path={`${blockExplorer}/tx/${txidBuy}`}
                                size="medium"
                                fullwidth
                                target="_blank"
                            >
                                details
                            </Button>
                            <Button
                                color="primary-alta"
                                size="medium"
                                fullwidth
                                className="mt--10"
                                onClick={handleModalClose}
                            >
                                close
                            </Button>
                        </div>
                    </div>
                )}

                {step == 0 && (
                    <div className="placebid-form-box">
                        <h5 className="title">Your purchase processed</h5>
                        <div className="bid-content">
                            <div className="bid-content-top">
                                <div className="bid-content-left">
                                    <input
                                        id="value"
                                        type="number"
                                        name="amount"
                                        value={amount}
                                        disabled={inputDisabled}
                                        onChange={(e) =>
                                            setAmount(e.target.value)
                                        }
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
                            {!approved ? (
                                <Button
                                    onClick={() => approve()}
                                    size="medium"
                                    fullwidth
                                >
                                    approve
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => buy()}
                                    size="medium"
                                    fullwidth
                                    disabled={loading}
                                >
                                    {loading ? <>loading...</> : <>buy</>}
                                </Button>
                            )}
                            <Button
                                color="primary-alta"
                                size="medium"
                                fullwidth
                                className="mt--10"
                                onClick={handleModalClose}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};

PlaceBidModal.propTypes = {
    // show: PropTypes.bool.isRequired,
    // handleModal: PropTypes.func.isRequired,
};
export default PlaceBidModal;
