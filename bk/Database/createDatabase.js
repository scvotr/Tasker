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


const insertTasks = `
  INSERT INTO tasks 
  VALUES 
    (5,'0e8f694a-a47e-441e-8569-91c9399c61ef','Назначить на старшего мастера','false','closed','2023-08-28',11,2,2,NULL,NULL,3,5,17,'2023-08-25 05:19:23','2023-08-25 05:20:18',NULL,'2023-12-11 07:32:08','2023-12-11 07:32:45','2023-12-11 07:32:01',NULL),
    (6,'b5bb005a-8259-4237-9d79-dee29755f4a7','Назначить на лабораторию','false','closed','2023-08-25',11,2,2,NULL,NULL,3,5,16,'2023-08-25 05:20:00','2023-08-25 05:20:16',NULL,'2023-08-25 05:47:40','2023-08-25 07:31:59','2023-08-25 05:43:46',NULL),
    (7,'aa0a14ca-14b9-4b0e-ac30-82470d0ab822','Назначить на Ткаченко','false','closed','2023-08-29',11,2,2,NULL,NULL,4,4,24,'2023-08-25 09:06:37','2023-08-25 09:07:16',NULL,'2023-08-25 09:08:51','2023-08-25 09:09:26','2023-08-25 09:07:56',NULL),
    (8,'ad1aabc7-0557-4ba8-bde2-df7c78d17a1b','Выбрать ответсвенного ','false','closed','2023-08-30',11,2,2,NULL,NULL,3,3,12,'2023-08-29 11:48:06','2023-08-29 11:48:24',NULL,'2023-08-29 11:49:51','2023-08-29 11:50:10','2023-08-29 11:48:55',NULL),
    (9,'04077411-35c5-4f7a-b685-c8dce1cf8b35','Провести замену датчиков уровней на ДСП50 №2 совместно с Шуваевым Д.О.','false','closed','2023-08-31',11,2,2,NULL,NULL,3,3,12,'2023-08-29 12:48:44','2023-08-29 13:06:27',NULL,'2023-09-01 08:33:17','2023-09-04 06:04:18','2023-08-29 13:10:54',NULL),
    (10,'b466540c-3e4a-415c-ac9c-f6810a906dd8','Закрыть договор с Энергохолдингом, раздел автоматизация.','false','closed','2023-09-01',11,2,2,NULL,NULL,3,3,11,'2023-08-29 12:49:49','2023-08-29 13:06:20',NULL,'2023-10-18 13:14:42','2023-10-19 08:51:21','2023-08-29 13:11:08',NULL),
    (11,'5c9c8a2a-9cac-4b06-8053-d20c79f4b6fe','Необходимо проверить исправленый вариант проекта по электротехнической части 1 элеватора от Энергохолдинга. ','false','closed','2023-09-01',11,2,2,NULL,NULL,3,3,11,'2023-08-29 12:50:56','2023-08-29 13:06:13','2023-08-30 13:15:05','2023-11-07 12:25:55','2023-11-07 12:45:16','2023-08-29 13:11:15',NULL),
    (12,'62d43a32-4e5a-42da-ad34-cd6aac5af2a3','Найти протоколы ежегодных проверок и испытаний кабельной продукции. ','false','closed','2023-09-05',11,2,2,NULL,NULL,3,3,11,'2023-08-30 11:10:30','2023-08-30 12:55:25','2023-11-07 12:45:26','2023-11-15 12:31:23','2023-11-16 08:55:42','2023-09-18 12:37:11',NULL),
    (13,'31909b57-f1f5-4a23-9b1a-31289c5f6454','Составить перечень замечаний из экспертиз технических устройств и зданий сооружений. Отметить выполненные замечания, а по неустраненным замечаниям составить график устранения, с назначением ответственного лица и срока устранения.','false','closed','2023-09-11',2,2,2,NULL,NULL,4,4,19,'2023-08-30 13:18:23','2023-08-30 13:19:25',NULL,'2023-09-06 10:06:50','2023-09-06 10:24:32','2023-09-05 06:24:12',NULL),
    (14,'f1d90ede-83fb-4370-87da-5c6bedef2ed0','Составить перечень замечаний из экспертиз технических устройств и зданий сооружений. Отметить выполненные замечания, а по неустраненным замечаниям составить график устранения, с назначением ответственного лица и срока устранения.','false','inWork','2023-09-11',2,2,2,NULL,NULL,3,3,7,'2023-08-30 13:21:26','2023-08-30 13:24:07',NULL,NULL,NULL,'2023-09-01 08:34:22',NULL),
    (16,'db49c914-27d1-4e9e-a5c7-fc3099f51551','Оценинить износ кабельной продукции','false','closed','2023-09-14',11,2,2,NULL,NULL,3,3,11,'2023-09-04 09:25:57','2023-09-04 11:03:58',NULL,'2023-10-18 13:17:43','2023-10-19 08:51:27','2023-09-18 12:37:02',NULL),
    (20,'a0438bfe-c35d-4f33-9088-c0539cbcec03','Подготовить дефектные ведомости и план мероприятий по ремонту на 2024 год.','false','closed','2023-10-09',2,2,2,NULL,NULL,3,3,7,'2023-09-14 11:03:13','2023-09-14 11:04:08',NULL,'2023-11-16 12:38:02','2023-11-16 12:38:26','2023-09-18 12:36:52',NULL),
    (21,'9a1e6b29-70fc-4518-82de-3cb020c7f144','Подготовить дефектные ведомости и план мероприятий по ремонту на 2024 год.','false','needToConfirm','2023-10-09',2,2,2,NULL,NULL,4,4,19,'2023-09-14 11:04:47','2023-09-14 11:04:54',NULL,'2023-11-17 04:53:57',NULL,'2023-09-18 12:38:53',NULL),
    (22,'32e65ace-198f-4c76-9937-ca754cbc6ed4','Представить таблицу по поверке средств измерения за 2023 год.','false','closed','2023-10-02',2,2,2,NULL,NULL,3,3,7,'2023-09-14 11:07:11','2023-09-14 11:07:18',NULL,'2023-11-15 13:23:55','2023-11-16 12:38:16','2023-09-18 12:36:44',NULL),
    (23,'c8fba3e5-dd36-4b1e-8015-de6ae854bfe1','Заполнить таблицу по аспирационному оборудованию.','false','inWork','2023-10-15',2,2,2,NULL,NULL,3,3,10,'2023-09-14 12:16:45','2023-09-14 12:17:59',NULL,NULL,NULL,'2023-09-18 12:36:05',NULL),
    (24,'2218fb8a-9471-4f8f-a905-9275dc4fded2','Заполнить таблицу по аспирационному оборудованию.','false','inWork','2023-10-15',2,2,2,NULL,NULL,4,4,22,'2023-09-14 12:16:57','2023-09-14 12:17:57',NULL,NULL,NULL,'2023-09-18 12:38:41',NULL),
    (25,'205c95bb-7ca5-4103-888f-15d007167479','Проверить наличие и соответствие паспортов аспирационных установок и взрыворазрядителей. В случае отсутствия или не соответствия изготовить новые.','false','inWork','2023-10-15',2,2,2,NULL,NULL,3,3,10,'2023-09-14 12:17:23','2023-09-14 12:17:54',NULL,NULL,NULL,'2023-09-18 12:35:50',NULL),
    (26,'77818cf2-a256-43d8-abae-725fb77c7062','Проверить наличие и соответствие паспортов аспирационных установок и взрыворазрядителей. В случае отсутствия или не соответствия изготовить новые.','false','inWork','2023-10-15',2,2,2,NULL,NULL,4,4,20,'2023-09-14 12:17:40','2023-09-14 12:17:51',NULL,NULL,NULL,'2023-09-18 12:38:19',NULL),
    (27,'f686dfbc-68d2-410c-9a54-7d2ce72e37ac','Разработать программу обучения по работе аспирационных установок, согласовать и провести обучение мастеров и аппаратчиков элеватора, с отметкой в журнале.','false','inWork','2023-12-31',2,2,2,NULL,NULL,3,3,7,'2023-09-27 08:28:13','2023-09-27 08:29:58',NULL,NULL,NULL,'2023-10-18 12:52:23',NULL),
    (28,'6ddd5b9d-681f-4eb0-bc60-ec200a769a0d','Провести расследование причин выхода из строя нового редуктора разгрузочной тележке. ','false','needToConfirm','2023-10-09',2,2,2,NULL,NULL,3,3,11,'2023-09-27 08:29:36','2023-09-27 08:29:45','2023-11-16 12:38:01','2023-11-20 12:21:26',NULL,'2023-10-18 12:51:39',NULL),
    (29,'d53eac4c-b036-4d92-8080-df696d77fa86','Провести ревизию датчиков безопасности на оборудовании 1 элеватора. Установить несоотвествие типа датчика и крепления, а так же неообходимости замены крепления. Уточнить количество датчиков и матриалов для креплений и работы (услуги стороних) неообходимое для включение в план.','false','closed','2023-10-20',11,2,2,NULL,NULL,3,3,13,'2023-10-17 04:59:25','2023-10-18 04:56:53','2023-11-07 12:45:30','2023-11-15 11:17:10','2023-11-16 08:55:33','2023-10-18 12:50:50',NULL),
    (30,'3ab0c1f3-828f-4e65-8d3d-601b8421f7b4','Уточнить количество новых датчиков верхнего уровня согласно проекта(15-ЭХ-2023-АК). Заложить в план на следующий год датчики и работы по их установке. ','false','closed','2023-10-25',11,2,2,NULL,NULL,3,3,11,'2023-10-17 06:35:27','2023-10-18 04:56:48','2023-11-07 12:45:35','2023-11-17 08:14:35','2023-11-20 04:55:26','2023-10-18 12:48:09',NULL),
    (31,'24ae275b-ae0b-46dc-8867-f6352f76cb11','Расмотреть возможность установки пусковой аппаратуры марки Chint на двигатели 37-42кВт(нории), 55кВт(вентиляторы). По одному для каждого номинала. С целью проверки работы данного оборудования без примемения УПП. ','false','closed','2023-10-20',11,2,2,NULL,NULL,3,3,13,'2023-10-18 04:30:04','2023-10-18 04:56:42',NULL,'2023-11-16 12:34:11','2023-11-20 04:55:32','2023-10-18 12:47:51',NULL),
    (32,'b1b6e8f1-7f75-4e9f-86be-fd96a005fe46','Прошу согласовать и подписать техническое задание на реконструкцию элеватора №2.','false','closed','2023-11-15',11,2,2,NULL,NULL,4,4,23,'2023-11-13 05:07:04','2023-11-16 08:58:26',NULL,'2023-12-11 08:29:56','2023-12-11 08:55:28','2023-12-11 08:29:13',NULL),
    (33,'d847f4ba-abb9-4456-a6c1-225fd25dbc8a','Привести в соотвествие должностные инструкции: инжнер АСУТП, инженер КИПиА, наладчики КИПиА. ','false','inWork','2023-12-15',11,2,2,NULL,NULL,3,3,7,'2023-11-28 07:22:32','2023-12-01 06:59:05',NULL,NULL,NULL,'2023-12-01 07:05:30',NULL),
    (34,'b1c05d0a-1d4d-47cb-a407-e2032e20bf06','Провести дефектовку постов управления. Из за состояни корпусов и нарушения греметичности плановая замена кнопок и контактных груп не целесообраза. Рассмотреть вариант замены кнопочных постов.','false','inWork','2023-12-22',11,2,2,NULL,NULL,4,4,25,'2023-12-11 05:47:37','2023-12-11 07:29:45',NULL,NULL,NULL,'2023-12-11 08:28:56',NULL);
  `

