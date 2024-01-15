import { Link } from "react-router-dom";
import Header from "../component/Header";
import { useRef, useState } from "react";
import { BASE_URL } from "../config/config";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
export default function AddDocument() {
  const [file, setFile] = useState() as any;
  const [title, setTitle] = useState("") as any;
  const [formSubmit, setFormSubmit] = useState(false);
  const [formData, setFormData] = useState() as any;
  const ref = useRef() as any;
  const onSubmit = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
    >
  ) => {
    e.preventDefault();
    setFormSubmit(true);
    let formdata = new FormData();
    formdata.append("documentTitle", title);
    formdata.append("document", file);
    axiosInstance
      .post("uploadDocument", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setFormSubmit(false);
        setFormData(res);
      })
      .catch((error) => {
        console.log(error?.message);
        setFormSubmit(false);
      });
  };
  console.log(formData, "form");

  const fileUpload = (event: any) => {
    setFile(event.target.files[0]);
  };
  const handleCopy = () => {
    toast.success("Link copied successfully !");
  };
  return (
    <>
      <Header />
      <Toaster
        position="top-right"
        containerStyle={{ zIndex: "999999999999999999" }}
      />
      <div className="container-fluid">
        <div className="row px-3 py-2 gap-2">
          <div className="col-12 mb-2  bg-white b-10">
            <div className="row align-items-center px-4 py-2">
              <div className="col-md-4 col-sm-6">
                <Link to={"/"} style={{ textDecoration: "none" }}>
                  <button
                    type="button"
                    className="btn btnBlack d-flex text-uppercase"
                  >
                    return to document list
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 mt-2 bg-white b-10">
            <div className="downLoadCenter py-3 px-4 ">
              <h3 className="mb-0">ADD A NEW DOCUMENT TO SIGN </h3>
            </div>
          </div>

          <div className="col-12 mb-2 mt-2">
            <form
              onSubmit={onSubmit}
              className="row py-4 px-3 bg-white b-10 uploadForm"
            >
              <div className="col-12 d-grid gap-2">
                <label className="text-uppercase">
                  step 1 : Name the document
                </label>
                <input
                  placeholder="TYPE DOC NAME HERE"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="col-12 d-grid gap-2 my-3">
                <label className="text-uppercase">
                  step 2 : UPLOAD THE PDF TO SIGN
                </label>
                <button
                  type="button"
                  className="btn pdf_upload_button"
                  onClick={() => ref?.current?.click()}
                >
                  UPLOAD THE PDF FILE HERE
                </button>
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={fileUpload}
                  ref={ref}
                />
              </div>
              <div className="col-12 d-grid gap-2 my-3">
                <label className="text-uppercase d-grid">
                  step 3 : SHARE THE LINK WITH CLIENT{" "}
                </label>
                <p className="mb-0">
                  PLease share this link with the customer to make him sign{" "}
                  {" : "}
                </p>
                <p className="mb-0">
                  {!formData?.data?.document?._id ? (
                    <CopyToClipboard
                      text={formData?.data?.document?._id}
                      onCopy={handleCopy}
                    >
                  <span>
                  {formData?.data?.document?._id}
                  </span>
                    </CopyToClipboard>
                  ) : (
                    "<Link Here>"
                  )}
                </p>
                <p className="mt-4 mb-0">
                  The document will be listed on download center once signed
                </p>
              </div>
              <div className="col-12 d-grid gap-2 my-3">
                <button
                  disabled={formSubmit}
                  type="submit"
                  className={`btn ${formSubmit && "bg-black"}`}
                >
                  {formSubmit ? (
                    <span className="filterLeadsLoader"></span>
                  ) : (
                    "done"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
