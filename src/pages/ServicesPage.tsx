import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../utils/queries";

const ServicesPage = () => {
  const { data: dataOrders } = useQuery(GET_ORDERS);

  console.log(dataOrders);

  return (
    <div className="mt-3 lg:mt-10 p-3">
      <h2 className="title"> Mis Servicios</h2>

      <ul role="list" className="divide-y divide-gray-100">
        {dataOrders?.getOrders?.map((service: any, index:number) => (
          <li key={index} className="flex justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {service.package.service.name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  $ {service.package.price}
                </p>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{service.role}</p>

              {service.status === "PENDING" ? (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-yellow-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Pendiente</p>
                </div>
              ) : service.status === "ACTIVE" ? (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Online</p>
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesPage;
