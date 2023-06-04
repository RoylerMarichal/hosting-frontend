import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_PACKAGES_BY_SERVICE, GET_SERVICES } from "../utils/queries";
import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router";

const CartPage = () => {
  const {
    data: dataServices,
    loading: loadingServices,
    error: ErrorService,
  } = useQuery(GET_SERVICES);

  const [getPackages, { data: dataPackages }] = useLazyQuery(
    GET_PACKAGES_BY_SERVICE
  );

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [serviceSelected, setSelectedService] = useState(
    dataServices?.getServices[0]
  );

  const [packageSelected, setSelectedPackage] = useState(
    dataPackages?.getPackagesByService[0]
  );

  // useEffect(() => {
  //   if (dataServices?.getServices) {
  //     setSelectedService(dataServices?.getServices[0]);
  //   }
  // }, [dataServices]);

  const handleSelectedService = (data: any) => {

    setSelectedService(data);
    getPackages({
      variables: {
        serviceId: data.id,
      },
    });
    setSelectedPackage(null);
  };
  const handleSelectedPackage = (data: any) => {
    setSelectedPackage(data);
  };

  const navigate = useNavigate();

  const handleNewOrder = (data: any) => {
    navigate("/buy/"+serviceSelected.type+"/"+packageSelected.id);
  };

  return (
    <>
      <div className="mt-3 lg:mt-10 p-3">
        <RadioGroup value={serviceSelected} onChange={handleSelectedService}>
          <RadioGroup.Label className="text-base   font-semibold leading-6 text-gray-900">
            <h2 className="title"> Servicios</h2>
          </RadioGroup.Label>
          <br />

          <div className=" grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
            {dataServices?.getServices?.map((mailingList) => (
              <RadioGroup.Option
                key={mailingList.id}
                value={mailingList}
                className={({ checked, active }) =>
                  classNames(
                    checked ? "border-transparent" : "border-gray-300",
                    active ? "border-indigo-600 ring-2 ring-indigo-600" : "",
                    "relative flex cursor-pointer rounded-lg border bg-white p-4   shadow-sm focus:outline-none"
                  )
                }
              >
                {({ checked, active }) => (
                  <>
                    <span className="flex flex-1">
                      <span className="flex flex-col">
                        <RadioGroup.Label
                          as="span"
                          className="block text-sm font-medium text-gray-900"
                        >
                          {mailingList.name}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className="mt-1 flex items-center text-sm text-gray-500"
                        >
                          {mailingList.resume}
                        </RadioGroup.Description>
                        <RadioGroup.Description
                          as="span"
                          className="mt-6 text-sm font-medium text-gray-900"
                        >
                          {/* {mailingList.resume} */}
                        </RadioGroup.Description>
                      </span>
                    </span>
                    <CheckCircleIcon
                      className={classNames(
                        !checked ? "invisible" : "",
                        "h-5 w-5 text-indigo-600"
                      )}
                      aria-hidden="true"
                    />
                    <span
                      className={classNames(
                        active ? "border" : "border-2",
                        checked ? "border-indigo-600" : "border-transparent",
                        "pointer-events-none absolute -inset-px rounded-lg"
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      {serviceSelected ? (
        <div className="mt-3 lg:mt-10 p-3">
          <RadioGroup value={packageSelected} onChange={setSelectedPackage}>
            <RadioGroup.Label className="text-base   font-semibold leading-6 text-gray-900">
              <h2 className="title"> Paquetes de {serviceSelected.name}</h2>
            </RadioGroup.Label>
            <br />

            <div className=" grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
              {dataPackages?.getPackagesByService?.map((mailingList) => (
                <RadioGroup.Option
                  key={mailingList.id}
                  value={mailingList}
                  className={({ checked, active }) =>
                    classNames(
                      checked ? "border-transparent" : "border-gray-300",
                      active ? "border-indigo-600 ring-2 ring-indigo-600" : "",
                      "relative flex cursor-pointer rounded-lg border bg-white p-4   shadow-sm focus:outline-none"
                    )
                  }
                >
                  {({ checked, active }) => (
                    <>
                      <span className="flex flex-1">
                        <span className="flex flex-col">
                          <RadioGroup.Label
                            as="span"
                            className="block text-sm font-medium text-gray-900"
                          >
                            {mailingList.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            {mailingList.description}
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className="mt-6 text-sm font-medium text-gray-900"
                          >
                            {mailingList.price}
                          </RadioGroup.Description>
                        </span>
                      </span>
                      <CheckCircleIcon
                        className={classNames(
                          !checked ? "invisible" : "",
                          "h-5 w-5 text-indigo-600"
                        )}
                        aria-hidden="true"
                      />
                      <span
                        className={classNames(
                          active ? "border" : "border-2",
                          checked ? "border-indigo-600" : "border-transparent",
                          "pointer-events-none absolute -inset-px rounded-lg"
                        )}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          {packageSelected && (
            <div className="flex items-center relative justify-center h-24">
              <button
                onClick={handleNewOrder}
                className="btn-main fixed bottom-0 w-2/6 mb-3"
              >
                Hacer pedido
              </button>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default CartPage;
