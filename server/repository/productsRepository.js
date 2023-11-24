import {db} from '../db/database.js';

export async function insertProduct({image, name, price}){
  const sql = `insert into shoppy_products (image, name, price, pdate) values(?,?,?,curdate())`;
return db
  .execute(sql, [image, name, price])
  .then(result => 'ok');
}

export async function showProducts(){
  const sql = `select pid, image, name, price from shoppy_products`;
return db
  .execute(sql)
  .then(rows => rows[0]);
}

export async function productDetail(id){
  const sql = `select pid, image, name, price from shoppy_products where pid = ?`;
return db
  .execute(sql, [id])
  .then(rows => rows[0][0]);
}