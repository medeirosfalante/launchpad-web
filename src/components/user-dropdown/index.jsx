import Image from "next/image";
import Anchor from "@ui/anchor";

import { useDispatch, useSelector } from "react-redux";

const UserDropdown = () => {
    const { address, assets } = useSelector((state) => state.wallet);

    return (
        <div className="icon-box">
            <Anchor path="/author">
                <Image
                    src="/images/icons/boy-avater.png"
                    alt="Images"
                    layout="fixed"
                    width={38}
                    height={38}
                />
            </Anchor>
            <div className="rn-dropdown">
                <div className="rn-inner-top">
                    <h4 className="title">
                        <Anchor path="/product">{address}</Anchor>
                    </h4>
                    {/* <span>
                        <Anchor path="/product">Set Display Name</Anchor>
                    </span> */}
                </div>
                <div className="rn-product-inner">
                    <ul className="product-list">
                        {assets.map((item) => (
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
                                        <Anchor path="/product">
                                            {item.name}
                                        </Anchor>
                                    </h6>
                                    <span className="price">
                                        {item.symbol} {item.balance}
                                    </span>
                                </div>
                                <div className="button" />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="add-fund-button mt--20 pb--20">
                    {/* <Anchor className="btn btn-primary-alta w-100" path="/pix">
                        Add fund with fiat payment
                    </Anchor> */}
                </div>
                <ul className="list-inner">
                    {/* <li>
                        <Anchor path="/user">My Profile</Anchor>
                    </li>
                    <li>
                        <Anchor path="/open">OpenEnablers</Anchor>
                    </li>
                    <li>
                        <Anchor path="/edit-profile">Edit Profile</Anchor>
                    </li> */}
                    <li>
                        <Anchor path="/login">Sign Out</Anchor>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UserDropdown;
