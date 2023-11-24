import {db} from '../db/database.js';


/**
 * insertOrder : 새로운 주문 추가
 */
export async function insertOrder(newOrderList){
      newOrderList.map((order) => {
            const sql = `
                  insert into 
                        shoppy_order
                         (id, pid, size, qty, totprice, odate)  
                  values (?, ?, ?, ?, ?, sysdate())`;

            db.execute(sql, [order.id, order.pid, order.size,order.qty, order.totPrice])
            .then((result) => 'ok');
      });

      return 'ok';
}

