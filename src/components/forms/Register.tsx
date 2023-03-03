import React, { useState, useEffect } from "react";
import Input from "../inputs/Inputs";
import { CiUser } from "react-icons/ci";
import { FiMail, FiLock } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import validator from "validator";
import zxcvbn from "zxcvbn";

interface IRegisterFormProps {}

const FormSchema = z
  .object({
    first_name: z
      .string()
      .min(2, "First name must be at least 2 characters.")
      .max(32, "First name must be less than 32 characters.")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special characters allowed."),
    last_name: z
      .string()
      .min(2, "Last name must be at least 2 characters.")
      .max(32, "Last name must be less than 32 characters.")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special characters allowed."),
    email: z.string().email("Please enter a valid email address."),
    phone: z
      .string()
      .refine(validator.isMobilePhone, "Please enter a valid phone number"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters.")
      .max(52, "Password must be less than 52 characters."),
    confirmPassword: z.string(),
    accept: z.literal(true, {
      errorMap: () => ({
        message: "Please agree to all of the terms and conditions.",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });

type FormSchemaType = z.infer<typeof FormSchema>;

const RegisterForm: React.FunctionComponent<IRegisterFormProps> = (props) => {
  const [passwordScore, setPasswordScore] = useState<number>(0);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({ resolver: zodResolver(FormSchema) });

  const onSubmit = (data: any) => console.log(data);
  const validatePasswordStrength = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  useEffect(() => {
    setPasswordScore(validatePasswordStrength());
  }, [watch().password]);
  return (
    <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
      <div className="gap-2 md:flex">
        <Input
          name="first_name"
          label="First Name"
          type="text"
          icon={<CiUser />}
          placeholder="example"
          register={register}
          error={errors?.first_name?.message}
          disabled={isSubmitting}
        />
        <Input
          name="last_name"
          label="Last Name"
          type="text"
          icon={<CiUser />}
          placeholder="example"
          register={register}
          error={errors?.last_name?.message}
          disabled={isSubmitting}
        />
      </div>
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
        name="phone"
        label="Phone Number"
        type="text"
        icon={<BsTelephone />}
        placeholder="+(xxx)-xxx-xxxx"
        register={register}
        error={errors?.phone?.message}
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
      {watch().password?.length > 0 && (
        <div className="flex mt-2">
          {Array.from(Array(5).keys()).map((sp, i) => (
            <span className="w-1/5 px-2" key={i}>
              <div
                className={`h-2 rounded-xl ${
                  passwordScore <= 2
                    ? "bg-red-400"
                    : passwordScore < 4
                    ? "bg-yellow-400"
                    : "bg-green-500"
                } `}
              ></div>
            </span>
          ))}
        </div>
      )}
      <Input
        name="confirmPassword"
        label="Confirm password"
        type="password"
        icon={<FiLock />}
        placeholder="*********"
        register={register}
        error={errors?.confirmPassword?.message}
        disabled={isSubmitting}
      />
      <div className="flex items-center mt-3">
        <input
          type="checkbox"
          id="accept"
          className="mr-2 focus:ring-0 rounded"
          {...register("accept")}
        />
        <label htmlFor="accept" className="text-gray-700">
          {" "}
          I accept the&nbsp;{" "}
          <a
            href=""
            target="_blank"
            className="text-blue-600 hover:text-blue-700 hover:underline"
          >
            Terms
          </a>
          &nbsp;and&nbsp;
          <a
            href=""
            target="_blank"
            className="text-blue-600 hover:text-blue-700 hover:underline"
          >
            Privacy Policy
          </a>
        </label>
      </div>
      {errors?.accept && (
        <p className="text-sm text-red-600 mt-1 "> {errors?.accept?.message}</p>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default RegisterForm;
