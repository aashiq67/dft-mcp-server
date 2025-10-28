import { env, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('MCP Worker', () => {
    it('invokes getDoctors via /rpc and returns JSON', async () => {
        const response = await SELF.fetch('http://example.com/rpc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${env.SHARED_SECRET}`,
            },
            body: JSON.stringify({ method: 'getDoctors', args: [] }),
        });

        expect(response.status).toBe(200);
        expect(response.headers.get('content-type')).toContain('application/json');
        const body = await response.json();
        expect(Array.isArray(body) || 'error' in body).toBe(true);
    });
});