const insertTasksFiles = `
  INSERT INTO task_files
  VALUES 
    (7,'0e8f694a-a47e-441e-8569-91c9399c61ef',NULL,'1692940762832.jpg',NULL,'2023-08-25 05:19:23'),
    (8,'0e8f694a-a47e-441e-8569-91c9399c61ef',NULL,'1692940763032.jpg',NULL,'2023-08-25 05:19:23'),
    (10,'db49c914-27d1-4e9e-a5c7-fc3099f51551',NULL,'1693819574615.jpg',NULL,'2023-09-04 09:26:14'),
    (11,'db49c914-27d1-4e9e-a5c7-fc3099f51551',NULL,'1693819759127.jpg',NULL,'2023-09-04 09:29:19'),
    (12,'db49c914-27d1-4e9e-a5c7-fc3099f51551',NULL,'1693819777353.jpg',NULL,'2023-09-04 09:29:37'),
    (13,'db49c914-27d1-4e9e-a5c7-fc3099f51551',NULL,'1693819794387.jpg',NULL,'2023-09-04 09:29:54'),
    (20,'b1c05d0a-1d4d-47cb-a407-e2032e20bf06',NULL,'1702273654755.jpg',NULL,'2023-12-11 05:47:37'),
    (21,'b1c05d0a-1d4d-47cb-a407-e2032e20bf06',NULL,'1702273656378.jpg',NULL,'2023-12-11 05:47:37');
`

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('../database.db')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const HASH_SALT = parseInt(process.env.KEY_SALT)
const SECRET_KEY = process.env.KEY_TOKEN

