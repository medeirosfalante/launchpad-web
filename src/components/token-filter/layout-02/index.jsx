import PropTypes from "prop-types";
import NiceSelect from "@ui/nice-select";
import InputRange from "@ui/input-range";

import { useSelector } from "react-redux";

const ProductFilter = ({ slectHandler, sortHandler, priceHandler, inputs }) => {
    const { categories } = useSelector((state) => state.wallet);
    return (
        <div className="default-exp-wrapper">
            <div className="inner">
                <div className="filter-select-option">
                    <h6 className="filter-leble">LIKES</h6>
                    <NiceSelect
                        options={[
                            { value: "most-liked", text: "Most liked" },
                            { value: "least-liked", text: "Least liked" },
                        ]}
                        placeholder="Sort by likes"
                        onChange={sortHandler}
                        name="like"
                    />
                </div>
                <div className="filter-select-option">
                    <h6 className="filter-leble">Category</h6>
                    <NiceSelect
                        options={categories.map((item) => ({
                            value: item.id,
                            text: item.name,
                        }))}
                        placeholder="Category"
                        onChange={slectHandler}
                        name="category"
                    />
                </div>


                <div className="filter-select-option">
                    <h6 className="filter-leble">Sale type</h6>
                    <NiceSelect
                        options={[
                            { value: "all", text: "All Type" },
                            { value: "IDO", text: "IDO" },
                        ]}
                        placeholder="Sale type"
                        onChange={slectHandler}
                        name="sale_type"
                    />
                </div>
                <div className="filter-select-option">
                    {/* <h6 className="filter-leble">Price Range</h6>
                    <div className="price_filter s-filter clear">
                        <form action="#" method="GET">
                            <InputRange
                                values={inputs.price}
                                onChange={priceHandler}
                            />
                        </form>
                    </div> */}
                </div>
                <div className="filter-select-option">
                    
                    </div>
            </div>
        </div>
    );
};

ProductFilter.displayName = "ProductFilter";

ProductFilter.propTypes = {
    slectHandler: PropTypes.func,
    sortHandler: PropTypes.func,
    priceHandler: PropTypes.func,
    inputs: PropTypes.shape({
        price: PropTypes.shape({
            min: PropTypes.number.isRequired,
            max: PropTypes.number.isRequired,
        }),
    }),
};
export default ProductFilter;
