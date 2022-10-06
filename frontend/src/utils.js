import { AppConfig } from "./AppConfig"
import React from 'react';
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

export async function getUserData(token, id) {
    const response = await fetch(AppConfig.api_ip + "users/id/" + id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    });

    return await response.json();
}

export async function getUserDataWithToken(token) {
    const response = await fetch(AppConfig.api_ip + "users/id/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    });

    return await response.json();
}

export async function getAnnoncesOfCompany(token, id) {
    const response = await fetch(AppConfig.api_ip + "offers/company/" + id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    });
    return await response.json();
}

export async function getAnnonceWithId(token, id) {
    const response = await fetch(AppConfig.api_ip + "offers/get/"+id, {
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
        body: JSON.stringify(body)
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

export async function patchOffersState(token, id, state) {
    const response = await fetch(AppConfig.api_ip + "offers/" + id, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({state: state}),
    });
    window.location.reload()
    return await response.json();
}

export async function postAnnonce(token, body) {
    const response = await fetch(AppConfig.api_ip + "offers/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(body),
    });

    return await response.json();
}

export async function postConnect(body) {
    const response = await fetch(AppConfig.api_ip + "auth/local/signIn", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(body),
    });

    return await response.json();
}

export async function patchApply(token, id, body) {
    const response = await fetch(AppConfig.api_ip + "offers/apply/" + id, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(body),
    });

    return await response.json();
}