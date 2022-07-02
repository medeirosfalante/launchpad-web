import produce from "immer";

import {
    SET_WEB3_PROVIDER,
    SET_WEB3_ADDRESS,
    SET_WEB3_ASSETS,
    SET_WEB3_NETWORK,
    SET_WEB3_CONTRACT,
} from "./types";

import networkRefs from "../../../data/network.json";

const INITIAL_STATE = {
    isAuthenticated: false,
    provider: null,
    web3Provider: null,
    address: null,
    network: null,
    assets: [],
    contract: null,
    sales: [],
    networks: networkRefs,
    networkRef: networkRefs[0],
    categories: [],
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_WEB3_PROVIDER:
            return produce(state, (draft) => {
                draft.isAuthenticated = true;
                draft.provider = action.payload.provider;
                draft.web3Provider = action.payload.web3Provider;
                draft.address = action.payload.address;
                draft.network = action.payload.network;
                draft.contract = action.payload.contract;
                draft.networks = networkRefs;
                draft.assets = [];
                draft.sales = action.payload.sales;
                draft.categories = action.payload.categories;
            });
        case SET_WEB3_ADDRESS:
            return produce(state, (draft) => {
                draft.address = action.payload.address;
            });
        case SET_WEB3_ASSETS:
            return produce(state, (draft) => {
                draft.assets = action.payload.assets;
            });
        case SET_WEB3_NETWORK:
            return produce(state, (draft) => {
                draft.network = action.payload.network;
            });
        default:
            return state;
    }
}
