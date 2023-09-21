const {
  queryAsyncWraper,
  queryAsyncWraperParam
} = require('./createDatabase')

//24.05.23
const getAllUsersNames = async () => {
  try {
    const command = `SELECT id, name FROM users`;
    return await queryAsyncWraperParam(command, [], 'all');
  } catch (error) {
    console.error("Error get all users name:", error);
  }
}
const getAllDepartments = async () => {
	try {
		const command =`SELECT * FROM departments`;
		return await queryAsyncWraperParam(command, [], 'all');
	} catch (error) {
		console.error("Error get all departments:", error);
	}
}
// const getAllSubdepartments = async (filterBy) => {
// 	try {
// 		const command =`SELECT * FROM subdepartments`;
// 		return await queryAsyncWraperParam(command, [], 'all');
// 	} catch (error) {
// 		console.error("Error get all subdepartments:", error);
// 	}
// }
//!13_06_23 переделан в getSubDepByDepId перенесен в ../../Database/queryCopmanyDivision
// const getAllSubdepartments = async (filterBy) => {
// 	try {
//     console.log('getAllSubdepartments', filterBy)
// 		const command =`SELECT * FROM subdepartments WHERE department_id = ?`;
// 		return await queryAsyncWraperParam(command, [filterBy], 'all');
// 	} catch (error) {
// 		console.error("Error get all subdepartments:", error);
// 	}
// }
// const getAllPosition = async () => {
// 	try {
// 		const command =`SELECT * FROM positions`;
// 		return await queryAsyncWraperParam(command, [], 'all');
// 	} catch (error) {
// 		console.error("Error get all position:", error);
// 	}
// }
const getAllPosition = async (filterBy) => {
	try {
		const command =`SELECT * FROM positions WHERE subdepartment_id = ?`;
		return await queryAsyncWraperParam(command, [filterBy], 'all');
	} catch (error) {
		console.error("Error get all position:", error);
	}
}


module.exports = {
  getAllUsersNames,
  getAllPosition,
  getAllDepartments,
}