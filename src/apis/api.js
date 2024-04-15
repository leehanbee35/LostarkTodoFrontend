import {API_BASE_URL} from "../config/api-config";

export function call(api, method, request) {
    let headers = new Headers();

    // 로컬 스토리지에서 ACCESS TOKEN 가져오기
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken && accessToken !== null) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };

    if (request instanceof FormData) {
        options.body = request;
    } else {
        headers.append("Content-Type", "application/json");
        if (request) {
            options.body = JSON.stringify(request);
        }
    }

    return fetch(options.url, options).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw response.json();
        }
    }).catch((error) => {
        return error.then((errorMessage) => {
            throw errorMessage;
        });
    });
}
