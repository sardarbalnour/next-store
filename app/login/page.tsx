"use client";

import { useState, type SubmitEvent } from "react";
import Link from "next/link";

import Cookie from "js-cookie";
import { Eye, EyeOff, LockKeyhole, Mail, ArrowLeft } from "lucide-react";
import Container from "@/components/Container";
import { useRouter } from "next/navigation";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = (e: SubmitEvent<HTMLFormElement>) => {
    // const data = axios({
    //   method: "post",
    //   url: "/api/login",
    //   data: {
    //     email,
    //     password,
    //   },
    // });
    e.preventDefault();

    const response = {
      token: "ifasudyghliaughliaurghf",
      expiresIn: 7,
    };

    Cookie.set("token", response.token, { expires: response.expiresIn });
    router.push("/dashboard");
  };

  return (
    <Container>
      <main
        dir="rtl"
        className="flex min-h-[calc(100vh-80px)]
         items-center justify-center px-4 py-12"
      >
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <div
              className="mx-auto mb-5 flex h-16 w-16 
            items-center justify-center rounded-2xl bg-blue-600
             text-white shadow-lg shadow-blue-600/20"
            >
              <LockKeyhole size={28} strokeWidth={1.8} />
            </div>

            <h1
              className="text-3xl font-bold
             tracking-tight text-gray-900"
            >
              خوش برگشتی!
            </h1>

            <p className="mt-3 text-sm leading-7 text-gray-500">
              برای ورود به حساب کاربری خود، اطلاعاتت رو وارد کن.
            </p>
          </div>

          {/* Login Form */}
          <div
            className="rounded-3xl border border-gray-300
           bg-white p-6 shadow-xl shadow-gray-200/40 sm:p-8"
          >
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  ایمیل
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    placeholder="example@email.com"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50
                     py-3.5 pr-11 pl-4 text-sm text-gray-900 outline-none transition
                      placeholder:text-gray-400 focus:border-blue-500
                       focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    رمز عبور
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-blue-600 transition hover:text-blue-700"
                  >
                    فراموشی رمز عبور؟
                  </Link>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="رمز عبورت رو وارد کن"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50
                     py-3.5 pr-11 pl-12 text-sm text-gray-900 outline-none transition
                      placeholder:text-gray-400 focus:border-blue-500
                       focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2
                     text-gray-400 transition hover:text-gray-700"
                  >
                    {showPassword ? <Eye size={19} /> : <EyeOff size={19} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-blue-600"
                />

                <label
                  htmlFor="remember"
                  className="cursor-pointer text-sm text-gray-600"
                >
                  من رو به خاطر بسپار
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center
                 gap-2 rounded-xl bg-blue-600 px-4 py-3.5 text-sm
                  font-semibold text-white shadow-lg shadow-blue-600/20
                   transition hover:bg-blue-700 active:scale-[0.99]"
              >
                ورود به حساب کاربری
                <ArrowLeft
                  size={18}
                  className="relative top-px transition-transform group-hover:-translate-x-1"
                />
              </button>
            </form>

            {/* Register */}
            <div className="mt-7 border-t border-gray-100 pt-6 text-center">
              <p className="text-sm text-gray-500">
                هنوز حساب کاربری نداری؟
                <Link
                  href="/register"
                  className="mr-1.5 font-semibold text-blue-600
                   transition hover:text-blue-700"
                >
                  ثبت‌نام کن
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs leading-6 text-gray-400">
            ورود به حساب کاربری به معنی پذیرش قوانین و مقررات است.
          </p>
        </div>
      </main>
    </Container>
  );
}

export default Login;
