import PropTypes from "prop-types";
import Anchor from "@ui/anchor";

const SubMenu = ({ categories }) => (
    <ul className="submenu mobile-menu-children">
        {categories.map((nav) => (
            <li key={nav.id._hex}>
                <Anchor path={nav.icon}>
                    {nav.name}
                    {/* {nav?.icon && <i className={`feather ${nav.icon}`} />} */}
                </Anchor>
            </li>
        ))}
    </ul>
);

SubMenu.propTypes = {
    menu: PropTypes.arrayOf(PropTypes.shape({})),
};

export default SubMenu;
