
//　共通のAPIクラス
import Vue from 'vue';
import { Api } from './some-api';

// api1→api2→api3と呼び出したいだけなのに非同期処理がうまく書けず
// コールバック関数地獄になりやすい

call();
async function call() {
    console.log('0：CALLAPI処理前');
    await commonCallAPI(callAPI);
    console.log('1：CALLAPI2処理前');
    await commonCallAPI(callAPI2);
    console.log('2；CALLAPI3処理前');
    await commonCallAPI(callAPI3);
}

/**
 * 1回目で呼び出すAPI
 */
function callAPI(): Promise<any> {
  console.log('一つめのAPI呼び出し');
  const api = new Api();
  // 成功時の関数を定義
  const success = () => {
    console.log('1');
  };
  const fail = () => {
    console.log('fail');
  };
  // 共通のAPIクラスに成功時の関数と失敗時の関数を渡す
  return api.get2(false, success, fail, 4);
  
}

/**
 * 2回目で呼び出すAPI
 */
function callAPI2(): Promise<any> {
  console.log('二つめのAPI呼び出し');
  const api = new Api();
  // 成功時の関数を定義
  const success = () => {
    console.log('2');
  };
  const fail = () => {
    console.log('fail');
  };
  // 共通のAPIクラスに成功時の関数と失敗時の関数を渡す
  return  api.get2(true, success, fail, 2);
}
/**
 * 3回目で呼び出すAPI
 */
function callAPI3(): Promise<any> {
  console.log('三つめのAPI呼び出し');
  const api = new Api();
  // 成功時の関数を定義
  const success = () => {
    console.log('3');
  };
  const fail = () => {
    console.log('fail');
  };
  // 共通のAPIクラスに成功時の関数と失敗時の関数を渡す
  return api.get2(true, success, fail, 2);
}

function commonCallAPI(api: Function): Promise<any> {
  return new Promise((resolve) => {
    api();
  })
}

