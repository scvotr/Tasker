const {
  queryAsyncWraper,
  queryAsyncWraperParam
} = require('./createDatabase')

//12_06_23
const getUserFullPosition = async (user_id) => {
  try {
    const command = `
      SELECT 
        u.name AS user_name, p.name AS position_name, s.name AS subdepartment_name, d.name AS department_name
      FROM users u
        LEFT JOIN positions p ON u.position_id = p.id
        LEFT JOIN subdepartments s ON u.subdepartment_id = s.id
        LEFT JOIN departments d ON s.department_id = d.id
      WHERE u.id = ?
      `;
    return await queryAsyncWraperParam(command, [user_id], 'all');
  } catch (error) {
    console.error("Error get all users name:", error);
  }
}

const getMypositions = async (dep_id) => {
  try {
    const command = `
      SELECT positions.*, subdepartments.name AS subdepartment_name, departments.name AS department_name
      FROM positions
        JOIN subdepartments ON positions.subdepartment_id = subdepartments.id
        JOIN departments ON subdepartments.department_id = departments.id
      WHERE positions.department_id = ?
      `;
    return await queryAsyncWraperParam(command, [dep_id], 'all');
  } catch (error) {
    console.error("Error get all users name:", error);
  }
}

// !----------------------------------------------
// !----------------------------------------------
// !----------------------------------------------
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
const getAllSubdepartments = async (filterBy) => {
	try {
		const command =`SELECT * FROM subdepartments WHERE department_id = ?`;
		return await queryAsyncWraperParam(command, [filterBy], 'all');
	} catch (error) {
		console.error("Error get all subdepartments:", error);
	}
}
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
const getAllUsers = async () => {
  try {
    const command = `
      SELECT 
      users.id, 
        users.name, 
        users.email, 
        users.role, 
        departments.id AS department_id,
        departments.name AS department, 
        subdepartments.id AS subdepartment_id,
        subdepartments.name AS subdepartment,
        positions.id AS position_id,
        positions.name AS position
      FROM 
        users 
        LEFT JOIN departments ON users.department_id = departments.id
        LEFT JOIN subdepartments ON users.subdepartment_id = subdepartments.id
        LEFT JOIN positions ON users.position_id = positions.id;
    `;
    return await queryAsyncWraperParam(command, [], 'all');
  } catch (error) {
    console.error("Error get all users:", error);
  }
}

const updateUserParams = async (user) => {
  const { id, name, email, role, departmentId, subdepartmentId, positionsId } = user;
  const command = `UPDATE users SET name = ?, email = ?, role = ?, department_id = ?, subdepartment_id = ?, position_id = ? WHERE id = ?`;
  await queryAsyncWraperParam(command, [ name, email, role, departmentId, subdepartmentId, positionsId, id ], 'run');
}

module.exports = {
  getUserFullPosition,
  getMypositions,
}