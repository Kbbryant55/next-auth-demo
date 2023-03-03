import { NextPageContext } from "next";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillYoutube,
  AiFillFacebook,
  AiFillLinkedin,
} from "react-icons/ai";

import { SiUdemy } from "react-icons/si";

export default function Home() {
  const { data: session } = useSession();
  //console.log(session);

  const text1 =
    "This is a full build that covers the full authentication process from login, register, sending emails (for activating account, reset password, and password change notice), forgot password, advanced form validaiton, protected routes, and session manipulation";

  const text2 =
    "In this build we used ReactJS, NextJS, MongoDB, Mongoose, Typescript, Next Auth, React-Hook-Form, Zod, Axios, Nodemailer, SMTP service, Gmail stmp, React-toastify, Zxcvbn, Handlebars, BcryptJs...";
  return (
    <div className="home bg-black min-h-screen text-white flex items-center justify-center">
      <div className="container mx-auto">
        <div className="border border-white relative flex w-full rounded-lg">
          <div className="flex flex-wrap flex-col justify-center items-center">
            <div className="w-full text-right">
              <div className="py-6 px-3">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-md uppercase font-bold px-8 py-2 rounded-md sm:mr-2 mb-1 ease-linear transition-all duration-150"
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <img
                src={session?.user?.image!}
                alt={`${session?.user?.name} image`}
                className="rounded-full w-40 h-40"
              />
            </div>
            <div className="text-center mt-12">
              <h3 className="text-4xl font-semibold mb-2">
                {session?.user?.name}
              </h3>
              <div className="text-sm mb-2 font-bold">
                {session?.user?.email}
              </div>
              <div className="mb-2 mt-10">
                You logged in using &nbsp;
                <span className="capitalize bg-blue-400 text-white px-4 py-1 ml-2 font-bold italix text-lg rounded-md">
                  {session?.user?.provider}
                </span>
              </div>
            </div>
            <div className="mt-10 py-10 border-t text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4">
                  <p className="mb-4 text-sm">{text1}</p>
                  <p className="font-bold text-xs">{text2}</p>
                  <div className="mt-6 flex items-center justify-center gap-2">
                    Source code here: &nbsp;
                    <a
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-4xl"
                    >
                      <AiFillGithub />
                    </a>
                  </div>
                  <div className="flex justify-center gap-4 mt-4 pt-6 text-3xl">
                    <a
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-125 transition ease-in-out"
                    >
                      <AiFillGithub />
                    </a>
                    <a
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-125 transition ease-in-out"
                    >
                      <AiFillInstagram />
                    </a>
                    <a
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-125 transition ease-in-out"
                    >
                      <AiFillYoutube />
                    </a>
                    <a
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-125 transition ease-in-out"
                    >
                      <AiFillFacebook />
                    </a>
                    <a
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-125 transition ease-in-out"
                    >
                      <AiFillLinkedin />
                    </a>
                    <a
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-125 transition ease-in-out"
                    >
                      <SiUdemy />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  console.log(session);
  return {
    props: {
      session,
    },
  };
}
