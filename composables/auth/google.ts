import type { RuntimeConfig } from "nuxt/schema";

interface GoogleOauthData {
  code: string;
}

export const GoogleAuthProvider = <AuthProvider<GoogleOauthData>>{
  name: "google",
  displayedName: "Google",
  isSupportOauth: true,
  invoke: async (config: RuntimeConfig) => {
    const url =
      "https://accounts.google.com/o/oauth2/auth?" +
      new URLSearchParams({
        response_type: "code",
        client_id: config.public.oauth.google.clientId,
        redirect_uri: config.public.oauth.google.redirectUrl,
        scope: "email",
        prompt: "consent",
        access_type: "offline",
      }).toString();

    navigateTo(url, { external: true });
  },
  collectOauthParams: (query: typeof LocationQuery): GoogleOauthData | null => {
    const code = query.code?.toString();

    if (code == null) return null;

    return {
      code,
    };
  },
  handleOauthResult: async (data: GoogleOauthData) => {
    console.log(`Google OAuth called.Code=${data.code}`);

    // TODO: auth with google code

    const { signIn } = useAuth();

    await signIn(
      {
        username: "emilys",
        password: "emilyspass",
      },
      {
        redirect: false,
      }
    );
  },
};
