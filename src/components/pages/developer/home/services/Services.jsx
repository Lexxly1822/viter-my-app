import React from "react";
import CardServices from "../../../../partials/CardServices";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { apiVersion } from "../../../../helpers/function-general";
import { FaList, FaPlus, FaTable, FaTrash } from "react-icons/fa";
import ModalAddServices from "./ModalAddServices";
import { FaPencil } from "react-icons/fa6";
import ModalDeleteServices from "./ModalDeleteServices";
import ServicesList from "./ServicesList";
import { data } from "autoprefixer";
import ServicesTable from "./ServicesTable";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryDataInfinite } from "../../../../custom-hooks/queryDataInfinite";
import { useInView } from "react-intersection-observer";

const Services = () => {
  const [isModalServices, setIsModalServices] = React.useState(false);
  const [isDeleteServices, setIsDeleteServices] = React.useState(false); // 1st
  const [itemEdit, setItemEdit] = React.useState();
  const [isTable, setIsTable] = React.useState(false); //10

  const [page, setPage] = React.useState(1);
  const { ref, Inview } = useInView(); //hhhhhh

  // here
  const {
    isLoading,
    isFetching: isFetchingDataServices,
    error: errorDataServices,
    data: dataServices,
  } = useQueryData(
    `${apiVersion}/controllers/developer/web-services/web-services.php`,
    "get", //post
    "web-services" //query key
  );

  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["web-services"],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        ``, //search functionalities
        `${apiVersion}/controllers/developer/web-services/page.php?start=${pageParam}`,
        false,
        {},
        "post"
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
  });

  React.useEffect(() => {
    if (Inview) {
      fetchNextPage();
      setPage((prev) => prev + 1);
    }
  }, [Inview]);

  console.log(isTable);

  const handleToggleTable = () => {
    setIsTable(!isTable);
  };

  const handleAdd = () => {
    setItemEdit(null);
    setIsModalServices(true);
  };

  const handleEdit = (item) => {
    setItemEdit(item);
    setIsModalServices(true);
  };

  //2
  const handleDelete = (item) => {
    setItemEdit(item);
    setIsDeleteServices(true);
  };

  return (
    <>
      <section id="services" className="bg-gray-50 py-12 md:py-20">
        <div className="container">
          {/* section header */}
          <div className="relative w-full">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Our Web Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Professional solutions tailored to boost your online presence
              </p>
            </div>
            <div className="absolute right-0 top-1/3">
              <div className="flex items-center gap-x-3">
                <button //9
                  className="flex items-center gap-2 hover:underline hover:text-primary"
                  type="button"
                  onClick={handleToggleTable}
                >
                  {isTable == true ? ( //15
                    <>
                      <FaList className="size-3" />
                      List{" "}
                    </>
                  ) : (
                    <>
                      <FaTable className="size-3" /> Table
                    </>
                  )}
                </button>
                <button
                  className="flex items-center gap-2 hover:underline hover:text-primary"
                  type="button"
                  onClick={handleAdd}
                >
                  <FaPlus className="size-3" /> Add
                </button>
              </div>
            </div>
          </div>

          {/* 3 column //12 */}

          {isTable == true ? (
            <>
              <ServicesTable //13
                isLoading={isLoading}
                handleAdd={handleAdd}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                result={result}
                error={error}
                dataServices={dataServices}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetching={isFetching}
                isFetchingNextPage={isFetchingNextPage}
                status={status}
                setPage={setPage}
                page={page}
                ref={ref}
              />
            </>
          ) : (
            <ServicesList
              handleAdd={handleAdd}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              result={result}
              error={error}
              isLoading={isLoading}
              dataServices={dataServices}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              isFetching={isFetching}
              status={status}
            />
          )}

          {/* <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {dataServices?.data.map((item, key) => {
              return (
                <div key={key} className="relative">
                  <div className="absolute top-5 right-3">
                    {" "}
                    <button
                      type="button"
                      data-tooltip="Edit"
                      className=" text-white tooltip"
                      onClick={() => handleEdit(item)}
                    >
                      <FaPencil className="p-1 bg-primary rounded-full" />
                    </button>
                    <button //3
                      type="button"
                      data-tooltip="Delete"
                      className=" text-red-600 tooltip"
                      onClick={() => handleDelete(item)}
                    >
                      <FaTrash className="p-1 bg-primary rounded-full" />
                    </button>
                  </div>
                  <CardServices item={item} />
                </div>
              );
            })}
          </div> */}
        </div>
      </section>

      {isModalServices && (
        <ModalAddServices setIsModal={setIsModalServices} itemEdit={itemEdit} />
      )}
      {isDeleteServices && (
        <ModalDeleteServices
          setModalDelete={setIsDeleteServices}
          mysqlEndpoint={`${apiVersion}/controllers/developer/web-services/web-services.php?id=${itemEdit.web_services_aid}`}
          queryKey="web-services"
        />
      )}
    </>
  );
};

export default Services;
