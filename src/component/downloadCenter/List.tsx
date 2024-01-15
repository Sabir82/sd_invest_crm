import { format } from "date-fns/format";

export default function List({data,index,onDeleteClick,delete_Status}:any) {
  return (
   
      <div
        className="col-12 mt-1"
        style={{ background: "#fe87001f", borderRadius: "10px" }}
      >
        <div className="row p-1 align-items-center">
          <div className="col-md-10 col-sm-8 col-8 gap-1  listfont px-4">
            <p className="mb-0">{data?.docName}{" - "}</p>
            <p className="mb-0"> Generated{" : "} <b>{format(data?.docGeneratedOn, "dd-MM-yyyy")  }</b></p>
            <p className="mb-0" style={{color:data?.docSignedOn ? "green":"red"}}>Signed {" : "} {data?.docSignedOn ?format(data?.docSignedOn, "dd-MM-yyyy") : "Not Signed Yet!"}</p>
            {/* <p className="mb-0">IP {" : "} 11/09/2022</p> */}
          </div>
          <div className="col-md-2 col-sm-4 col-4 px-0 ">
            <div className="row d-flex justify-content-evenly">
              {
                delete_Status?.status && data.publicId ===delete_Status?.id  ?
                "":    <button
                className="col-6 px-0 RoundDiv cursor-pointer"
                id="delete"
                style={{ border: "0px" }}
                onClick={()=>onDeleteClick(data.publicId,data?._id)}
              >
                <img
                  alt="..."
                  src={require("../../svg/Deletebucket.svg").default}
                />
              </button>

              }
          
              <button
              onClick={()=>window.open(data?.docUrl)}
                className={`col-6 px-0 RoundDiv cursor-pointer `}
                style={{ border: "none" }}   >
                <span
           className="downloadBtn0012X"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

  );
}
