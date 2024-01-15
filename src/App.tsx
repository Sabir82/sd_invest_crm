import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DownloadCenter from './pages/downloadCenter';
import AddDocument from './pages/addnewDocument';
import PDFview from './pages/pdfView';
import DocSign from './pages/SignedPage';

function App() {
  return (
<>
<Router>
  <Routes>
  <Route path="/" element={<DownloadCenter />} />
  <Route path="/add_document" element={<AddDocument />} />
  <Route path={"/document/:id"} element={<PDFview />} />
            <Route path={"sign_page/:id"} element={<DocSign />} />
  </Routes>
</Router>
</>
  );
}

export default App;
