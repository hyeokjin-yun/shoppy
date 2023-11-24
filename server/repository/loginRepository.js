import {db} from '../db/database.js';

export async function login(id){
  const sql = 'select count(pass) as cnt, ANY_VALUE(pass) as pass from shoppy_member where id = ?';//count 함수를 통해 입력한 id와 일치하는 id가 db에 있는지 확인한다
  return db
    .execute(sql, [id])
    .then(rows => rows[0][0]);//결과값이 유니크하여 한줄이므로 [0][0]
};