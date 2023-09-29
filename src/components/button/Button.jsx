import PropTypes from "prop-types";

const Button = ({ buttonText, buttonColor, onClick }) => {
	return (
		<button
			onClick={onClick}
			style={{ backgroundColor: buttonColor }}
			className="btn"
		>
			{buttonText}
		</button>
	);
};
Button.defaultProps = {
	buttonText: "Button Default Text",
	buttonColor: "steelblue",
	onClick: () => {
		console.log("click");
	},
};
Button.propTypes = {
	buttonText: PropTypes.string.isRequired,
	buttonColor: PropTypes.string,
	onClick: PropTypes.func.isRequired,
};

export default Button;
