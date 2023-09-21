const { queryAsyncWraper, queryAsyncWraperParam} = require('./createDatabase')

const getAllDepartments = async () => {
	try {
		const command =`SELECT * FROM departments`;
		return await queryAsyncWraperParam(command, [], 'all');
	} catch (error) {
		console.error("Error get all departments:", error);
	}
}

const getSubDepByDepId = async (dep_id) => {
	try {
		const command =`SELECT * FROM subdepartments WHERE department_id = ?`;
		return await queryAsyncWraperParam(command, [dep_id], 'all');
	} catch (error) {
		console.error("Error get all subdepartments:", error);
	}
}

const getPositionBySubDepId = async (subDep_id) => {
	try {
		const command =`SELECT * FROM positions WHERE subdepartment_id = ?`;
		return await queryAsyncWraperParam(command, [subDep_id], 'all');
	} catch (error) {
		console.error("Error get all position:", error);
	}
}

const getUserByPositionId = async (position_id) => {
  console.log('getUserByPositionId', position_id)
	try {
		const command =`SELECT * FROM users WHERE position_id = ?`;
		return await queryAsyncWraperParam(command, [position_id], 'all');
	} catch (error) {
		console.error("Error get all position:", error);
	}
}

module.exports = {
  getAllDepartments,
  getSubDepByDepId,
  getPositionBySubDepId,
  getUserByPositionId,
}