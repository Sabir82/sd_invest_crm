import React, { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Toaster, toast } from "react-hot-toast";
import { useLocation } from "react-router";
import ProfileLoader from "../component/Loader/ProfileLoader";
import logo from "../../src/svg/sd_logo.svg";
let Data;
function DocSign() {
  const [SignLoad, setSingLoad] = useState(false);
  const { state } = useLocation();
  const SignPad = useRef(undefined) as any;
  const [SignError, setSignError] = useState(false);
  const [canvasHeight, setCanvasHeight] = useState({
    width: 200,
    height: 350,
  }) as any;
  const [contractID] = useState(state) as any;

  const SignSave = () => {
    if (SignPad.current.isEmpty()) {
    }
    if (SignPad.current.toDataURL()) {
      SignPad.current.toDataURL();
    }

    Data = {
      docId: contractID.id,
      signature: SignPad.current.toDataURL(),
    };
  };

  const clear = () => {
    SignPad.current.clear();
  };
  const Checkking = (e: any) => {
    setSignError(e.isTrusted);
  };

  const SaveSignFun = () => {
    SignSave();
    if (SignError) {
      SaveSign()
        .then((res) => {
          if (res) {
            toast.success("Signatures Added Successfully!");
            setSingLoad(false);
            setTimeout(() => {
              window.location.href = "/documentSigned/thankYou";
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err);
          setSingLoad(false);
          toast.error("Signatures Not Added !");
        });
    } else {
      toast.error("Trebuie să semnezi ! / You must sign / Veuillez signer !");
    }
  };

  const SaveSign = async () => {
    setSingLoad(true);
    return await fetch("API_BASE_URL" + "addDocumentSignatures", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: "Bearer " + .get("token"),
      },
      //   body: JSON.stringify(Data),
    })
      .then((resp) => resp.json())
      .then((reD) => reD)
      .catch((err) => err);
  };

  useEffect(() => {
    const handleResize = () => {
      // Adjust canvas size based on the container or screen size
      const newWidth = window.innerWidth * 0.8; // Adjust the factor as needed
      const newHeight = window.innerHeight * 0.6; // Adjust the factor as needed

      setCanvasHeight({
        width: newWidth,
        height: newHeight,
      });
    };

    // Initial setup
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);
  return (
    <>
      <Toaster
        position="top-right"
        containerStyle={{
          zIndex: "99999999999999999999999999",
          marginRight: "40px",
        }}
      />
      <div className="container-fluid" style={{ backgroundColor: "#00000052" }}>
        <div className="row">
          <div className="col-12 px-0">
            <div className="col-12 bg-ContractPage HeightLogoContract">
              <div className="row d-flex justify-content-center">
                <div className="col-8 heightScreenTop d-flex justify-content-center">
                  <img
                    src={require("../svg/sd_logo.svg").default}
                    className="LogoIntermann"
                    style={{ paddingLeft: "15px" }}
                  />{" "}
                </div>
              </div>
            </div>
            <div
              className="row text-start mx-0 HeightWidthControl"
              style={{ background: "#E1AE99", padding: "10px" }}
            >
              <div className="col-12 topTitle">
                <h1 className="text-uppercase ">pLEASE SIGN THE DOCUment</h1>

                <p className="text-capitalize" style={{ color: "#ffff" }}>
                  I declare that I have read the document and accept it in its
                  entirety. Your IP will be saved
                </p>
              </div>
              <div className="col-12 " style={{ background: "#ffff" }}>
                <div className="row " style={{ padding: "10px" }}>
                  <div
                    className="col-12 "
                    style={{
                      background: "#E7E7E7",
                      border: "2px solid #000000",
                    }}
                  >
                    <SignatureCanvas
                      penColor="black"
                      ref={SignPad}
                      //   onEnd={SignSave()}
                      canvasProps={{
                        className: "sigCanvas",
                        width: canvasHeight.width,
                        height: canvasHeight.height,
                      }}
                      onEnd={Checkking}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12">
                {" "}
                <div className="col-12">
                  <button
                    onClick={() => {
                      clear();
                    }}
                    className="clearbtn"
                  >
                    X Clear
                  </button>
                </div>
              </div>
              <div className="col-12 mt-4">
                <p className="bottomText mb-0">
                  {" "}
                  Writing in electronic form is admitted as evidence in the same
                  way as writing on paper, provided that the person from whom it
                  emanates can be duly identified and that it is drawn up and
                  stored under conditions such as to guarantee its integrity.
                </p>
              </div>
            </div>
            <button
              className="col-12 cursor-pointer d-flex p-2 align-items-center justify-content-center semneaza"
              onClick={() => {
                SignSave();
                SaveSignFun();
              }}
              disabled={SignLoad}
            >
              {SignLoad ? (
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
              ) : (
                `✅ I ACCEPT AND SIGN`
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default DocSign;
