export const LoginForm = () => {
  const googleClick = () => {
    window.location = "http://localhost:5000/auth/google";
  };
  return (
    <div className="flex flex-col w-full h-screen space-y-8 bg-gray-50 justify-center items-center">
      <h2 className="text-3xl text-gray-600">
        Don't have an account? Don't worry. Login with Google
      </h2>
      <button
        onClick={googleClick}
        className="px-4 py-2 border-px border-yellow-100 text-gray-500 rounded shadow-md space-x-4 flex items-center justify-center font-bold"
      >
        <span>Login With Google</span>
        <div className="h-full w-px bg-yellow-100" />
        <img src="/google_logo.png" alt="google logo" className="h-8" />
      </button>
    </div>
  );
};
