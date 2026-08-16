const PROVIDER = 'github';
const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';

async function getAccessToken(env, code) {
  const response = await fetch(GITHUB_OAUTH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Cloudflare-Worker-Decap-CMS-OAuth',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });
  return await response.json();
}

function callbackTemplate(status, content) {
  const script =
    'const receiveMessage = (message) => {' +
    '  window.opener.postMessage(' + JSON.stringify('authorization:github:' + status + ':' + JSON.stringify(content)) + ', message.origin);' +
    '  window.removeEventListener("message", receiveMessage, false);' +
    '};' +
    'window.addEventListener("message", receiveMessage, false);' +
    'window.opener.postMessage("authorizing:github", "*");';
  const page =
    '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Authorizing</title></head>' +
    '<body><script>' + script + '</script></body></html>';
  return new Response(page, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
}

function redirectTemplate(url) {
  const page =
    '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Redirecting</title></head>' +
    '<body><script>window.location.href = ' + JSON.stringify(url) + ';</script></body></html>';
  return new Response(page, { headers: { 'Content-Type': 'text/html' } });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/auth' || url.pathname === '/callback') {
      const code = url.searchParams.get('code');

      if (code) {
        const data = await getAccessToken(env, code);
        if (data.error) {
          return callbackTemplate('error', data);
        }
        return callbackTemplate('success', { token: data.access_token, provider: PROVIDER });
      }

      const scope = url.searchParams.get('scope') || 'repo,user';
      const redirectUri = url.origin + '/auth';
      const params = new URLSearchParams({
        client_id: env.GITHUB_CLIENT_ID,
        scope,
        redirect_uri: redirectUri,
      });
      return redirectTemplate(GITHUB_AUTHORIZE_URL + '?' + params.toString());
    }

    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }
    return new Response('Not found', { status: 404 });
  },
};
