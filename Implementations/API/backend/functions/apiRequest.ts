import fetch from 'node-fetch';
import { HttpMethod } from './config';

export function apiRequest(path: string, method: HttpMethod, data: any) {
    return fetch(path, {
        headers: {
            'Content-Type': 'application/json',
        },
        method,
        redirect: 'follow',
        body: JSON.stringify(data),
    }).then((res) => res.json())
}
