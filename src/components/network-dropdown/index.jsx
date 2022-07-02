import Image from "next/image";
import Anchor from "@ui/anchor";

import { useCallback, useEffect ,useState} from "react";
import { ethers, Contract, getDefaultProvider, utils } from "ethers";
import * as WalletActions from "../../store/modules/wallet/actions";

import { useDispatch, useSelector } from "react-redux";

const UserDropdown = () => {
    const dispatch = useDispatch();

    const { networks, network } = useSelector((state) => state.wallet);



    const selectNetwork = (item) => {
        window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
                chainId: item.chainId,
                rpcUrls: item.rpcUrls,
                chainName: item.chainName,
                nativeCurrency: {
                    name: item.nativeCurrency.name,
                    symbol: item.nativeCurrency.symbol,
                    decimals:item.nativeCurrency.decimals
                },
                blockExplorerUrls: item.blockExplorerUrls
            }]
        });
        dispatch(WalletActions.SetNetwork(item));
    };

    return (
        <div className="icon-box">
            <Anchor path="/author">
                {network && (
                    <Image
                        src={network.icon}
                        alt="Images"
                        layout="fixed"
                        width={38}
                        height={38}
                    />
                )}
            </Anchor>
            <div className="rn-dropdown">
                <div className="rn-inner-top">
                    <h4 className="title">Network supported</h4>
                </div>
                <div className="rn-product-inner">
                    <ul className="product-list">
                        {networks &&
                            networks.map((item) => (
                                <li className="single-product-list">
                                    <div className="thumbnail">
                                        <Anchor path="/product">
                                            <Image
                                                src={item.icon}
                                                alt="Nft Product Images"
                                                layout="fixed"
                                                width={50}
                                                height={50}
                                            />
                                        </Anchor>
                                    </div>
                                    <div className="content">
                                        <h6 className="title">
                                            <Anchor
                                                path="#"
                                                onClick={() =>
                                                    selectNetwork(item)
                                                }
                                            >
                                                {item.name}
                                            </Anchor>
                                        </h6>
                                    </div>
                                    <div className="button" />
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserDropdown;
