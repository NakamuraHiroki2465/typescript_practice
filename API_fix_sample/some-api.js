"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
/**
 * 共通で定義されているAPI呼び出しクラス
 * 共通で使用しているためこのAPIの改修は難しい
 */
class Api {
    constructor() {
        // APIの返却値（ダミー用、実際にはAPIにアクセスして返ってくるデータ）
        this.returnValue = {
            data1: 'data1',
            data2: 'data2',
            data3: 'data3',
        };
    }
    /**
     * 擬似API呼び出し（get）
     */
    get(isOk, successMethod, failedMethod, second) {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (isOk) {
                    // API呼びだしが成功(200)の場合、渡された関数の引数にAPIの返却値を渡し実行する
                    successMethod(this.returnValue);
                    resolve("");
                }
                else {
                    failedMethod();
                    return null;
                }
            }, second * 3000);
        });
    }
    get2(isOk, successMethod, failedMethod, second) {
        setTimeout(() => {
            if (isOk) {
                // API呼びだしが成功(200)の場合、渡された関数の引数にAPIの返却値を渡し実行する
                successMethod(this.returnValue);
            }
            else {
                failedMethod();
                return null;
            }
        }, second * 3000);
    }
    /**
     * 擬似API呼び出し（post）
     * 擬似なのでgetと同じ
     */
    post(isOk, successMethod, failedMethod, second) {
        const randomInt = Math.random() * (3 - 1) + 1;
        console.log(randomInt);
        setTimeout(() => {
            if (isOk) {
                // API呼びだしが成功(200)の場合、渡された関数の引数にAPIの返却値を渡し実行する
                successMethod(this.returnValue);
            }
            else {
                failedMethod();
                return null;
            }
        }, second * 3000);
    }
}
exports.Api = Api;
