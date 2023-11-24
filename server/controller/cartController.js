import * as cartRepository from '../repository/cartRepository.js';

export async function insertCart(req, res){
  const {id, pid, size, qty} = req.body;
  const result = await cartRepository.insertCart({id, pid, size, qty});
  res.json(result);
}

export async function getCart(req, res){
  const id = req.params.id
  const rows = await cartRepository.getCart(id);
  res.json(rows);
}

export async function getPageList(req, res){
  const {id, startIndex, endIndex} = req.params;
  const rows = await cartRepository.getPageList({id, startIndex, endIndex});
  res.json(rows);
}

export async function removeCart(req, res){
  const cid = req.params.cid;
  console.log(`cid------->> ${cid}`);  
  const result = await cartRepository.removeCart(cid);
  res.json(result); 
}

/**
 * 장바구니 수량 업데이트
 */
export async function updateQty(req, res){
  const {id, cid, checkFlag} = req.params;
  // console.log(`------->> ${JSON.stringify({id, cid, checkFlag})}`);  
  const result = await cartRepository.updateQty({id, cid, checkFlag});
  res.json(result); 
}
