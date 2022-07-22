import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { useMoralis } from "react-moralis";
import Logo from "@components/logo";
import MainMenu from "@components/menu/main-menu";
import MobileMenu from "@components/menu/mobile-menu";
import SearchForm from "@components/search-form/layout-01";
import FlyoutSearchForm from "@components/search-form/layout-02";
import UserDropdown from "@components/user-dropdown";
import NetworkDropDown from "@components/network-dropdown";
import ColorSwitcher from "@components/color-switcher";
import BurgerButton from "@ui/burger-button";
import Anchor from "@ui/anchor";
import Button from "@ui/button";
import { useOffcanvas, useSticky, useFlyoutSearch } from "@hooks";
import headerData from "../../../data/general/header-01.json";
import menuData from "../../../data/general/menu-01.json";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import * as WalletActions from "../../../store/modules/wallet/actions";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers, Contract, getDefaultProvider, utils } from "ethers";

import erc20 from "../../../data/interfaces/erc20.json";
import networkRefs from "../../../data/network.json";
import tokens from "../../../data/tokens.json";
import IPreSale from "../../../data/interfaces/IPreSale.json";
import IOrderContract from "../../../data/interfaces/IOrderContract.json";
import ICategoryContract from "../../../data/interfaces/ICategoryContract.json";
import contractPresaleFile from "../../../data/contracts/presale.json";
import contractCategoryFile from "../../../data/contracts/category.json";
import contractOrderFile from "../../../data/contracts/order.json";

import moment from "moment";

const providerOptions = {
    // walletconnect: {
    //     package: WalletConnectProvider, // required
    //     options: {
    //         infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    //     },
    // },
};

let web3Modal;
if (typeof window !== "undefined") {
    web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions, // required
    });
}

