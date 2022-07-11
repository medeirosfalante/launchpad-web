import PropTypes from "prop-types";
import clsx from "clsx";
import TabContainer from "react-bootstrap/TabContainer";
import TabContent from "react-bootstrap/TabContent";
import TabPane from "react-bootstrap/TabPane";
import Nav from "react-bootstrap/Nav";
import BidsTabContent from "./bids-tab-content";
import DetailsTabContent from "./details-tab-content";
import HistoryTabContent from "./history-tab-content";

const BidTab = ({
    className,
    bids,
    owner,
    properties,
    tags,
    history,
    product,
}) => (
    <TabContainer defaultActiveKey="nav-tokenomics">
        <div className={clsx("tab-wrapper-one", className)}>
            <nav className="tab-button-one">
                <Nav as="div" className="nav-tabs">
                    <Nav.Link as="button" eventKey="nav-tokenomics">
                        Tokenomics
                    </Nav.Link>
                    <Nav.Link as="button" eventKey="nav-history">
                        History
                    </Nav.Link>
                </Nav>
            </nav>
            <TabContent className="rn-bid-content">
                <TabPane eventKey="nav-tokenomics">
                    <DetailsTabContent
                        owner={owner}
                        properties={properties}
                        tags={tags}
                        product={product}
                    />
                </TabPane>
                <TabPane eventKey="nav-history">
                    <HistoryTabContent history={history} />
                </TabPane>
            </TabContent>
        </div>
    </TabContainer>
);

BidTab.propTypes = {
    className: PropTypes.string,
    bids: PropTypes.arrayOf(PropTypes.shape({})),
    owner: PropTypes.shape({}),
    properties: PropTypes.arrayOf(PropTypes.shape({})),
    tags: PropTypes.arrayOf(PropTypes.shape({})),
    history: PropTypes.arrayOf(PropTypes.shape({})),
};

export default BidTab;
