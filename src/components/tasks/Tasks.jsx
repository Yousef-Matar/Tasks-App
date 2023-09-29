import PropTypes from "prop-types";
import TaskCard from "./Util/TaskCard";

const Tasks = ({ tasks, onDelete, onToggle }) => {
	return (
		<>
			{tasks.map((task) => {
				return (
					<TaskCard
						onToggle={onToggle}
						onDelete={onDelete}
						key={task.id}
						task={task}
					/>
				);
			})}
		</>
	);
};
Tasks.defaultProps = {
	tasks: [],
};
Tasks.propTypes = {
	onDelete: PropTypes.func.isRequired,
	onToggle: PropTypes.func.isRequired,
	tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Tasks;
