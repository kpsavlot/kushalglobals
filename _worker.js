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

function renderTemplate(message) {
  const page =
    '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Authorizing</title></head>' +
    '<body><script>function sendMsg(msg){opener.postMessage(msg, "*");window.close();}' +
    'sendMsg(' + message + ');</script></body></html>';
  return new Response(page, { headers: { 'Content-Type': 'text/html' } });
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

    if (url.pathname === '/debug') {
      return new Response(
        JSON.stringify({
          clientIdSet: !!env.GITHUB_CLIENT_ID,
          clientIdLength: (env.GITHUB_CLIENT_ID || '').length,
          clientSecretSet: !!env.GITHUB_CLIENT_SECRET,
          clientSecretLength: (env.GITHUB_CLIENT_SECRET || '').length,
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (url.pathname === '/auth' || url.pathname === '/callback') {
      const code = url.searchParams.get('code');

      if (code) {
        const data = await getAccessToken(env, code);
        if (data.error) {
          return renderTemplate(
            JSON.stringify('authorization:' + PROVIDER + ':error:' + (data.error_description || data.error))
          );
        }
        const payload = JSON.stringify({ token: data.access_token, provider: PROVIDER });
        return renderTemplate(JSON.stringify('authorization:' + PROVIDER + ':success:' + payload));
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