const queryAsyncWraper = (command, method = 'all') => {
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
    // ДОБАВИТЬ ПОТОМ dep_ID!!!!
    await queryAsyncWraper(
      `CREATE TABLE IF NOT EXISTS departments  (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      )`, 'run')
    // Выполняем проверку наличия записей в таблице
    const rows = await queryAsyncWraper('SELECT COUNT(*) FROM departments', 'get');
    if (rows['COUNT(*)'] === 0) { // Если записей нет, то выполняем вставку начальных значений
      await queryAsyncWraper("INSERT INTO departments (name) VALUES ('новый'), ('Гелио-Пакс'), ('Алексиковский Э.'), ('Панфиловский Э.')", 'run');
      // await queryAsyncWraper("INSERT INTO tasks (id,task_id,task_descript,task_priority,task_status,deadline,appoint_user_id,appoint_department_id,appoint_subdepartment_id,appoint_position_id,responsible_user_id,responsible_department_id,responsible_subdepartment_id,responsible_position_id,created_on,approved_on,reject_on,confirmation_on,closed_on,setResponseSubDep_on,setResponseUser_on) VALUES (5,'0e8f694a-a47e-441e-8569-91c9399c61ef','Назначить на старшего мастера','false','closed','2023-08-28',11,2,2,NULL,NULL,3,5,17,'2023-08-25 05:19:23','2023-08-25 05:20:18',NULL,'2023-12-11 07:32:08','2023-12-11 07:32:45','2023-12-11 07:32:01',NULL)")
      // await queryAsyncWraper(insertTasks)
      // await queryAsyncWraper(insertTasksFiles)
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
        pin_code INTEGER, --временно 
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

      console.log(`User ${userData.id} successfully created.`);

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
      // await createUsers(userDataArray)
    }
  } catch (error) {
    console.error("Error creating tokens table:", error);
  }
};

