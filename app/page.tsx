'use client';
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
// import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo_white from './../public/images/logo_white.png';
import truck_white from './../public/icons/truck_white.png';
import facebook from './../public/icons/facebook_signup2.png';
import twitter from './../public/icons/twitter_signup.png';
import instagram from './../public/icons/instagram_signup.png';
import youtube from './../public/icons/youtube_signup.png';
import google from './../public/icons/google.png';
import envelope from './../public/icons/envelope.png';
import lock from './../public/icons/lock_dark.svg';
// import { Icon } from 'react-icons-kit';
// import { eyeOff } from 'react-icons-kit/feather/eyeOff';
// import { eye } from 'react-icons-kit/feather/eye';
import { useAuthStore } from "./store/authStore";

const EMAIL_REGEX = /^(?=.*[a-z])(?=.*[@]).{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?&()_+={}[:;'"<>,|/~!@#$%]).{8,15}$/;


const CompanyLogin = () => {
  const userRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const { login, error, isAuthenticated } = useAuthStore();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  // const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  // const [passwordFocus, setPasswordFocus] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // const [type, setType] = useState('password');
  // //   const [icon, setIcon] = useState(eyeOff);

  //   const handleToggle = () => {
  //     if (type === 'password') {
  //       setIcon(eye);
  //       setType('text')
  //     } else {
  //       setIcon(eyeOff)
  //       setType('password')
  //     }
  //   }

  useEffect(() => {
    if (userRef.current !== null) {
      userRef.current.focus();
    }
  }, [])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password])

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validEmail || !validPassword) return;

    setLoading(true);
    try {
      // Simulate login request
      const response = await login(email, password); // Assuming this returns a token or user data
      const { token } = response; // Extract token from response

      // Set authentication cookie
      setCookie("authToken", token, {
        maxAge: rememberMe ? 60 * 60 * 24 * 7 : 0, // 7 days if "Remember Me" is checked, session cookie otherwise
        path: "/", // Cookie accessible across the site
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "strict", // Prevent CSRF
      });

      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify({ email, password }));
      }

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-[990px] lg:min-h-screen w-full p-4 pb-14 bg-white overflow-hidden">
      <div className="ml-0 bg-blue-950 lg:-mt-0.5 min-h-[960px] lg:min-h-[575px] min-w-full lg:w-full">
        <div className="flex flex-col lg:flex-row">
          <div>
            <div className="pt-14 ml-4 md:ml-52 lg:ml-16 h-6 w-22">
              <Image src={logo_white} alt="image" />
            </div>

            <div>
              <Image src={truck_white} alt="" className="mt-24 ml-7 md:ml-52 lg:ml-16 bg-gray-500 p-5 rounded-full" />
            </div>

            <div className="gap-5 flex mt-7 ml-4 md:ml-52 lg:ml-16">
              <Link href="https://www.facebook.com/hosoptima"><Image src={facebook} alt="" className="relative" /></Link>
              <Link href="https://x.com/hosoptima"><Image src={twitter} alt="" className="relative" /></Link>
              <Link href="https://www.instagram.com/hosoptima_/"><Image src={instagram} alt="" className="relative" /></Link>
              {/* <Link href="https://www.linkedin.com/company/hosoptima/"><Image src={youtube} alt="" className="relative" /></Link> */}
              <Image src={youtube} alt="" className="relative" />
            </div>
          </div>

          <div>
            <section>
              <div className="pb-0">
                <div className="max-w-[310px] lg:min-w-[500px] mx-auto max-h-[590px] lg:max-h-[530px] pt-1 pb-16 p-10 mb-8 mt-6 lg:mt-16 ml-4 md:ml-48 lg:ml-60 bg-white rounded">
                  <form onSubmit={handleLogin}>
                    <div>
                      <h3 className="ml-0 mt-11 text-blue text-base font-bold">
                        Sign In
                      </h3>
                      <p className="ml-0 mt-1 pt-2 text-dark text-sm font-normal">
                        Welcome back! Please enter your details below
                      </p>
                    </div>

                    <div className="flex flex-col mt-0 ml-0 gap-1">
                      <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="uidnote"
                        // onFocus={() => setEmailFocus(true)}
                        // onBlur={() => setEmailFocus(false)}
                        className="mt-10 w-24.2 p-2 pl-8 text-sm text-dark bg-white border border-gray rounded"
                      />
                      <Image src={envelope} alt="" className="-mt-8 ml-2" />
                      {/* <p id="uidnote" className={emailFocus && email &&
                                        !validEmail ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        4 to 24 characters.<br />
                                        Must begin with a letter. <br />
                                        only lowercase is allowed.
                                        Allowed special characters: @
                                    </p> */}
                    </div>

                    <div className="flex flex-col ml-0 mt-7 gap-1">
                      <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        autoComplete="new-password"
                        aria-invalid={validPassword ? "false" : "true"}
                        aria-describedby="pwdnote"
                        // onFocus={() => setPasswordFocus(true)}
                        // onBlur={() => setPasswordFocus(false)}
                        className="mt-0 w-24.2 p-2 pl-8 text-sm text-dark bg-white border border-gray rounded"
                      />
                      <Image src={lock} alt="" className="-mt-8 ml-2" />
                      {/* <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    8 to 15 characters.<br />
                                    Must include at least two uppercase letters, at least three lowercase letters, at least two digits and a special character.<br />
                                </p> */}
                    </div>
                    {error && <p className="text-red-600 text-center font-semibold mt-2">{error}</p>}

                    <div>
                      <div className="flex items-center">
                        <input
                          type='checkbox'
                          checked={rememberMe}
                          onChange={handleRememberMeChange}
                          className="mt-5 ml-0" />
                        <p className="text-black mt-5 max-w-19 ml-1 text-xs lg:text-sm text-left">
                          Remember me
                        </p>
                      </div>
                      <p className="text-blue-950 -mt-4 lg:-mt-5 max-w-19 ml-32 lg:ml-72 text-xs lg:text-sm text-left z-10 cursor-pointer">
                        Forgot Password?
                      </p>
                    </div>

                    <button
                      disabled={!validEmail || !validPassword ? true : false}
                      type="submit"
                      className="bg-blue-950 h-6.2 w-full p-2 ml-0 text-sm text-white rounded mt-3 cursor-pointer hover:bg-blue-900 disabled:bg-gray-400">
                      {loading ? "Signing in..." : "Sign in"}
                    </button>

                    <div className="flex items-center">
                      <Image src={google} alt="" className="absolute size-4 mt-3 ml-9 lg:ml-36 z-20" />
                      <div className="text-blue-950 text-sm text-center w-full pl-8 lg:pl-12 mt-3 ml-0 border font-bold p-2 w-24.2 rounded hover:bg-gray-300 cursor-pointer z-10">
                        Sign In with Google
                      </div>
                    </div>

                    {/* <div>
                                    <p className="relative text-dark text-sm lg:text-center lg:mt-6 xl:mt-6 xl:ml-1 xx:mt-6 xx:ml-1 z-10">
                                        Don&apos;t have an account?
                                        <Link href="/sign-up"><span className="text-blue font-semibold pl-0.5">
                                            sign Up</span>
                                        </Link>
                                    </p>
                                </div> */}
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* <span className="items-center" onClick={handleToggle}>
                    <Icon className="absolute lg:ml-28.7 lg:mt-19.9 z-10 xl:mt-28.3 xl:ml-24 cursor-pointer" icon={icon} size={20} />
                </span> */}

        <div>
          <h3 className="-mt-1 lg:-mt-14 ml-3.5 md:ml-48 lg:ml-16 text-nowrap text-left text-sm text-white">© 2025 Rights are Reserved by HOSOptima.com</h3>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogin;
