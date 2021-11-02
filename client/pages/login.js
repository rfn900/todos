import { LoginForm } from "../components/LoginForm";

export default function Login(props) {
  return (
    <div className="flex flex-col min-h-screen py-2 mx-auto max-w-8xl">
      <LoginForm />
    </div>
  );
}

export async function getServerSideProps(context) {
  let referringURL = context.req.headers.referer;
  return {
    props: {
      referer: referringURL,
    },
  };
}
