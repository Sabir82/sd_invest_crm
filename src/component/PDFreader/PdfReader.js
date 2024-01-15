
import { PDFReader } from 'reactjs-pdf-reader'

function PDFreader(props){
    return(
      <div style={{overflow:'hidden',height:"100%",width:"100%"}}>
        <PDFReader showAllPage={true}  url={props.props} secure/> 
      </div>
    )
}
export default PDFreader;