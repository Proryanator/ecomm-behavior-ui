const baseURL = 'http://localhost:11030';

export async function login(username: string, password: string) {
    const response = await fetch(`${baseURL}/login?username=${username}&password=${password}`, {
        headers: get_headers(),
        method: 'GET',
    });

    return response.status == 200;
}

export async function get_roles(username: string, password: string) {
    const response = await fetch(`${baseURL}/roles?username=${username}&password=${password}`, {
        headers: get_headers(),
        method: 'GET',
        keepalive: true
    });

    const roles = await response.json();
    return roles;
}

export async function upload_csv(username: string, password: string, file: File) {
    const form = new FormData();
    form.append("file", file);

    const response = await fetch(`${baseURL}/upload?username=${username}&password=${password}`, {
        headers: {...get_headers()},
        method: 'POST',
        body: form,
    });

    const uploadTime = await response.json();
    return uploadTime;
}

export async function fetch_results(username: string, password: string, page = 0, pageSize: number, userId?: number) {
    const response = await fetch(`${baseURL}/fetch?username=${username}&password=${password}&page_size=${pageSize}&page=${page}&${userId !== undefined ? `user_id=${userId}` : ""}`, {
        headers: get_headers(),
        method: 'GET',
    });

    // handle no content response
    if (response.status === 204) {
        return [];
    }

    const data = await response.json();
    return data;
}

export async function get_total(username: string, password: string, userId?: number) {
    const response = await fetch(`${baseURL}/total?username=${username}&password=${password}&${userId !== undefined ? `user_id=${userId}` : ""}`, {
        headers: get_headers(),
        method: 'GET',
    });

    // handle no content response
    if (response.status === 204) {
        return 0;
    }

    const data = await response.json();
    return data[0][0];
}

function get_headers() {
    return {
        'X-API-Key': process.env.NEXT_PUBLIC_SERVER_API_KEY ?? "missing",
    }
}