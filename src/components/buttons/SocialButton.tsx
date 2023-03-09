import { signIn } from "next-auth/react";
import React from "react";
import {
  FaGoogle,
  FaFacebook,
  FaGithub,
  FaDiscord,
  FaTwitter,
} from "react-icons/fa";
import { SiAuth0 } from "react-icons/si";

type Props = { id: string; text: string; csrfToken: string };

const colors: any = {
  google: "#DB4437",
  facebook: "#4285f4",
  auth0: "#eb5424",
  github: "#333",
  discord: "#7289da",
  twitter: "#1DA1F2",
};

const SocialButton = ({ id, text, csrfToken }: Props) => {
  const createIconJsx = () => {
    switch (id) {
      case "google":
        return <FaGoogle />;
      case "facebook":
        return <FaFacebook />;
      case "github":
        return <FaGithub />;
      case "discord":
        return <FaDiscord />;
      case "twitter":
        return <FaTwitter />;
      case "auth0":
        return <SiAuth0 />;
    }
  };
  return (
    <form method="post" action={`/api/auth/signin/${id}`}>
      <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
      <button
        className="mb-2 py-2 px-4 w-full h-full flex justify-center items-center gap-2 hover:bg-gray-700 text-white text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md"
        type="button"
        onClick={() => signIn(id)}
        style={{ background: `${colors[id]}` }}
      >
        {createIconJsx()}
        {text}
      </button>
    </form>
  );
};

export default SocialButton;
