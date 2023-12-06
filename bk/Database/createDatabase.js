const userDataArray = [
  {
    id: 2,
    name: 'Татаркин',
    email: '7574',
    password: '7574',
    role: 'chife',
    department_id: '2',
    subdepartment_id: '2',
    position_id: '2'
  },
  {
    id: 3,
    name: 'Пономарев',
    email: '4970',
    password: '4970',
    role: 'general',
    department_id: '2',
    subdepartment_id: '2',
    position_id: '2'
  },
  {
    id: 4,
    name: 'Гущин',
    email: '6808',
    password: '6808',
    role: 'chife',
    department_id: '3',
    subdepartment_id: '3',
    position_id: '7'
  },
  {
    id: 5,
    name: 'Карыгин',
    email: '2251',
    password: '2251',
    role: 'user',
    department_id: '2',
    subdepartment_id: '2',
    position_id: '3'
  },
  {
    id: 6,
    name: 'Гуреева',
    email: '0218',
    password: '0218',
    role: 'user',
    department_id: '2',
    subdepartment_id: '2',
    position_id: '6'
  },
  {
    id: 7,
    name: 'Захаров',
    email: '8953',
    password: '8953',
    role: 'chife',
    department_id: '4',
    subdepartment_id: '4',
    position_id: '19'
  },
  {
    id: 8,
    name: 'Лелюх',
    email: '9536',
    password: '9536',
    role: 'chife',
    department_id: '4',
    subdepartment_id: '6',
    position_id: '27'
  },
  {
    id: 9,
    name: 'Соломон',
    email: '4665',
    password: '4665',
    role: 'chife',
    department_id: '3',
    subdepartment_id: '5',
    position_id: '15'
  },
  {
    id: 10,
    name: 'Кадуцков',
    email: '9962',
    password: '9962',
    role: 'general',
    department_id: '3',
    subdepartment_id: '3',
    position_id: 1
  }
];

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('../database.db')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const HASH_SALT = parseInt(process.env.KEY_SALT)
const SECRET_KEY = process.env.KEY_TOKEN

const queryAsyncWraper = (command, method = 'all') => {
  // console.log('comand', command, 'method', method)
  const db = new sqlite3.Database('../database.db')
  return new Promise((resolve, reject) => {
    db[method](command, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

const queryAsyncWraperParam = (command, params, method = 'all') => {
  // console.log('comand', command, 'params', params, 'method', method)
  const db = new sqlite3.Database('../database.db')
  return new Promise((resolve, reject) => {
    db[method](command, params, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
      // db.close()  
    })
  })
}

//15_06_23
const queryAsyncWraperTransaction = (command, params, method = 'all') => {
  console.log('comand', command, 'params', params, 'method', method);
  const db = new sqlite3.Database('../database.db');
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('BEGIN TRANSACTION');
      db[method](command, params, (err, result) => {
        if (err) {
          db.run('ROLLBACK');
          reject(err);
        } else {
          db.run('COMMIT');
          resolve(result);
        }
      });
    })
    db.close();
  })
}


const createTableTasks = async () => {
  try {
    await queryAsyncWraper(
      // command
      `CREATE TABLE IF NOT EXISTS tasks (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           task_id INTEGER NOT NULL,
           task_descript TEXT,
           task_priority TEXT,
           task_status TEXT NOT NULL,
           deadline DATETIME,
           appoint_user_id INTEGER NOT NULL,
           appoint_department_id INTEGER NOT NULL,
           appoint_subdepartment_id  INTEGER NOT NULL,
           appoint_position_id INTEGER NULL,
           responsible_user_id INTEGER NULL,
           responsible_department_id INTEGER NOT NULL,
           responsible_subdepartment_id INTEGER NOT NULL,
           responsible_position_id INTEGER NULL,
           created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
           approved_on DATETIME,                              -- Дата согласования задачи
           reject_on DATETIME,                                -- Дата отклонения задачи
           confirmation_on DATETIME,                          -- Дата запрос на подтверждение задачи
           closed_on DATETIME,                                -- Дата закрытия задачи
           setResponseSubDep_on DATETIME,                     -- Дата назначения отдела
           setResponseUser_on DATETIME,                       -- Дата назначения пользователя
           FOREIGN KEY(appoint_user_id) REFERENCES users(id)
           FOREIGN KEY(appoint_department_id) REFERENCES departments(id),
           FOREIGN KEY(appoint_subdepartment_id) REFERENCES subdepartments(id)
           FOREIGN KEY(appoint_position_id) REFERENCES position(id)
           FOREIGN KEY(responsible_user_id) REFERENCES users(id)
           FOREIGN KEY(responsible_department_id) REFERENCES departments(id),
           FOREIGN KEY(responsible_subdepartment_id) REFERENCES subdepartments(id)
           FOREIGN KEY(responsible_position_id) REFERENCES position(id)
       )`, "run")
  } catch (error) {
    console.log('DB ERROR: ', error)
  }
}
// SELECT comments.comment, comments.created_at FROM comments
// INNER JOIN tasks ON comments.task_id = tasks.id
// WHERE tasks.id = 1;


