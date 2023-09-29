import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
const TaskCard = ({ task, onDelete, onToggle }) => {
	return (
		<div
			className={`task ${task.reminder ? "reminder" : ""}`}
			onDoubleClick={() => {
				onToggle(task.id);
			}}
		>
			<h3>
				{task.text}
				<FaTimes
					onClick={() => onDelete(task.id)}
					style={{ color: "red", cursor: "pointer" }}
				/>
			</h3>
			<p>{task.day}</p>
		</div>
	);
};
TaskCard.defaultProps = {
	task: {},
};
TaskCard.propTypes = {
	onDelete: PropTypes.func.isRequired,
	onToggle: PropTypes.func.isRequired,
	task: PropTypes.object,
};

export default TaskCard;
