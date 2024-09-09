/* eslint-disable @typescript-eslint/naming-convention */
import LoadingSpinner from "@/components/404/LoadingSpinner";
import dynamic from "next/dynamic";

const PageSignUp = dynamic(() => import("./Pages"), {
  ssr: true,
  loading: () => <LoadingSpinner />,
});

const SignUp = (): JSX.Element => {
  return <PageSignUp />;
};

export default SignUp;
