import {db} from '../db/database.js';

export async function signup({id, name, hashpass, phone}){
  const sql = 'insert into shoppy_member (id, name, pass, phone, mdate) values(?, ?, ?, ?, sysdate())';
  return db
    .execute(sql, [id, name, hashpass, phone])
    .then(result => 'ok');
}

export async function getIdCheck(id){
  const sql = 'select count(id) as cnt from shoppy_member where id=?';
  return db
    .execute(sql, [id])
    .then(rows => rows[0][0]);
}