const Header = ({ className }) => {
    const sticky = useSticky();
    const { offcanvas, offcanvasHandler } = useOffcanvas();
    const { search, searchHandler } = useFlyoutSearch();
    const dispatch = useDispatch();
    const [category, setCategory] = useState([]);

    const {
        isAuthenticated,
        provider,
        address,
        web3Provider,
        network,
        networks,
    } = useSelector((state) => state.wallet);

    const defineStorages = async (seletecItem) => {};

    const authenticate = useCallback(async () => {
        let provider = null;
        let seletecItem = null;
        let address = "";
        try {
            provider = await web3Modal.connect();
        } catch (e) {
            console.log(e);
        }
        let web3Provider = null;

        if (provider != null) {
            web3Provider = new ethers.providers.Web3Provider(provider);
            const signer = web3Provider.getSigner();
            address = await signer.getAddress();
        } else {
            seletecItem = networkRefs[0];
            let url = seletecItem.rpcUrls[0];
            web3Provider = new ethers.providers.JsonRpcProvider(url);
        }

        const network = await web3Provider.getNetwork();

        seletecItem = networkRefs.find(
            (item) => item.chainId == `0x${network.chainId.toString(16)}`
        );

        const contractPresales = new ethers.Contract(
            contractPresaleFile.address[seletecItem.chainId],
            IPreSale.abi,
            web3Provider
        );

        const contractCategory = new ethers.Contract(
            contractCategoryFile.address[seletecItem.chainId],
            ICategoryContract.abi,
            web3Provider
        );

        const contractOrder = new ethers.Contract(
            contractOrderFile.address[seletecItem.chainId],
            IOrderContract.abi,
            web3Provider
        );

        const categoriesBlock = await contractCategory.list();

        const categories = categoriesBlock.map((item) => ({
            name: item["name"],
            icon: item["icon"],
            id: item["id"].toString(),
            icon: "feather-home",
            isLive: false,
        }));

        const salesBlock = await contractPresales.listOpenSales();
        setCategory(categories);
        let sales = await getTokenItem(salesBlock, categories);
   
        dispatch(WalletActions.SetNetwork(seletecItem));
        dispatch(
            WalletActions.setProvider({
                provider,
                web3Provider,
                address,
                network: seletecItem,
                contractCategory,
                contractPresales,
                contractOrder,
                sales,
                categories,
            })
        );
    });

    const getTokenItem = async (itens, categories) => {
        let Promises = [];
        itens.forEach(async (sale) => {
            Promises.push(
                new Promise((resolve, reject) => {
                    fetch(sale["urlProperties"])
                        .then((response) => {
                            return response.json();
                        })
                        .then((responseJson) => {
                            let category = categories.find(
                                (item) => item.id == sale["category"].toString()
                            );

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
                                parseInt(sale["finishVesting"].toString()) *
                                    1000
                            );
                            resolve({
                                balance: sale["balance"].toString(),
                                category: category,
                                creator: sale["creator"].toString(),
                                startTime: timestampObjstartTime.format(
                                    "YYYY-MM-DD"
                                ),
                                endTime: timestampObjEndTime.format(
                                    "YYYY-MM-DD"
                                ),
                                startVesting: timestampObjstartVesting.format(
                                    "YYYY-MM-DD"
                                ),
                                finishVesting: timestampObjfinishVesting.format(
                                    "YYYY-MM-DD"
                                ),
                                balance: sale["balance"].toString(),
                                finished: sale["finished"],
                                hasVesting: sale["hasVesting"],
                                id: sale["id"],
                                initiated: sale["initiated"],
                                pair: sale["pair"],
                                price: sale["price"].toString(),
                                finalPrice: sale["finalPrice"].toString(),
                                tokenContract: sale["tokenContract"],
                                tokenPaymentContract:
                                    sale["tokenPaymentContract"],
                                total: sale["total"].toString(),
                                totalLocked: sale["totalLocked"].toString(),
                                totalPercentForward: sale[
                                    "totalPercentForward"
                                ].toString(),
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
                                highlight: sale["highlight"],
                                liked: parseInt(sale["liked"].toString()),
                                softCap: sale["softCap"].toString(),
                                hardCap: sale["hardCap"].toString(),
                                minPerUser: sale["minPerUser"].toString(),
                                maxPerUser: sale["maxPerUser"].toString(),
                                raised: sale["raised"].toString(),
                            });
                        });
                })
            );
        });
        return Promise.all(Promises);
    };

    const getTokens = async (address, web3Provider) => {
        let Promises = [];
        tokens.forEach(async (item) => {
            try {
                const contract = new Contract(
                    item.address[network.chainId],
                    erc20,
                    web3Provider
                );
                Promises.push(
                    new Promise((resolve, reject) => {
                        contract
                            .balanceOf(address)
                            .then((balance) =>
                                resolve({
                                    icon: item.icon,
                                    name: item.name,
                                    symbol: item.symbol,
                                    balance: parseFloat(
                                        utils.formatUnits(
                                            balance,
                                            item.decimals
                                        )
                                    ),
                                })
                            )
                            .catch((e) => reject(e));
                    })
                );
            } catch (e) {}
        });
        return Promise.all(Promises);
    };

    useEffect(async () => {}, [network]);

    useEffect(async () => {
        if (address && network) {
            let listbalances = await getTokens(address, web3Provider);
            dispatch(WalletActions.setBalances({ assets: listbalances }));
        }
    }, [address, web3Provider, dispatch]);

    useEffect(() => {
        if (web3Modal && web3Modal.cachedProvider) {
            authenticate();
        } else {
            authenticate();
        }
    }, []);
    useEffect(() => {
        if (provider?.on) {
            const handleAccountsChanged = (accounts) =>
                dispatch(WalletActions.setAddress({ address: accounts[0] }));
            const handleChainChanged = (_hexChainId) => {
                if (typeof window !== "undefined") {
                    console.log("switched to chain...", _hexChainId);
                    window.location.reload();
                } else {
                    console.log("window is undefined");
                }
            };

            const handleDisconnect = (error) => {};

            provider.on("accountsChanged", handleAccountsChanged);
            provider.on("chainChanged", handleChainChanged);
            provider.on("disconnect", handleDisconnect);

            // Subscription Cleanup
            return () => {
                if (provider.removeListener) {
                    provider.removeListener(
                        "accountsChanged",
                        handleAccountsChanged
                    );
                    provider.removeListener("chainChanged", handleChainChanged);
                    provider.removeListener("disconnect", handleDisconnect);
                }
            };
        }
    }, [provider]);

    return (
        <>
            <header
                className={clsx(
                    "rn-header haeder-default black-logo-version header--fixed header--sticky",
                    sticky && "sticky",
                    className
                )}
            >
                <div className="container">
                    <div className="header-inner">
                        <div className="header-left">
                            <Image
                                src="/images/logo/logo-white.png"
                                width={150}
                                height={25}
                            />
                            <div className="mainmenu-wrapper">
                                <nav
                                    id="sideNav"
                                    className="mainmenu-nav d-none d-xl-block"
                                >
                                    <MainMenu
                                        menu={menuData}
                                        categories={category}
                                    />
                                </nav>
                            </div>
                        </div>
                        <div className="header-right">
                            <div className="setting-option d-none d-lg-block">
                                {/* <SearchForm /> */}
                            </div>
                            <div className="setting-option rn-icon-list d-block d-lg-none">
                                <div className="icon-box search-mobile-icon">
                                    <button
                                        type="button"
                                        aria-label="Click here to open search form"
                                        onClick={searchHandler}
                                    >
                                        <i className="feather-search" />
                                    </button>
                                </div>
                                <FlyoutSearchForm isOpen={search} />
                            </div>
                            {!isAuthenticated && (
                                <div className="setting-option header-btn">
                                    <div className="icon-box">
                                        <Button
                                            color="primary-alta"
                                            className="connectBtn"
                                            size="small"
                                            onClick={() => authenticate()}
                                        >
                                            Wallet connect
                                        </Button>
                                    </div>
                                </div>
                            )}
                            {isAuthenticated && (
                                <div className="setting-option rn-icon-list user-account">
                                    <UserDropdown />
                                </div>
                            )}
                            <div className="setting-option rn-icon-list user-account">
                                <NetworkDropDown />
                            </div>
                            <div className="setting-option rn-icon-list notification-badge">
                                <div className="icon-box">
                                    <Anchor path={headerData.activity_link}>
                                        <i className="feather-bell" />
                                        {/* <span className="badge">0</span> */}
                                    </Anchor>
                                </div>
                            </div>
                            <div className="setting-option mobile-menu-bar d-block d-xl-none">
                                <div className="hamberger">
                                    <BurgerButton onClick={offcanvasHandler} />
                                </div>
                            </div>
                            <div
                                id="my_switcher"
                                className="setting-option my_switcher"
                            >
                                <ColorSwitcher />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <MobileMenu
                isOpen={offcanvas}
                onClick={offcanvasHandler}
                menu={menuData}
                logo={headerData.logo}
                categories={category}
            />
        </>
    );
};

Header.propTypes = {
    className: PropTypes.string,
};

export default Header;
