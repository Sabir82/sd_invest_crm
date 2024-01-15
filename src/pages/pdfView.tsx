import { useEffect, useState } from "react";
import CountDown from "../component/Loader/CountDown"
import $ from "jquery";
import { useNavigate, useParams } from "react-router-dom";
import ProfileLoader from "../component/Loader/ProfileLoader";
import Loader from "../component/Loader/Loader";
import PDFreader from "../component/PDFreader/PdfReader";
import logo from "../../src/svg/sd_logo.svg"
import { GetRoute } from "../config/apiFunctions";

let ContractData = {
    id: "",
    filePath: "",
  }as any;
export default function PDFview(){
    const [pdfTimeOut, setpdfTimeOut] = useState(false);
  const [ContractSignData] = useState(ContractData) as any;
  const [pdfUrl, setUrl] = useState() as any;
  const { id } = useParams();
  const navigate = useNavigate();


   useEffect(() => {
        $(function () {
          setTimeout(function () {
            $("#hideDiv").fadeOut(1500);
          }, 1000);
        });
        $(function () {
          setTimeout(function () {
            $("#hideDivPc").fadeOut(1500);
          }, 1000);
        });
        GetDocument()
      }, []);
    
  useEffect(() => {
    setTimeout(() => {
      setpdfTimeOut(true);
    }, 5000);
  });
  const SignDocu = (e:any) => {
    ContractData.filePath = pdfUrl;
    ContractData.id =id
    navigate(`/sign_page/${id}`, { state: ContractSignData });
  };

  const GetDocument=async()=>{
    const {data}=await GetRoute(`getDocument/?docId=${id}`)
    setUrl(data?.docUrl)

  }
    return(<>
      <>
      {/* <div id="hideDiv">
        <div className="d-grid justify-content-center align-items-center">
          <p className="mb-0 d-flex justify-content-center align-items-end">
            Nu închideți pagina, poate dura până la 1 minut. Doar așteaptă!
            <br />
            Veuillez ne pas fermer la page cela peut prendre 1mn
          </p>
          <div className="d-flex justify-content-center">
            <CountDown />
          </div>
        </div>
      </div>
      <div id="hideDivPc">
        <div className="d-grid justify-content-center align-items-center">
          <p className="mb-0 d-flex justify-content-center align-items-end">
            Nu închideți pagina, poate dura până la 1 minut. Doar așteaptă!
            <br />
            Veuillez ne pas fermer la page cela peut prendre 1mn
          </p>
          <div className="d-flex justify-content-center">
            <CountDown />
          </div>
        </div>
      </div> */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 d-flex justify-content-center  bg-ContractPage p-2">
           
            <img
            alt="..."
              src={logo}
              className=" LogoIntermann"
              style={{ paddingLeft: "30px" }}
            />
          </div>
          <div
            className="col-12 d-flex justify-content-center  overFlowHeight"
            style={{ msOverflowY: "scroll" }}
          >
            {pdfUrl ? (
              <>
                <div className="iFrameView">
                  <iframe
                    src={pdfUrl}
                    style={{ width: "90vw", height: "61vh" }}
                  />
                </div>
                <div className="PdfViewMobileRes">
                  <PDFreader props={pdfUrl} />
                </div>
              </>
            ) : (
              <Loader />
            )}
          </div>
          {/* {
            ContractSignModal ? 
             <DocSignCandidate  props={profile.candidatContract._id} closeModal={setContractSignModal} />

            :

            null
        } */}
          <div className="col-12 footerDocSign bg-ContractPage">
            {pdfTimeOut ? (
              <button className="btn" onClick={(e) => SignDocu(e)}>
                ✅ sIGN AGREEMENT
              </button>
            ) : (
              <div className="col-12 d-flex justify-content-center px-1">
                {" "}
                <ProfileLoader
                  width={150}
                  height={100}
                  fontSize={"12px"}
                  fontWeight={"600"}
                  Title={null}
                />{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
    </>)
}