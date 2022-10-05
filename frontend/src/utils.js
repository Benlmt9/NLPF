import { AppConfig } from "./AppConfig"

export async function getAnnonces(token) {
    const response = await fetch(AppConfig.api_ip + "offers/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    });

    return await response.json();
}

export async function getSpecificAnnonces(token, id) {
    const response = await fetch(AppConfig.api_ip + "offers/" + id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    });

    return await response.json();
}

export async function getCompanyWithId(token, id) {
    const response = await fetch(AppConfig.api_ip + "users/id/" + id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    });

    return await response.json();
}

export async function postApply(token, id, body) {
    const response = await fetch(AppConfig.api_ip + "offers/apply/" + id, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: body
    });

    return await response.json();
}

export async function postSignUp(token, body) {
    const response = await fetch(AppConfig.api_ip + "users", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(body),
    });

    return await response.json();
}