import {
    SET_WEB3_PROVIDER,
    RESET_WEB3_PROVIDER,
    SET_WEB3_ADDRESS,
    SET_WEB3_ASSETS,
    SET_WEB3_NETWORK,
} from "./types";

export function setProvider({
    provider,
    web3Provider,
    address,
    network,
    contractPresales,
    contractCategory,
    contractOrder,
    sales,
    categories,
}) {
    return {
        type: SET_WEB3_PROVIDER,
        payload: {
            provider,
            web3Provider,
            address,
            network,
            contractPresales,
            contractCategory,
            contractOrder,
            sales,
            categories,
        },
    };
}

export function resetProvider() {
    return { type: RESET_WEB3_PROVIDER };
}

export function setAddress({ address }) {
    return {
        type: SET_WEB3_ADDRESS,
        payload: { address },
    };
}

export function SetNetwork(network) {
    return {
        type: SET_WEB3_NETWORK,
        payload: { network },
    };
}

export function setBalances({ assets }) {
    return {
        type: SET_WEB3_ASSETS,
        payload: { assets },
    };
}
