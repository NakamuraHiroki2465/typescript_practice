"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const some_api_1 = require("./some-api");
// api1→api2→api3と呼び出したいだけなのに非同期処理がうまく書けず
// コールバック関数地獄になりやすい
call();
function call() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('0：CALLAPI処理前');
        yield commonCallAPI(callAPI);
        console.log('1：CALLAPI2処理前');
        yield commonCallAPI(callAPI2);
        console.log('2；CALLAPI3処理前');
        yield commonCallAPI(callAPI3);
    });
}
/**
 * 1回目で呼び出すAPI
 */
function callAPI() {
    console.log('一つめのAPI呼び出し');
    const api = new some_api_1.Api();
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
function callAPI2() {
    console.log('二つめのAPI呼び出し');
    const api = new some_api_1.Api();
    // 成功時の関数を定義
    const success = () => {
        console.log('2');
    };
    const fail = () => {
        console.log('fail');
    };
    // 共通のAPIクラスに成功時の関数と失敗時の関数を渡す
    return api.get2(true, success, fail, 2);
}
/**
 * 3回目で呼び出すAPI
 */
function callAPI3() {
    console.log('三つめのAPI呼び出し');
    const api = new some_api_1.Api();
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
function commonCallAPI(api) {
    return new Promise((resolve) => {
        api();
    });
}
