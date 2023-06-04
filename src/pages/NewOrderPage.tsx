import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { GET_PACKAGE, NEW_ORDER } from "../utils/queries";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const NewOrderPage = () => {
  const { packageId, serviceType } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [getPackage, { data: dataPackage }] = useLazyQuery(GET_PACKAGE);

  const [newOrder] = useMutation(NEW_ORDER, {
    onCompleted: () => {
      toast.success("Pedido realizado correctamente");
      navigate("/services");
    },
    onError(error, clientOptions) {
      console.log(error);
    },
  });

  useEffect(() => {
    console.log(packageId);
    if (packageId) {
      getPackage({
        variables: {
          packageId: parseInt(packageId),
        },
      });
    }
  }, [packageId]);

  const navigate = useNavigate();
  const handleForm = (data: any) => {
    console.log(data);
    if (packageId) {
      const payload = {
        packageId: parseInt(packageId),
        data: data.domain + " ---- " + data.note,
      };
      newOrder({ variables: payload });
    }
  };

  return (
    <div className="space-y-10  mt-10">
      <div className="flex w-full justify-between">
        <h1>
          Comprar {serviceType}:{" "}
          <span className="font-bold">{dataPackage?.getPackage?.name}</span>
        </h1>
        <div className="flex">
          <span className="font-medium text-xl">
            ${dataPackage?.getPackage?.price}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
        {serviceType === "hosting" ? (
          <form
            onSubmit={handleSubmit(handleForm)}
            className="bg-white shadow-sm ring-1   sm:rounded-xl md:col-span-3"
          >
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="domain"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Dominio que necesita registrar
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2   sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                        http://
                      </span>
                      <input
                        {...register("domain", {
                          pattern: /^([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}$/i,
                        })}
                        type="text"
                        name="domain"
                        id="domain"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        placeholder="www.example.com"
                      />
                    </div>
                    {errors.domain && (
                      <p className="text-red-500">
                        El nombre de dominio no es válido.
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="note"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Alguna nota o comentario
                  </label>
                  <div className="mt-2">
                    <textarea
                      {...register("note", {
                        required: false,
                      })}
                      id="note"
                      name="note"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400   sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600"></p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              <Link to={"/cart"}>
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Volver a los servicios
                </button>
              </Link>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Hacer pedido
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default NewOrderPage;
