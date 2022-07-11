import PropTypes from "prop-types";
import TopSeller from "@components/top-seller/layout-01";
import { IDType, ImageType } from "@utils/types";
import numeral from "numeral";

const DetailsTabContent = ({ owner, properties, tags, product }) => (
    <div className="mt--20">
        {properties && (
            <div className="rn-pd-sm-property-wrapper">
                <h6 className="pd-property-title">Configurations</h6>
                <div className="property-wrapper">
                    <div key={0} className="pd-property-inner">
                        <span className="color-body type">Launch Type:</span>
                        <span className="color-white value">IDO</span>
                    </div>
                    <div key={1} className="pd-property-inner">
                        <span className="color-body type">Soft Cap:</span>
                        <span className="color-white value">
                            {numeral(
                                product.softCap /
                                    10 ** product.tokenPaymentContractDecimals
                            ).format("0,0")}{" "}
                            <br></br> {product.tokenPaymentContractSymbol}
                        </span>
                    </div>
                    <div key={2} className="pd-property-inner">
                        <span className="color-body type">hard Cap:</span>
                        <span className="color-white value">
                            {numeral(
                                product.hardCap /
                                    10 ** product.tokenPaymentContractDecimals
                            ).format("0,0")}{" "}
                            <br></br> {product.tokenPaymentContractSymbol}
                        </span>
                    </div>
                    <div key={3} className="pd-property-inner">
                        <span className="color-body type">Liquidity:</span>
                        <span className="color-white value">
                            {product.totalPercentLiquidPool}%
                        </span>
                    </div>
                    <div key={4} className="pd-property-inner">
                        <span className="color-body type">Total Raised:</span>
                        <span className="color-white value">
                            {numeral(
                                product.raised /
                                    10 ** product.tokenPaymentContractDecimals
                            ).format("0,0")}
                            <br></br> {product.tokenPaymentContractSymbol}
                        </span>
                    </div>
                    <div key={5} className="pd-property-inner">
                        <span className="color-body type">Availability:</span>
                        <span className="color-white value">
                            {numeral(
                                product.balance /
                                    10 ** product.tokenContractDecimals
                            ).format("0,0")}{" "}
                            <br></br> {product.tokenContractSymbol}
                        </span>
                    </div>
                    <div key={5} className="pd-property-inner">
                        <span className="color-body type">Min per user:</span>
                        <span className="color-white value">
                            {numeral(product.minPerUser).format("0,0")}{" "}
                            <br></br> {product.tokenPaymentContractSymbol}
                        </span>
                    </div>
                    <div key={5} className="pd-property-inner">
                        <span className="color-body type">Max per user:</span>
                        <span className="color-white value">
                            {numeral(product.maxPerUser).format("0,0")}{" "}
                            <br></br> {product.tokenPaymentContractSymbol}
                        </span>
                    </div>
                </div>
            </div>
        )}
    </div>
);

DetailsTabContent.propTypes = {
    owner: PropTypes.shape({
        name: PropTypes.string,
        total_sale: PropTypes.number,
        slug: PropTypes.string,
        image: ImageType,
    }),
    properties: PropTypes.arrayOf(
        PropTypes.shape({
            id: IDType,
            type: PropTypes.string,
            value: PropTypes.string,
        })
    ),
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            id: IDType,
            type: PropTypes.string,
            value: PropTypes.string,
        })
    ),
};

export default DetailsTabContent;