// ----------------------------------------------------------------------------
const createTableWorkshops = async () => {
  try {
    await queryAsyncWraper(
      `CREATE TABLE IF NOT EXISTS workshops (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        department_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        FOREIGN KEY (department_id) REFERENCES departments(id)
      )`, 'run');
      
    // Выполняем проверку наличия записей в таблице
    const rows = await queryAsyncWraper('SELECT COUNT(*) FROM workshops', 'get');
    if (rows['COUNT(*)'] === 0) { // Если записей нет, то выполняем вставку начальных значений
      // 3-Алексиков 4-Панфилово
      await queryAsyncWraper("INSERT INTO workshops (department_id, name) VALUES (3, 'Элеватор №1'), (3, 'Элеватор №2'), (4, 'Элеватор №1'), (4, 'Элеватор №2'), (4, 'Склад №5'), (4, 'Склады')", 'run');
    }
  } catch (error) {
    console.error('createTableWorkshops ERROR: ', error);
  }
}

const createVenchelTable = async () => {
  try {
    await queryAsyncWraper(
      `CREATE TABLE IF NOT EXISTS venchels (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           venchel_id INTEGER NOT NULL,
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
           workshop_id INTEGER,
           FOREIGN KEY (department_id) REFERENCES departments (id),
           FOREIGN KEY (workshop_id) REFERENCES workshops (id)
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
        FOREIGN KEY(venchel_id) REFERENCES venchels(venchel_id)
       )`, "run")

    try {
      await queryAsyncWraper(`ALTER TABLE venchel_files ADD COLUMN create_on DATE;`, 'run')
    } catch (error) {
      console.log('createTableVenchelFiles -> ALTER TABLE venchel_files ADD COLUMN: ', error)
    }    
       
  } catch (error) {
    console.log('DB ERROR: ', error)
  }
}

