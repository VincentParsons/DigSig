import React, { useState, useRef } from "react";
import fontkit from "@pdf-lib/fontkit";
import SignatureCanvas from "react-signature-canvas";
import DotLoopMockup from "./dotloop-Mockup";
import Initial from "./initial";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";


import {
  FaPencilAlt,
  FaEraser,
  FaSpinner,
  FaDownload,
  FaFileSignature,
  FaCaretSquareRight
} from "react-icons/fa";

import { SignContainer, PdfContainer, SignButton } from "./styles";
import Container from "../../components/Container";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const Main = () => {

  const [mode, setMode] = useState("initial")
  const [signing, setSigning] = useState(false)
  const [pdf, setPdf] = useState([])
  const [pdfs, setPdfs] = useState([])

  const [originalPdf, setOriginalPdf] = useState({})
  const [currentPage, setCurrentPage] = useState({})


  //intial value of textField counter
  //var i=0;

  const sigPad = useRef(null);

  const clear = () => {
    sigPad.current.clear();
  };

  const trim = async () => {

    setSigning(true)
    const url = "https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf";

    if (currentPage) {
      const trimmedDataURL = sigPad
        .current
        .getTrimmedCanvas()
        .toDataURL("image/png");

      const loadedPdf = await PDFDocument.load(currentPage)
      const form = loadedPdf.getForm()
      const fields = form.getFields()

      const pdfPng = await loadedPdf.embedPng(trimmedDataURL)
      const dims = pdfPng.scale(0.3)

      fields.forEach(field => {
        if (field.getName().includes('Signature')) {
          const location = field.acroField.getWidgets()[0].getRectangle()

          loadedPdf.getPage(0).drawImage(pdfPng, {
            x: location.x,
            y: location.y,
            width: dims.width,
            height: dims.height
          })

          form.removeField(field)
        }
      })

      const pdfURI = await loadedPdf.saveAsBase64({ dataUri: true })

      setCurrentPage(pdfURI)
    }

    setSigning(false)


    /* if (pdf) {
      const pdfDoc = await PDFDocument.load(pdf);

      const pngImage = await pdfDoc.embedPng(trimmedDataURL);
      const pngDims = pngImage.scale(0.17);

      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      firstPage.drawImage(pngImage, {
        x: 445,
        y: 78,
        width: pngDims.width,
        height: pngDims.height,
      });

      const timestamp = Date.now(); // This would be the timestamp you want to format

      var ts = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(timestamp);

      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

      firstPage.drawText("Digital Signature Verified on " + ts, {
        x: 460,
        y: 60,
        size: 5,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1),
      });

      const pdfBytes = await pdfDoc.saveAsBase64({ dataUri: true });

      // await this.sleep(300);
      setPdf(pdfBytes)
      setSigning(false)
    } else {
      setSigning(false);
    } */
  };




  const ShowList = () => {
    // console.log("This is the new list");
  }

  var loading = false;
  // const { x, y } = this.state;

  return (
    <Container>
      <form action="http://127.0.0.1:5000/save-pdf" method="post" enctype="multipart/form-data">
        <div>
          Mode:
          <button onClick={() => setMode('initial')}>initial</button>
          <button onClick={() => setMode('dotloop')}>dotloop</button>
          <br />
        </div> 
        {mode === "initial" ? <Initial setPdf={setPdf} pdf={pdf} /> :
          <div>
            <DotLoopMockup originalPdf={originalPdf} setOriginalPdf={setOriginalPdf} currentPage={currentPage} setCurrentPage={setCurrentPage}></DotLoopMockup>
          </div>}
        {/* <h1> */}
        <SignContainer>
          <SignatureCanvas
            penColor="black"
            ref={sigPad}
          />
          <div>
            <button type="button" onClick={clear} disabled={signing}>
              <FaEraser color="#fff" size={14} />
            </button>
            <SignButton onClick={trim} disabled={signing}>
              {signing ? (
                <FaSpinner color="#fff" size={14} />
              ) : (
                <FaPencilAlt color="#fff" size={14} />
              )}
            </SignButton>
            <button>
              <a href={pdf} download>
                <FaDownload color="#fff" size={14} />
              </a>
            </button>
            <button type="submit">
                <FaCaretSquareRight color="#fff" size={14} />
              </button>
          </div>
        </SignContainer>
      </form>
    </Container>
  );
}

export default Main
