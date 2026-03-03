import { appEnv } from '../config/env';
import type { ApiResponse } from '../types/api';

async function parseResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const contentType = response.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');

  if (!isJson) {
    const raw = await response.text();
    return {
      success: false,
      error: {
        code: 'NON_JSON_RESPONSE',
        message: raw.slice(0, 140) || 'Server returned a non-JSON response.'
      },
      meta: {
        timestamp: new Date().toISOString()
      }
    };
  }

  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok && payload.success) {
    return {
      success: false,
      error: {
        code: 'HTTP_ERROR',
        message: `Request failed with status ${response.status}.`
      },
      meta: {
        timestamp: new Date().toISOString()
      }
    };
  }

  return payload;
}

export async function apiGet<T>(path: string): Promise<ApiResponse<T>> {
  const response = await fetch(`${appEnv.apiBaseUrl}${path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return parseResponse<T>(response);
}

export async function apiPost<T, TBody>(path: string, body: TBody): Promise<ApiResponse<T>> {
  const response = await fetch(`${appEnv.apiBaseUrl}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  return parseResponse<T>(response);
}

export async function apiPatch<T, TBody>(path: string, body: TBody): Promise<ApiResponse<T>> {
  const response = await fetch(`${appEnv.apiBaseUrl}${path}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  return parseResponse<T>(response);
}
