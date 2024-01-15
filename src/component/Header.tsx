import logo from "../../src/svg/sd_logo.svg"

export default function Header(){

    return(<>
    <div className="container-fluid">
        <div className="row">
            <div className="col-2 d-flex justify-content-center align-items-center">
                <img  className="logo" src={logo} width={250} height={250}     alt="logo"   />
            </div>   
             <div className="col-8 d-flex justify-content-center align-items-center">
                <p className="company_name pb-0 mb-0">crm S.D INVEST LTD</p>
                </div>
        </div>
    </div>
    </>)
}