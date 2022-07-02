import PropTypes from "prop-types";
import Image from "next/image";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import Button from "@ui/button";

const TopSeller = ({
    name,
    total_sale,
    image,
    slug,
    className,
    isVarified,
    followBtn,
}) => (
    <div className={clsx("top-seller-inner-one", className)}>
        <div className="top-seller-wrapper">
            <div className="top-seller-content">
            <h6 className="name">{name}</h6>
                {total_sale && (
                    <span className="count-number">
                        {new Intl.NumberFormat("en-US", {
                            currency: "USD",
                        }).format(total_sale)}
                    </span>
                )}
            </div>
        </div>
    </div>
);

TopSeller.propTypes = {
    name: PropTypes.string.isRequired,
    total_sale: PropTypes.number,
    slug: PropTypes.string.isRequired,
    image: PropTypes.shape({
        src: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string])
            .isRequired,
        alt: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
    }).isRequired,
    className: PropTypes.string,
    isVarified: PropTypes.bool,
    followBtn: PropTypes.bool,
};

export default TopSeller;
