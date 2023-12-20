const { queryAsyncWraperParam } = require ("../createDatabase");

const getDepartments = async () => {
	try {
		const command =`SELECT * FROM departments`;
		return await queryAsyncWraperParam(command, [], 'all');
	} catch (error) {
		console.error("Error get all Departments:", error);
	}
}
const getDepartmentsFrom = async () => {
	try {
		const command =`SELECT * FROM departments WHERE id >= 3`;
		return await queryAsyncWraperParam(command, [], 'all');
	} catch (error) {
		console.error("Error get all Departments:", error);
	}
}

const getSubDepartments = async () => {
	try {
		const command =`SELECT * FROM subdepartments`;
		return await queryAsyncWraperParam(command, [], 'all');
	} catch (error) {
		console.error("Error get all SubDepartments:", error);
	}
}

const getPositions = async () => {
	try {
		const command =`SELECT * FROM positions`;
		return await queryAsyncWraperParam(command, [], 'all');
	} catch (error) {
		console.error("Error get all Position:", error);
	}
}

const getAllWorkshops = async () => {
	try {
		const command =`SELECT * FROM workshops`;
		return await queryAsyncWraperParam(command, [], 'all');
	} catch (error) {
		console.error("Error get all Workshops:", error);
	}
}

const getWorkshopsByDepID = async (dep_id) => {
	try {
		const command =`SELECT * FROM workshops WHERE department_id = ?`;
		return await queryAsyncWraperParam(command, [dep_id], 'all');
	} catch (error) {
		console.error("Error get all Workshops:", error);
	}
}

module.exports = {
  getDepartments,
	getDepartmentsFrom,
  getSubDepartments,
  getPositions,
	getAllWorkshops,
	getWorkshopsByDepID,
}