import * as loginRepository from '../repository/loginRepository.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function login(req, res){
  const {id, pass} = req.body;
  const result = await loginRepository.login(id);
  if(result.cnt === 1){//count함수를 통해 id 유무를 확인/일치하는 id가 없으면 pass는 null. javascript는 undefined로 인식하며, 에러 발생
    if(await bcrypt.compare(pass, result.pass)) {
      result.login_result = true;
      const token = jwt.sign({id : id}, '58Ua|!{@>3{*');
      result.token = token;
    }else{
      result.login_result = false;
    }
  }else{
    result.login_result = false;
  };
  res.json(result);
};

//'select count(pass) as cnt, pass from shoppy_member where id = ?'
//repository에서 불러온 데이터, sql 버전 차이로 인한 에러 발생 / 몇가지 해결방법 있음 ANY_VALUE나 group by / 벤치워크는 자체적으로 커버해서 에러가 발생하지 않는다

// C:\dev\react\shoppy\server\node_modules\mysql2\promise.js:374
//     const localErr = new Error();
//                      ^

// Error: In aggregated query without GROUP BY, expression #2 of SELECT list contains nonaggregated column 'hrdb2019.shoppy_member.pass'; this is incompatible with sql_mode=only_full_group_by
//     at PromisePool.execute (C:\dev\react\shoppy\server\node_modules\mysql2\promise.js:374:22)
//     at Module.login (file:///C:/dev/react/shoppy/server/repository/loginRepository.js:6:6)
//     at login (file:///C:/dev/react/shoppy/server/controller/loginController.js:7:38)
//     at Layer.handle [as handle_request] (C:\dev\react\shoppy\server\node_modules\express\lib\router\layer.js:95:5)
//     at next (C:\dev\react\shoppy\server\node_modules\express\lib\router\route.js:144:13)
//     at Route.dispatch (C:\dev\react\shoppy\server\node_modules\express\lib\router\route.js:114:3)
//     at Layer.handle [as handle_request] (C:\dev\react\shoppy\server\node_modules\express\lib\router\layer.js:95:5)
//     at C:\dev\react\shoppy\server\node_modules\express\lib\router\index.js:284:15
//     at Function.process_params (C:\dev\react\shoppy\server\node_modules\express\lib\router\index.js:346:12)
//     at next (C:\dev\react\shoppy\server\node_modules\express\lib\router\index.js:280:10) {
//   code: 'ER_MIX_OF_GROUP_FUNC_AND_FIELDS',
//   errno: 1140,
//   sql: 'select count(pass) as cnt, pass from shoppy_member where id = ?',
//   sqlState: '42000',
//   sqlMessage: "In aggregated query without GROUP BY, expression #2 of SELECT list contains nonaggregated column 'hrdb2019.shoppy_member.pass'; this is incompatible with sql_mode=only_full_group_by"
// }