import * as productRepository from '../repository/productsRepository.js';

export async function insertProduct (req, res){
  const {image, name, price} = req.body;
  const result = await productRepository.insertProduct({image, name, price});
  res.json(result);
}

export async function showProducts (req, res){
  const rows = await productRepository.showProducts();
  res.json(rows);
}

export async function productDetail (req, res){
  const {id} = req.params;
  const rows = await productRepository.productDetail(id);
  res.json(rows);
}