const createTableTasksComments = async () => {
  try {
    await queryAsyncWraper(
      // command
      `CREATE TABLE IF NOT EXISTS task_comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_id INTEGER,
        user_id INTEGER,
        comment VARCHAR(255),
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(task_id) REFERENCES tasks(id),
        FOREIGN KEY(user_id) REFERENCES users(id)
       )`, "run")
  } catch (error) {
    console.log('DB ERROR: ', error)
  }
}

// SELECT task_files.file_name, task_files.file_path, task_files.uploaded_on FROM task_files
// INNER JOIN tasks ON task_files.task_id = tasks.id
// WHERE tasks.id = 1;

const createTableTasksFiles = async () => {
  try {
    await queryAsyncWraper(
      // command
      `CREATE TABLE IF NOT EXISTS task_files (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_id INTEGER,
        user_id INTEGER,
        file_name TEXT,
        file_path TEXT,
        uploaded_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(task_id) REFERENCES tasks(id),
        FOREIGN KEY(user_id) REFERENCES users(id)
       )`, "run")
  } catch (error) {
    console.log('DB ERROR: ', error)
  }
}

//!------------------------------------------------
const createTableDepartments = async () => {
  try {
    await queryAsyncWraper(
      `CREATE TABLE IF NOT EXISTS departments  (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      )`, 'run')
    // Выполняем проверку наличия записей в таблице
    const rows = await queryAsyncWraper('SELECT COUNT(*) FROM departments', 'get');
    if (rows['COUNT(*)'] === 0) { // Если записей нет, то выполняем вставку начальных значений
      await queryAsyncWraper("INSERT INTO departments (name) VALUES ('новый'), ('Гелио-Пакс'), ('Алексиковский Э.'), ('Панфиловский Э.')", 'run');
    }
  } catch (error) {
    console.error('createTableDepartments ERROR: ', error);
  }
}
const createTableSubdepartments = async () => {
  try {
    await queryAsyncWraper(
      `CREATE TABLE IF NOT EXISTS subdepartments    (
        id INTEGER PRIMARY KEY,
        department_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        FOREIGN KEY (department_id) REFERENCES departments(id)
      )`, 'run')
    // Выполняем проверку наличия записей в таблице
    const rows = await queryAsyncWraper('SELECT COUNT(*) FROM subdepartments ', 'get');
    if (rows['COUNT(*)'] === 0) { // Если записей нет, то выполняем вставку начальных значений
      await queryAsyncWraper("INSERT INTO subdepartments (department_id, name) VALUES (1, 'новый'), (2, 'ХПР'), (3, 'Служба Гл. Инженера'), (4, 'Служба Гл. Инженера'), (3, 'Служба Качества'), (4, 'Служба Качества')", 'run');
    }
  } catch (error) {
    console.error('createTableSubdepartments ERROR: ', error);
  }
}
const createTablePositions = async () => {
  try {
    await queryAsyncWraper(
      `CREATE TABLE IF NOT EXISTS positions     (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        department_id INTEGER NOT NULL,
        subdepartment_id INTEGER,
        FOREIGN KEY (department_id) REFERENCES departments(id),
        FOREIGN KEY (subdepartment_id) REFERENCES subdepartments(id)
      )`, 'run')
    // Выполняем проверку наличия записей в таблице
    const rows = await queryAsyncWraper('SELECT COUNT(*) FROM positions  ', 'get');
    if (rows['COUNT(*)'] === 0) { // Если записей нет, то выполняем вставку начальных значений
      // await queryAsyncWraper("INSERT INTO positions (name,  department_id, subdepartment_id) VALUES ('новый', 1, 1), ('Начальник ХПР', 2, 2), ('Гл. специалист по монтажу', 2, 2), ('Инженер АСУ ТП', 2, 2), ('Гл. Энергетик', 2, 2), ('Инженер по ГХ', 2, 2), ('Гл. Инженер', 3, 3), ('Гл. механик', 3, 3), ('Инженер по механизации', 3, 3), ('Инженер по аспирации', 3, 3), ('Гл. энергетик', 3, 3), ('Инженер АСУ ТП', 3, 3), ('Инженер КИПиА', 3, 3), ('Зав гаражом', 3, 3), ('Гл. Инженер', 4, 4), ('Гл. механик', 4, 4), ('Инженер по механизации',4, 4), ('Инженер по аспирации', 4, 4), ('Гл. энергетик', 4, 4), ('Инженер АСУ ТП', 4, 4), ('Инженер КИПиА', 4, 4), ('Зав гаражом',4, 4) ", 'run');
      await queryAsyncWraper("INSERT INTO positions (name,  department_id, subdepartment_id) VALUES ('новый', 1, 1), ('Начальник ХПР', 2, 2), ('Гл. специалист по монтажу', 2, 2), ('Инженер АСУ ТП', 2, 2), ('Гл. Энергетик', 2, 2), ('Инженер по ГХ', 2, 2), ('Гл. Инженер', 3, 3), ('Гл. механик', 3, 3), ('Инженер по механизации', 3, 3), ('Инженер по аспирации', 3, 3), ('Гл. энергетик', 3, 3), ('Инженер АСУ ТП', 3, 3), ('Инженер КИПиА', 3, 3), ('Зав гаражом', 3, 3), ('Зам. по производству', 3, 5), ('Нач. Лаб', 3, 5), ('Cт. мастер', 3, 5), ('Мастер ПРР', 3, 5), ('Гл. Инженер', 4, 4), ('Гл. механик', 4, 4), ('Инженер по механизации',4, 4), ('Инженер по аспирации', 4, 4), ('Гл. энергетик', 4, 4), ('Инженер АСУ ТП', 4, 4), ('Инженер КИПиА', 4, 4), ('Зав гаражом',4, 4), ('Зам. по производству', 4, 6), ('Нач. Лаб', 4, 6), ('Ст. Мастер Эл-1', 4, 6), ('Ст. Мастер Эл-2', 4, 6), ('Мастер ПРР', 4, 6)", 'run');
    }
  } catch (error) {
    console.error('createTablePositions ERROR: ', error);
  }
}
const createTableUsers = async () => {
  try {
    await queryAsyncWraper(
      // command
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        department_id INTEGER,
        subdepartment_id INTEGER,
        position_id INTEGER,
        FOREIGN KEY (department_id) REFERENCES departments(id),
        FOREIGN KEY (subdepartment_id) REFERENCES subdepartments(id),
        FOREIGN KEY (position_id) REFERENCES positions(id)
      )`,
      'run'
    )
    //! Выполняем проверку наличия записей в таблице
    const rows = await queryAsyncWraper('SELECT COUNT(*) FROM users', 'get');
    if (rows['COUNT(*)'] === 0) { // Если записей нет, то выполняем вставку начальных значений
      const hashedPassword = await bcrypt.hash('0091', HASH_SALT);
      const objUser = {
        id: 1,
        name: 'admin',
        email: 'admin',
        password: hashedPassword,
        role: 'admin'
      }; //console.log('>>>>>>>>>>>>', objUser)
      const {
        name,
        email,
        password,
        role
      } = objUser
      const command = `INSERT INTO users(name, email, password, role, department_id, subdepartment_id, position_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      await queryAsyncWraperParam(command, [name, email, password, role || 'user', 1, 1, 1], 'run', )
    }
  } catch (error) {
    console.error('createTableUsers ERROR: ', error);
  }
}
//!------------------------------------------------
const createTableTokens = async () => {
  try {
    await queryAsyncWraper(
      // command
      `CREATE TABLE IF NOT EXISTS tokens  (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        token TEXT NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )`,
      // method
      "run"
    )
    //! Выполняем проверку наличия записей в таблице
    const rows = await queryAsyncWraper('SELECT COUNT(*) FROM tokens', 'get');
    if (rows['COUNT(*)'] === 0) { // Если записей нет, то выполняем вставку начальных значений
      const hashedPassword = await bcrypt.hash('admin', HASH_SALT);
      const objUser = {
        id: 1,
        name: 'admin',
        email: 'admin',
        password: hashedPassword,
        role: 'admin'
      };
      console.log('>>>>>>>>>>>>', objUser)
      const token = jwt.sign(objUser, SECRET_KEY);
      console.log('>>>>>>>>>>>>', token)
      const command = `INSERT INTO tokens(user_id, token) VALUES (?, ?)`;
      await queryAsyncWraperParam(command, [objUser.id, token], `run`)
      await createUsers(userDataArray)
    }
  } catch (error) {
    console.error("Error creating tokens table:", error);
  }
};


