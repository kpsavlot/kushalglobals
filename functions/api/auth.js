const PROVIDER = 'github';
const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';

async function getAccessToken(context, code) {
  const response = await fetch(GITHUB_OAUTH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Cloudflare-Pages-Decap-CMS-OAuth',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: context.env.GITHUB_CLIENT_ID,
      client_secret: context.env.GITHUB_CLIENT_SECRET,
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

function getGithubAuthorizeUrl(context, scope, redirectUri) {
  const params = new URLSearchParams({
    client_id: context.env.GITHUB_CLIENT_ID,
    scope,
    redirect_uri: redirectUri,
  });
  return GITHUB_AUTHORIZE_URL + '?' + params.toString();
}

export function onRequest(context) {
  const url = new URL(context.request.url);
  const code = url.searchParams.get('code');

  if (code) {
    return getAccessToken(context, code).then(function (data) {
      if (data.error) {
        const msg = JSON.stringify(
          'authorization:' + PROVIDER + ':error:' + (data.error_description || data.error)
        );
        return renderTemplate(msg);
      }
      const payload = JSON.stringify({ token: data.access_token, provider: PROVIDER });
      const msg = JSON.stringify('authorization:' + PROVIDER + ':success:' + payload);
      return renderTemplate(msg);
    });
  }

  const scope = url.searchParams.get('scope') || 'repo,user';
  const redirectUri = url.origin + '/api/auth';
  return redirectTemplate(getGithubAuthorizeUrl(context, scope, redirectUri));
}
