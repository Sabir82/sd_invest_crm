import React, { useState, useMemo } from "react";
import Header from "../component/Header";
import List from "../component/downloadCenter/List";
import { Link } from "react-router-dom";
import { GetRoute, PostRoute } from "../config/apiFunctions";
import toast, { Toaster } from "react-hot-toast";

export default function DownloadCenter() {
  const [data, setData] = useState([]) as any;
  const [tab_status, setTab_status] = useState("all");
  const [loading, setLoading] = useState(false);
  const [delete_Status, setdelete_Status] = useState({
    id: "",
    status: "",
  }) as any;
  useMemo(async () => {
    try {
      const { data } = await GetRoute(`getAllDocuments/?type=${tab_status}`);
      setLoading(true);
      setData([...data]);
    } catch (error: any) {
      setLoading(true);
      setData([]);
    }
  }, [tab_status, delete_Status]);
  const onDeleteClick = async (id: any,unID:any) => {
    setdelete_Status({ id: id, status: true });
      const { data } = await PostRoute("deleteDocument", { documentId: unID,id });
      if (data.status) {
        setdelete_Status({ id: "", status: false });
        toast.success(data?.message);

      } else {
        setdelete_Status({ id: "", status: false });
        toast.error(data?.message);
      }
  };
  return (
    <>
      <Toaster
        position="top-right"
        containerStyle={{ zIndex: "999999999999999999" }}
      />
      <Header />
      <div className="container-fluid">
        <div className="row px-3 py-2 gap-2">
          <div className="col-12 mb-2  bg-white b-10">
            <div className="row align-items-center px-4 py-2">
              <div className="col-md-4 col-sm-6">
                <Link style={{ textDecoration: "none" }} to={"/add_document"}>
                  <button type="button" className="btn btnBlack d-flex">
                    Add a new document
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 mt-2 bg-white b-10">
            <div className="downLoadCenter py-3 px-4 ">
              <h3 className="">DOWNLOAD CENTER</h3>
              <p className="mb-0">
                DOWNLOAD DOCUMENT SIGNED BY DOCUSIGN WITH CRM
              </p>
            </div>
          </div>

          <div className="col-12 mb-2 mt-2">
            <div className="row py-2 px-4 tabsbg">
              <div className="col-md-12 col-sm-12 col-12 gap-3 d-flex">
                <button
                  onClick={() => {
                    setTab_status("all");
                  }}
                  className="btn"
                >
                  ALL DOCUMENTS
                </button>
                <button
                  onClick={() => {
                    setTab_status("signed");
                  }}
                  className="btn"
                >
                  SIGNED ONLY
                </button>
                <button
                  onClick={() => {
                    setTab_status("unsigned");
                  }}
                  className="btn text-uppercase"
                >
                  not signed yet
                </button>
              </div>
            </div>
            <div className="row p-1 bg-white listing_part">
              {loading ? (
                data?.length > 0 ? (
                  data?.map((el: any, i: any) => (
                    <div key={i}>
                      <List data={el} index={i} onDeleteClick={onDeleteClick} deleteStatus={delete_Status} />
                    </div>
                  ))
                ) : (
                  <div className="d-flex justify-content-center align-items-center my-2">
                    <b>No data found!</b>
                  </div>
                )
              ) : <div className="d-flex justify-content-center my-3"><span className="filterLeadsLoader"  /></div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
