const { queryAsyncWraperParam } = require ("../createDatabase");

const getUsersBySubDepId = async (position_id) => {
	try {
		const command =`SELECT id, name FROM users WHERE position_id = ?`;
		return await queryAsyncWraperParam(command, [position_id], 'all');
	} catch (error) {
		console.error("Error get all users by position id:", error);
	}
}

module.exports = {
	getUsersBySubDepId,
}