import React, { useState, useEffect } from "react";
import Input from "../inputs/Inputs";
import { FiMail, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SlideButton from "../buttons/SlideButton";
import { SubmitHandler } from "react-hook-form/dist/types";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import Link from "next/link";

interface ILoginFormProps {
  callbackUrl: string;
  csrfToken: string;
}

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(52, "Password must be less than 52 characters."),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const LoginForm: React.FunctionComponent<ILoginFormProps> = (props) => {
  const { callbackUrl, csrfToken } = props;
  const router = useRouter();
  const path = router.pathname;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({ resolver: zodResolver(FormSchema) });

  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
    const res: any = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl,
    });
    if (res.error) {
      return toast.error(res.error);
    } else {
      return router.push("/");
    }
  };
  return (
    <div className="w-full px-12 py-4">
      <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
        Sign In
      </h2>
      <p className="text-center text-sm text-grey-600 mt-2 space-x-2">
        You do not have an account? &nbsp;
        <a
          className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
          onClick={() => {
            router.push({
              pathname: path,
              query: {
                tab: "signup",
              },
            });
          }}
        >
          Sign Up
        </a>
      </p>
      <form
        method="post"
        action="/api/auth/signin/email"
        className="my-8 text-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
        <Input
          name="email"
          label="Email"
          type="text"
          icon={<FiMail />}
          placeholder="example@example.com"
          register={register}
          error={errors?.email?.message}
          disabled={isSubmitting}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          icon={<FiLock />}
          placeholder="*********"
          register={register}
          error={errors?.password?.message}
          disabled={isSubmitting}
        />
        <div className="mt-2 hover:underline w-fit">
          <Link href="/forgot" className="text-blue-600 ">
            Forgot password?
          </Link>
        </div>

        <SlideButton
          type="submit"
          text="Sign In"
          slide_text="Secure sign in"
          icon={<FiLock />}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default LoginForm;
