import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Button from "../button/Button";
const Header = ({ title, onClick, showForm }) => {
	const pageLocation = useLocation();
	const pathName = pageLocation.pathname;
	return (
		<header className="header">
			<h1>{title}</h1>
			{pathName === "/" && (
				<Button
					buttonText={showForm ? "Close" : "Add"}
					buttonColor={showForm ? "red" : "green"}
					onClick={onClick}
				></Button>
			)}
		</header>
	);
};
Header.defaultProps = {
	title: "Header Default Title",
	showForm: false,
};
Header.propTypes = {
	title: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	showForm: PropTypes.bool,
};

export default Header;