const createUsers = async (userDataArray) => {
  // console.log(userDataArray)
  try {
    // добавление пользователей при создании БД 13.07.23
    for (const userData of userDataArray) {
      const {
        id,
        name,
        email,
        password,
        role,
        department_id,
        subdepartment_id,
        position_id
      } = userData;

      // Генерация токена для каждого пользователя
      const objUser = {
        id,
        name,
        email,
        role: role || 'user'
      };
      const token = jwt.sign(objUser, SECRET_KEY);

      // Хеширование пароля
      const hashedPassword = await bcrypt.hash(password, HASH_SALT);

      const command = `INSERT INTO users(id, name, email, password, role, department_id, subdepartment_id, position_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      await queryAsyncWraperParam(command, [id, name, email, hashedPassword, role || 'user', department_id, subdepartment_id, position_id]);

      // Вставка токена в таблицу "tokens"
      const tokenCommand = `INSERT INTO tokens(user_id, token) VALUES (?, ?)`;
      await queryAsyncWraperParam(tokenCommand, [id, token], `run`);
    }
  } catch (error) {
    console.error("Error creating tokens table:", error);
  }
}
// ----------------------------------------------------------------------------
const createVenchelTable = async () => {
  try {
    await queryAsyncWraper(
      `CREATE TABLE IF NOT EXISTS venchels (
           id TEXT PRIMARY KEY,
           position TEXT NOT NULL,
           type TEXT NOT NULL,
           pos_num TEXT NOT NULL,
           model TEXT NOT NULL,
           location TEXT NOT NULL,
           power TEXT NOT NULL,
           width TEXT NOT NULL,
           height TEXT NOT NULL,
           department_id INTEGER,
           sector_id INTEGER,
           FOREIGN KEY (department_id) REFERENCES departments (id)
       )`
    )
  } catch (error) {
    console.log('DB ERROR: ', error)
  }
}

const createTableVenchelFiles = async () => {
  try {
    await queryAsyncWraper(
      // command
      `CREATE TABLE IF NOT EXISTS venchel_files (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        venchel_id INTEGER,
        file_name TEXT,
        file_path TEXT,
        uploaded_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(venchel_id) REFERENCES venchels(id)
       )`, "run")
  } catch (error) {
    console.log('DB ERROR: ', error)
  }
}


db.serialize(async () => {
  createTableTasks()
  createTableUsers()
  createTableTokens()
  createTableDepartments()
  createTableSubdepartments()
  createTablePositions()
  createTableTasksComments()
  createTableTasksFiles()
  createVenchelTable()
  createTableVenchelFiles()
})

module.exports = {
  queryAsyncWraper,
  queryAsyncWraperParam,
  queryAsyncWraperTransaction,
}