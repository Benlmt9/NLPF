import { AppConfig } from "./AppConfig"
import React from 'react';

export async function getAnnonces(token) {
    const response = await fetch(AppConfig.api_ip + "offers/candidate/", {
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
    const response = await fetch(AppConfig.api_ip + "users/get/current", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    });

    return await response.json();
}

export async function getAnnoncesOfCompany(token, id) {
    const response = await fetch(AppConfig.api_ip + "offers/company/",{
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

export async function patchApply(token, id, state, reason, applicationId, candidateId) {
    const response = await fetch(AppConfig.api_ip + "offers/apply/" + id, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({applicationId: applicationId, state: state, reason: reason, choosenCandidate: candidateId})
    });

    return await response.json();
}

export async function postSignUp(token, body) {
    const response = await fetch(AppConfig.api_ip + "auth/local/signUp", {
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

export async function getQuizz(token) {
    const response = await fetch(AppConfig.api_ip + "quizz/company/all",{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    })
    return await response.json();
}

export async function getQuizzWithId(token, id)
{
    const response = await fetch(AppConfig.api_ip + "quizz/" + id,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    })
    return await response.json();
}

export async function postQuizAnswers(token, body)
{
    const response = await fetch(AppConfig.api_ip + "quizz/submit",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(body),
    })
    return await response.json();
}

export async function getMyApply(token, id)
{
    const response = await fetch(AppConfig.api_ip + "offers",{
        method: "get",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    })
    const respjson = await response.json();
    var myapply = []
    respjson.forEach(element => {
        if (element.applications !== undefined && element.applications !== []){
            element.applications.forEach(appli => {
                if (appli !== undefined && appli.candidateId == id){
                    myapply.push([element,appli]);
                }
            });
        }
    });
    return myapply;
}

export async function patchUser(token, id, body)
{
    const response = await fetch(AppConfig.api_ip + "users/id/"+id,{
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body : JSON.stringify(body)
    })
    return await response.json();
}