const createTablePendingNotifications = async () => {
  try {
    await queryAsyncWraper(
      `CREATE TABLE IF NOT EXISTS pending_notifications (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         user_id INTEGER NOT NULL,
         message TEXT NOT NULL,
         created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         FOREIGN KEY(user_id) REFERENCES users(id)
       )`, "run")
  } catch (error) {
    console.log('DB ERROR: ', error)
  }
}

// Добавление уведомления
const addPendingNotification = async (userId, message) => {
  try {
    const command = `INSERT INTO pending_notifications (user_id, message) VALUES (?, ?)`;
    await queryAsyncWraperParam(command, [userId, message], 'run'); // 'run' для добавления
    console.log('Notification added to pending_notifications table');
  } catch (error) {
    console.error('Error adding notification to pending_notifications:', error);
  }
};
// Обновление уведомления
const updatePendingNotification = async (userId, message) => {
  try {
    const command = `UPDATE pending_notifications SET message = ? WHERE user_id = ?`;
    await queryAsyncWraperParam(command, [message, userId], 'run'); // 'run' для обновления, обратите внимание на измененный порядок параметров
    console.log('Notification updated in pending_notifications table');
  } catch (error) {
    console.error('Error updating notification in pending_notifications:', error);
  }
};
// Получение уведомлений пользователя
const getPendingNotification = async (userId) => {
  try {
    const command = `SELECT * FROM pending_notifications WHERE user_id = ?`;
    return await queryAsyncWraperParam(command, [userId], 'all'); // 'all' для получения всех записей
  } catch (error) {
    console.error('Error getting notification from pending_notifications:', error);
  }
};
// Удаление уведомления
const deletePendingNotification = async (userId) => {
  try {
    const command = `DELETE FROM pending_notifications WHERE user_id = ?`;
    return await queryAsyncWraperParam(command, [userId], 'run'); // 'run' для удаления
  } catch (error) {
    console.error('Error deleting notification from pending_notifications:', error);
  }
};



db.serialize(async () => {
  console.log('dddddddddddddddddddddddd')
  createTableTasks()
  createTableUsers()
  createTableTokens()
  createTableDepartments()
  createTableSubdepartments()
  createTablePositions()
  createTableTasksComments()
  createTableTasksFiles()
  createTableWorkshops()
  createVenchelTable()
  createTableVenchelFiles()
  createTablePendingNotifications()
  addPendingNotification()
  getPendingNotification()
})

module.exports = {
  queryAsyncWraper,
  queryAsyncWraperParam,
  queryAsyncWraperTransaction,
}
