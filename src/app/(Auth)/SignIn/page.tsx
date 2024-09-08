/* eslint-disable @typescript-eslint/naming-convention */
import LoadingSpinner from "@/components/404/LoadingSpinner";
import dynamic from "next/dynamic";

const PageSingIn = dynamic(() => import("./Pages"), {
  ssr: true,
  loading: () => <LoadingSpinner />,
});

const SignIn = (): JSX.Element => {
  return <PageSingIn />;
};

export default SignIn;
