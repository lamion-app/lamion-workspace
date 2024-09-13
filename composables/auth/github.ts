import type { RuntimeConfig } from "nuxt/schema";

interface GithubOauthData {
  code: string;
}

export const GitHubAuthProvider = <AuthProvider<GithubOauthData>>{
  name: "github",
  displayedName: "GitHub",
  isSupportOauth: true,
  invoke: async (config: RuntimeConfig) => {
    const url =
      "https://github.com/login/oauth/authorize?" +
      new URLSearchParams({
        scope: "user:email",
        client_id: config.public.oauth.github.clientId,
        redirect_uri: config.public.oauth.github.redirectUrl,
      }).toString();

    navigateTo(url, { external: true });
  },
  collectOauthParams: (query: typeof LocationQuery): GithubOauthData | null => {
    const code = query.code?.toString();

    if (code == null) return null;

    return {
      code,
    };
  },
  handleOauthResult: async (data: GithubOauthData) => {
    console.log(`Github OAuth called. Code=${data.code}`);

    // TODO: auth with github code

    const { signIn } = useAuth();

    signIn(
      {
        username: "emilys",
        password: "emilyspass",
      },
      {
        callbackUrl: "/",
      }
    );
  },
};
