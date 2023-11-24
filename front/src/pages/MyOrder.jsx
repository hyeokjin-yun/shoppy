import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function MyOrder() {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>주문고객</td>
          </tr>
        </thead>
        <thead>
          <tr>
            <td>고객정보</td>
          </tr>
        </thead>
      </Table>
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>주문상품</td>
          </tr>
        </thead>
        <thead>
          <tr>
            <td>상품정보</td>
          </tr>
        </thead>
      </Table>
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>결제방식</td>
          </tr>
        </thead>
        <thead>
          <tr>
            <td>결제방식 선택정보</td>
          </tr>
        </thead>
      </Table>
      <Button type="buton">결제하기</Button>
    </>
  );
}
