import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import {
  CHECK_RESET_PASSWORD_CODE,
  FORGOT_PASSWORD,
  UPDATE_PASSWORD_BY_USERID,
  UPDATE_USER,
} from "../../utils/queries";
import { toast } from "react-toastify";
import Loading from "../../components/commons/Loading";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState("code");
  const [forgotPassword, { loading: loadingForgotPassword }] = useMutation(
    FORGOT_PASSWORD,
    {
      onCompleted: () => {
        toast.success("Código enviado");
        setStep("verified");
      },
      onError(error, clientOptions) {
        toast.error(error.message);
      },
    }
  );

  const [checkResetCodeMutation, { loading: loadingCheckCode }] = useMutation(
    CHECK_RESET_PASSWORD_CODE,
    {
      onCompleted: (data) => {
        console.log(data.checkResetCode);
        
        if (data.checkResetCode?.userId) {
          setUserId(data.checkResetCode.userId);
        }
        toast.success("Código aceptado");
        setStep("newPassword");
      },
      onError(error) {
        toast.error(error.message);
      },
    }
  );

  const [updatePassword, { loading: loadingUpdatePassword }] = useMutation(
    UPDATE_PASSWORD_BY_USERID,
    {
      onCompleted: () => {
        toast.success("Contraseña cambiada");
        window.location.href = "/auth/login/login";
      },
      onError(error) {
        toast.error(error.message);
      },
    }
  );

  const setResetCode = () => {
    forgotPassword({
      variables: {
        email: email,
      },
    });
    //...
  };

  const changePassword = () => {
    updatePassword({
      variables: {
        userId: userId,
        newPassword: newPassword,
      },
    });
    //...
  };

  const checkResetCode = () => {
    checkResetCodeMutation({
      variables: {
        email: email,
        resetCode: code,
      },
    });
  };
  return (
    <div>
      {step === "code" ? (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            {/* <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
            /> */}
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Recuperar contraseña
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              O{" "}
              <Link
                to={"/auth/login/login"}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Accede
              </Link>
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  {email ? (
                    <button
                      onClick={() => setResetCode()}
                      className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Recuperar
                      {loadingForgotPassword && <Loading size={5} />}
                    </button>
                  ) : (
                    <button className="flex opacity-30 w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      Recuperar
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-6"></div>
            </div>
          </div>
        </div>
      ) : step === "verified" ? (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            {/* <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
            /> */}
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Escribe el código de verificación
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              O{" "}
              <button
                onClick={() => setStep("code")}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Cambiar email
              </button>
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div>
                <div>
                  <label
                    htmlFor="code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Código
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={(e) => setCode(e.target.value)}
                      id="code"
                      name="code"
                      type="text"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  {email ? (
                    <button
                      onClick={() => checkResetCode()}
                      className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Verificar
                      {loadingForgotPassword && <Loading size={5} />}
                    </button>
                  ) : (
                    <button className="flex opacity-30 w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      Verificar
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-6"></div>
            </div>
          </div>
        </div>
      ) : step === "newPassword" ? (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            {/* <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
        /> */}
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Escribe tu nueva contraseña
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              O{" "}
              <button
                onClick={() => setStep("code")}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Cambiar email
              </button>
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nueva contraseña
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={(e) => setNewPassword(e.target.value)}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="password"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <button
                    onClick={() => changePassword()}
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Cambiar contraseña
                  </button>
                </div>
              </div>

              <div className="mt-6"></div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ForgotPassword;
