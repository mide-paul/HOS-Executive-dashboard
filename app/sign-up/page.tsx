'use client';
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo_white from '../../public/images/logo_white.png';
import truck_white from '../../public/icons/truck_white.svg';
import facebook from '../../public/icons/facebook.svg';
import twitter from '../../public/icons/twitter.svg';
import instagram from '../../public/icons/instagram.svg';
import youtube from '../../public/icons/youtube.svg';
import google from '../../public/icons/google.png';
// import { Icon } from 'react-icons-kit';
// import { eyeOff } from 'react-icons-kit/feather/eyeOff';
// import { eye } from 'react-icons-kit/feather/eye';
import { useAuthStore } from "../store/authStore";
import user from '../../public/icons/user.svg';
import sms from '../../public/icons/sms.svg';
import call from '../../public/icons/call.svg';
import lock from '../../public/icons/lock_dark.svg';

const USER_REGEX = /^[A-z][A-z0-9-_ ]{0,40}$/;
const EMAIL_REGEX = /^(?=.*[a-z])(?=.*[@]).{3,23}$/;
const NUMBER_REGEX = /^[0-10-_ ]{9,12}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?&()_+={}[:;'"<>,|/~!@#$%]).{8,15}$/;


const CompanySignup = () => {
    const userRef = useRef<HTMLInputElement | null>(null);
    const errRef = useRef<HTMLDivElement | null>(null);

    const [first_name, setFirst_name] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    //const [companyNameFocus, setcompanyNameFocus] = useState(false);

    const [last_name, setLast_name] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    //const [companyNameFocus, setcompanyNameFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    //const [emailFocus, setemailFocus] = useState(false);

    const [phone, setPhone] = useState("");
    const [validPhone, setValidPhone] = useState(false);
    // const [phoneFocus, setPhoneFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    //const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    //const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // const [type, setType] = useState('password');
    // // const [icon, setIcon] = useState(eyeOff);

    const { signup, error } = useAuthStore();

    // const handleToggle = () => {
    //   if (type === 'password') {
    //     setIcon(eye);
    //     setType('text')
    //   } else {
    //     setIcon(eyeOff)
    //     setType('password')
    //   }
    // }

    useEffect(() => {
        if (userRef.current !== null) {
            userRef.current.focus();
        }
    }, [])

    useEffect(() => {
        setValidFirstName(USER_REGEX.test(first_name));
    }, [first_name])

    useEffect(() => {
        setValidLastName(USER_REGEX.test(last_name));
    }, [last_name])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPhone(NUMBER_REGEX.test(phone));
    }, [phone]);

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword])

    useEffect(() => {
        setErrMsg('');
    }, [first_name, last_name, password, matchPassword])

    const router = useRouter()

    const handleSignup = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            await signup(email, password, first_name, last_name, phone);
            setSuccess(true);
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main>
            <div className="grid grid-rows-[20px_1fr_20px] min-h-[1140px] lg:min-h-screen w-full p-4 pb-14 bg-white overflow-hidden">
                <div className="ml-0 bg-blue-950 lg:-mt-0.5 min-h-[1110px] lg:min-h-[575px] min-w-full lg:w-full">
                    <div className="flex flex-col lg:flex-row">
                        <div>
                            <div className="pt-14 ml-4 md:ml-52 lg:ml-16 h-6 w-22">
                                <Image src={logo_white} alt="image" />
                            </div>

                            <div>
                                <Image src={truck_white} alt="" className="mt-28 ml-7 md:ml-52 lg:ml-16 bg-gray-500 p-5 rounded-full" />
                            </div>

                            <div className="gap-5 flex mt-7 ml-4 md:ml-52 lg:ml-16">
                                <Link href="https://www.facebook.com/hosoptima"><Image src={facebook} alt="" className="relative" /></Link>
                                <Link href="https://x.com/hosoptima"><Image src={twitter} alt="" className="relative" /></Link>
                                <Link href="https://www.instagram.com/hosoptima_/"><Image src={instagram} alt="" className="relative" /></Link>
                                {/* <Link href="https://www.linkedin.com/company/hosoptima/"><Image src={youtube} alt="" className="relative" /></Link> */}
                                <Image src={youtube} alt="" className="relative" />
                            </div>
                        </div>

                        <div className="">
                            <section>
                                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                                <div className="pl-0 ml-0 md:ml-48 lg:ml-4 lg:pl-60 pb-0">
                                    <div className="max-w-[310px] lg:max-w-xl mx-auto max-h-[590px] lg:max-h-[530px] pt-1 pb-16 p-10 mb-8 mt-6 ml-4 lg:ml-14 bg-white rounded">
                                        <form onSubmit={handleSignup}>
                                            <div>
                                                <h3 className="ml-0 mt-4 text-blue text-base font-bold">
                                                    Sign Up
                                                </h3>
                                            </div>

                                            <div className="flex flex-col mt-0 ml-0 gap-1">
                                                <input
                                                    type="username"
                                                    id="firstname"
                                                    placeholder="First Name"
                                                    ref={userRef}
                                                    autoComplete="off"
                                                    onChange={(e) => setFirst_name(e.target.value)}
                                                    value={first_name}
                                                    required
                                                    aria-invalid={validFirstName ? "false" : "true"}
                                                    aria-describedby="uidnote"
                                                    // onFocus={() => setcompanyNameFocus(true)}
                                                    // onBlur={() => setcompanyNameFocus(false)}
                                                    className="mt-4 w-24.2 p-2 pl-8 text-sm text-dark bg-white border border-gray rounded"
                                                />
                                                <Image src={user} alt="" className="-mt-8 ml-2" />
                                            </div>
                                            {/* <p id="uidnote" className={companyNameFocus && companyName && !validCompanyName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                2 to 40 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
              </p> */}

                                            <div className="flex flex-col mt-2 ml-0 gap-1">
                                                <input
                                                    type="lastname"
                                                    id="lastname"
                                                    placeholder="Last Name"
                                                    autoComplete="off"
                                                    onChange={(e) => setLast_name(e.target.value)}
                                                    value={last_name}
                                                    required
                                                    aria-invalid={validLastName ? "false" : "true"}
                                                    aria-describedby="uidnote"
                                                    // onFocus={() => setlastNameFocus(true)}
                                                    // onBlur={() => setlastNameFocus(false)}
                                                    className="mt-4 w-24.2 p-2 pl-8 text-sm text-dark bg-white border border-gray rounded"
                                                />
                                                <Image src={user} alt="" className="-mt-8 ml-2" />
                                            </div>

                                            <div className="flex flex-col mt-2 ml-0 gap-1">
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
                                                    className="mt-4 w-24.2 p-2 pl-8 text-sm text-dark bg-white border border-gray rounded"
                                                />
                                                <Image src={sms} alt="" className="-mt-8 ml-2" />
                                                {/* <p id="uidnote" className={emailFocus && email &&
                  !validemail ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.<br />
                  Must begin with a letter. <br />
                  only lowercase is allowed.
                  Allowed special characters: @
                </p> */}
                                            </div>

                                            <div className="flex flex-col mt-2 ml-0 gap-1">
                                                <input
                                                    type="phone"
                                                    id="phone"
                                                    placeholder="Phone Number"
                                                    autoComplete="off"
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    value={phone}
                                                    required
                                                    aria-invalid={validPhone ? "false" : "true"}
                                                    aria-describedby="uidnote"
                                                    // onFocus={() => setphoneFocus(true)}
                                                    // onBlur={() => setphoneFocus(false)}
                                                    className="mt-4 w-24.2 p-2 pl-8 text-sm text-dark bg-white border border-gray rounded"
                                                />
                                                <Image src={call} alt="" className="-mt-8 ml-2 size-5" />
                                            </div>

                                            <div className="flex flex-col mt-2 ml-0 gap-1">
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
                                                    className="mt-4 w-24.2 p-2 pl-8 text-sm text-dark bg-white border border-gray rounded"
                                                />
                                                <Image src={lock} alt="" className="-mt-8 ml-2" />
                                                {/* <span style={{ color: '#000000' }} onClick={handleToggle}>
                      <Icon className="relative s:-ml-6 s:mt-0.3 lg:-ml-6 lg:mt-0.5 z-30" icon={icon} size={20} />
                    </span> */}
                                            </div>
                                            {/* <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 15 characters.<br />
                Must include uppercase and lowercase letters, a number and a special character.
                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
              </p> */}

                                            <div className="flex flex-col mt-2 ml-0 gap-1">
                                                <input
                                                    type="password"
                                                    id="confirmpassword"
                                                    placeholder="Confirm Password"
                                                    onChange={(e) => setMatchPassword(e.target.value)}
                                                    value={matchPassword}
                                                    required
                                                    autoComplete="new-password"
                                                    aria-invalid={validPassword ? "false" : "true"}
                                                    aria-describedby="pwdnote"
                                                    // onFocus={() => setPasswordFocus(true)}
                                                    // onBlur={() => setPasswordFocus(false)}
                                                    className="mt-4 w-24.2 p-2 pl-8 text-sm text-dark bg-white border border-gray rounded"
                                                />
                                                <Image src={lock} alt="" className="-mt-8 ml-2" />
                                                {/* <span style={{ color: '#000000' }} className="items-center" onClick={handleToggle}>
                      <Icon className="relative s:-ml-5.4 s:mt-0.5 lg:-ml-6 lg:mt-0.5 z-10" icon={icon} size={20} />
                    </span> */}
                                            </div>
                                            {/* <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p> */}
                                            {error && <p className="text-red-600 text-center font-semibold lg:mt-2 xl:-mt-0.5 z-20">{error}</p>}

                                            <div className="flex flex-row items-center mt-5 ml-0 gap-2">
                                                <input
                                                    type='checkbox'
                                                    required
                                                    className="mt-2 ml-0" />
                                                <p className="relative mt-1 text-sm text-blue-900 lg:mt-0.5 lg:max-w-22 lg:text-xxs text-left z-10 xl:max-w-19.1 xl:text-xs">
                                                    By creating an account means you agree to the <span className="text-black">Terms & Conditions</span> and our <span className="text-black">Privacy Policy</span>
                                                </p>
                                            </div>

                                            <button
                                                disabled={!validFirstName || !validPassword || !validMatch ? true : false}
                                                type="submit"
                                                className="bg-blue-950 h-6.2 w-full p-2 ml-0 text-sm text-white rounded mt-3 cursor-pointer hover:bg-blue-900 disabled:bg-gray-400">
                                                Sign Up
                                            </button>

                                            <div className="flex items-center">
                                                <Image src={google} alt="" className="absolute size-4 mt-3 ml-9 lg:ml-40 z-20" />
                                                <div className="text-blue-950 text-sm text-center w-full pl-8 lg:pl-6 mt-3 ml-0 border font-bold p-2 w-24.2 rounded hover:bg-gray-300 cursor-pointer z-10">
                                                    Sign Up with Google
                                                </div>
                                            </div>

                                            {success ? <div className="reg-sucess-message">Registration successful</div> : <></>}
                                        </form>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    <div>
                        <h3 className="-mt-2 lg:-mt-24 ml-3.5 md:ml-52 lg:ml-16 text-nowrap text-left text-sm text-white">
                            © 2025 Rights are Reserved by hosoptima.com
                        </h3>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CompanySignup;