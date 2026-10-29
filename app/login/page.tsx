"use client";

import { useState, type SubmitEvent } from "react";
import Link from "next/link";
import Cookie from "js-cookie";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";

import Container from "@/components/Container";
import { notifyAuthStateChanged } from "@/lib/auth";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = {
      token: "ifasudyghliaughliaurghf",
      expiresIn: 7,
    };

    Cookie.set("token", response.token, { expires: response.expiresIn });
    notifyAuthStateChanged();
    router.push("/dashboard");
  };

  return (
    <main
      dir="rtl"
      className="flex min-h-[calc(100vh-76px)] items-center bg-stone-50 py-8 sm:py-12"
    >
      <Container>
        <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-xl shadow-stone-900/[0.06] lg:grid-cols-2">
          <section className="relative flex min-h-56 flex-col justify-between overflow-hidden bg-[#f4f3e8] p-7 sm:p-10 lg:min-h-[620px]">
            <div className="pointer-events-none absolute -left-20 -top-20 size-64 rounded-full border-[36px] border-emerald-900/[0.04]" />
            <div className="pointer-events-none absolute -bottom-28 -right-20 size-72 rounded-full border-[44px] border-emerald-900/[0.04]" />

            <Link
              href="/"
              className="relative inline-flex w-fit items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
              aria-label="بازگشت به صفحه اصلی فروشگاه"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-emerald-800 text-white shadow-sm">
                <ShoppingBag size={21} aria-hidden="true" />
              </span>
              <span className="text-base font-black text-stone-900">
                فروشگاه سردار
              </span>
            </Link>

            <div className="relative mt-8 lg:mt-auto lg:mb-auto lg:pt-16">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/70 px-4 py-2 text-sm font-semibold text-emerald-900">
                <Sparkles size={16} aria-hidden="true" />
                خوش آمدید
              </span>
              <h1 className="max-w-md text-3xl font-black leading-tight tracking-tight text-stone-900 sm:text-4xl">
                خرید خوب،
                <span className="mt-1 block text-emerald-800">
                  با یک ورود ساده
                </span>
              </h1>
              <p className="mt-4 max-w-md text-sm leading-7 text-stone-600 sm:text-base">
                وارد حساب کاربری‌تان شوید و خریدتان را در فروشگاه سردار ادامه
                دهید.
              </p>
            </div>

            <div className="relative mt-7 hidden items-center gap-3 rounded-2xl border border-white/80 bg-white/60 p-4 text-sm text-stone-600 backdrop-blur sm:flex">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                <ShieldCheck size={19} aria-hidden="true" />
              </span>
              <span>ورود امن و تجربه خریدی آسوده</span>
            </div>
          </section>

          <section className="p-6 sm:p-10 lg:p-12">
            <div className="mb-8">
              <span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
                <LockKeyhole size={22} aria-hidden="true" />
              </span>
              <h2 className="text-2xl font-black tracking-tight text-stone-900 sm:text-3xl">
                خوش برگشتی!
              </h2>
              <p className="mt-2 text-sm leading-6 text-stone-500">
                برای ورود به حساب کاربری، اطلاعاتت را وارد کن.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-stone-700"
                >
                  ایمیل
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400"
                    aria-hidden="true"
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    dir="ltr"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    placeholder="example@email.com"
                    required
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3.5 pr-11 pl-4 text-left text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-700 focus:bg-white focus:ring-4 focus:ring-emerald-700/10"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-stone-700"
                  >
                    رمز عبور
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-emerald-800 transition hover:text-emerald-950"
                  >
                    فراموشی رمز عبور؟
                  </Link>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400"
                    aria-hidden="true"
                  />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    dir="ltr"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    placeholder="رمز عبورت را وارد کن"
                    required
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3.5 pr-11 pl-12 text-left text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-700 focus:bg-white focus:ring-4 focus:ring-emerald-700/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={
                      showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"
                    }
                    className="absolute left-3 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-stone-400 transition hover:bg-stone-200/70 hover:text-stone-700 focus-visible:outline-2 focus-visible:outline-emerald-800"
                  >
                    {showPassword ? (
                      <Eye size={18} aria-hidden="true" />
                    ) : (
                      <EyeOff size={18} aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="size-4 cursor-pointer rounded border-stone-300 accent-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
                />
                <label
                  htmlFor="remember"
                  className="cursor-pointer text-sm text-stone-600"
                >
                  من را به خاطر بسپار
                </label>
              </div>

              <button
                type="submit"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald-800 px-5 py-3.5 text-sm font-bold text-white shadow-sm shadow-emerald-900/15 transition hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800 active:scale-[0.99]"
              >
                ورود به حساب کاربری
                <ArrowLeft
                  size={18}
                  className="transition-transform group-hover:-translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </form>

            <div className="mt-7 border-t border-stone-100 pt-6 text-center">
              <p className="text-sm text-stone-500">
                هنوز حساب کاربری نداری؟
                <Link
                  href="/register"
                  className="mr-1.5 font-bold text-emerald-800 transition hover:text-emerald-950"
                >
                  ثبت‌نام کن
                </Link>
              </p>
            </div>

            <p className="mt-6 text-center text-xs leading-6 text-stone-400">
              ورود به حساب کاربری به معنی پذیرش قوانین و مقررات است.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}

export default Login;
