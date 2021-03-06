import { GoogleLogin } from "react-google-login";
import { googleLogin } from "../utils/apiCalls";
export const LoginForm = () => {
  const resSuccessGoogle = async (response) => {
    const data = await googleLogin({ tokenId: response.tokenId });
    localStorage.setItem("token", data.token);
    window.location.href = "/";
  };

  const resErrorGoogle = (response) => {
    console.error(response);
  };
  return (
    <div className="flex flex-col w-full h-screen space-y-8 bg-gray-50 justify-center items-center">
      <h2 className="text-3xl text-gray-600">
        No account? No Problem! Login with Google
      </h2>
      <GoogleLogin
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={resSuccessGoogle}
        onFailure={resErrorGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};
