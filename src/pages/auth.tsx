import RegisterForm from "@/components/forms/Register";
import LoginForm from "@/components/forms/Login";
import Link from "next/link";
import React from "react";
import Background from "@/components/Backgrounds/Background";
import { NextPageContext } from "next";
import { getCsrfToken, getProviders } from "next-auth/react";
import SocialButton from "@/components/buttons/SocialButton";

const auth = ({
  tab,
  callbackUrl,
  csrfToken,
  providers,
}: {
  tab: string;
  callbackUrl: string;
  csrfToken: string;
  providers: any;
}) => {
  console.log(tab);
  return (
    <div className="w-full flex items-center justify-center ">
      <div className="w-full h-100 flex items-center justify-center">
        {/*------Form------*/}
        <div className="w-full sm:w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/3 h-full bg-white flex items-center justify-center flex-col">
          {tab == "signin" ? (
            <LoginForm callbackUrl={callbackUrl} csrfToken={csrfToken} />
          ) : (
            <RegisterForm />
          )}
          <div className="w-full flex items-center justify-between">
            <div className="w-full h-[1px] bg-gray-300"></div>
            <span className="text-sm uppercase mx-6 text-gray-400 ">Or</span>
            <div className="w-full h-[1px] bg-gray-300"></div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
            {providers.map((provider: any) => {
              if (provider.name == "Credentials") return;

              return (
                <SocialButton
                  key={provider.id}
                  id={provider.id}
                  text={
                    tab == "signup"
                      ? `Sign up with ${provider.name}`
                      : `Sign in with ${provider.name}`
                  }
                  csrfToken={csrfToken}
                />
              );
            })}
          </div>
        </div>
        {/*----Background----*/}
        <Background
          image={`"../../auth/${tab == "signup" ? "signup" : "login"}.jpg"`}
        />
      </div>
    </div>
  );
};

export default auth;

export async function getServerSideProps(ctx: NextPageContext) {
  const { req, query } = ctx;

  const tab = query.tab ? query.tab : "signin";
  const callbackUrl = query.callbackUrl
    ? query.callbackUrl
    : process.env.NEXTAUTH_URL;

  const csrfToken = await getCsrfToken(ctx);
  const providers = await getProviders();
  return {
    props: {
      providers: Object.values(providers!),
      tab: JSON.parse(JSON.stringify(tab)),
      callbackUrl,
      csrfToken,
    },
  };
}
