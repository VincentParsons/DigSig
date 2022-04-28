import React, {  useState, useRef } from "react";
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
<<<<<<< HEAD
  i = 0;
=======
  //var i=0;
>>>>>>> dd7caaac2961c2facf34a2416ad444f5da93116f

  const sigPad = useRef(null);

  const clear = () => {
    sigPad.current.clear();
  };

  const trim = async () => {

    setSigning(true)
    const url = "https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf";

    if(currentPage) {
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
      if(field.getName().includes('Signature')) {
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

    const pdfURI = await loadedPdf.saveAsBase64({dataUri: true})

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

<<<<<<< HEAD
  handleChange = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({ pdf: reader.result });
    };

    reader.readAsDataURL(file);
  };


  getPosition = async (event) => {
    // creates a mutable version of the array since it's immutable
    var newArray = this.state.list.slice();
    // creates entry variable
    var entry = { type: event.target.id, x: event.screenX, y: event.screenY, page: null };

    // pushes the entry to newArray
    newArray.push(entry);
    // sets the new state for list
    //  this.setState({list: newArray});
    var checkbox;
    var sig;
    var radio;
    var text;
    console.log(this.state.list);
    this.i++;

    //  const {pdf} = this.state;
    //  if(pdf){
    //  console.log("x coords: " + event.clientX + " y coors: " + event.clientY);
    //  // frame
    const frame = document.getElementById("pdframe");
    //  const dragBtn = document.getElementById("dragMeBtn");
    //  // boundaries for frame
    //  const frameBoundaries = frame.getBoundingClientRect();
    //  console.log(frameBoundaries);
    const pdfDoc1 = await PDFDocument.load(frame.src);
    const form = pdfDoc1.getForm();
    //  // do calculation for where to place the pdf element
    //  // position - frame 
    //  const elX = (event.clientX - frameBoundaries.left);
    //  const elY = (event.clientY - frameBoundaries.top);

    //  console.log(elX + " "+ elY);
    //  const form = pdfDoc1.getForm(); 
    const pages = pdfDoc1.getPages();
    console.log(event.target.id);
    if (event.target.id == "Signature") {

    }

    if (event.target.id == "Text") {
      text = form.createTextField(`text`)
      text.addToPage(pages[0], {
        x: 0,
        y: 0
      });
    }

    if (event.target.id == "Checkbox") {
      checkbox = form.createCheckBox(`checkbox1`);
      checkbox.addToPage(pages[0], {
        x: 0,
        y: 50
      });
    }

    if (event.target.id == "RadioBtn") {
      radio = form.createRadioGroup(`radio`);
      radio.addOptionToPage('radioBtn1', pages[0], { y: 100, x: 0 });
    }


    const pdfBytes1 = await pdfDoc1.saveAsBase64({ dataUri: true });
    this.setState({ pdf: pdfBytes1, list: newArray });


    //  const textField = form.createTextField(`sign${this.i}`);
    //  textField.setText('Dropped');
    //  const pages = pdfDoc1.getPages();
    // //  textField.addToPage(pages[0], {
    // //     x: elX-500,
    // //     y: -elY,
    // //     width:150,
    // //     height: 50
    // //  });
    // const xy= (((dragBtn.getBoundingClientRect().height*2)+event.clientY)*4);
    // console.log(xy);
    // textField.addToPage(pages[0], {
    //    x: (event.clientX-frameBoundaries.left)-20,
    //    y: 0
    //  })
    //  const pdfBytes1 = await pdfDoc1.saveAsBase64({ dataUri: true });

    //  // await this.sleep(300);
    //  this.setState({ pdf: pdfBytes1, signing: false });
    // }
  }

  getFrame() {
    const frame = document.getElementById("pdframe");
    frame.contentWindow.postMessage('*');
    console.log(frame.contentWindow.document);
  }


  getImagePreview(e) {
    console.log(e.target.files[0])
  }

  // reads file and generate divs for each page of the pdf 
  readFileToGenerate = (event) => { // event parameter = e: event
    // read pdf
    // create newFileReader
    const reader = new FileReader();
    // get file
    const file = event.target.files[0];
    var pdf2;
    var pdfDoc2;
    var pages;
    reader.onloadend = async () => {
      pdf2 = reader.result;
      // get pages
      pdfDoc2 = await PDFDocument.load(pdf2);
      pages = pdfDoc2.getPages();
      console.log(pages.length);
      this.generateDivs(pages, pdfDoc2);
    };

    reader.readAsDataURL(file);
  }

  // generate DIVs for each page of pdf like dotloop
  // research included 15 hours
  // testing dotloop, reading sourcecode of dotloop, looking at our source,
  // comparing and contrasting source to programmatically create a mockup like dotloop
  // generating a div per pdf page
  generateDivs = async (pdfPages, srcpdf) => {
    var i = 0;
    var documentEditor = document.getElementById("preview");
    documentEditor.innerHTML = "";
    while (i < pdfPages.length) {
      let pdfNew = await PDFDocument.create();
      const copiedPages = await pdfNew.copyPages(srcpdf, [i]);
      const [firstPage] = copiedPages;
      pdfNew.addPage(firstPage);
      const bytes = await pdfNew.saveAsBase64({ dataUri: true })
      var div = document.createElement('div');
      div.id = "document-page-" + i;
      div.innerHTML = `<iframe src="${bytes}" width='100%' height='100%'></iframe>`;
      div.style.borderColor = "black";
      div.style.borderStyle = "solid";
      div.style.borderWidth = "1px";
      div.style.marginBottom = "20px";
      div.contentEditable = true;
      div.style.height = "600px";
      var newImage = document.createElement('img');
      newImage.style.height = "100%";
      newImage.src = "";
      div.appendChild(newImage);
      documentEditor.appendChild(div);
      i++;
    }
  }


  render() {
    const { signing, pdf } = this.state;
=======
  


 const ShowList = () => {
  // console.log("This is the new list");
 }
  
>>>>>>> dd7caaac2961c2facf34a2416ad444f5da93116f
    var loading = false;
   // const { x, y } = this.state;

    return (
      <Container>
<<<<<<< HEAD
        <form action="http://127.0.0.1:5000/save-pdf" method="post" enctype="multipart/form-data">
          <h1>
            <FaFileSignature />
            <a href="/"> digital-signature</a>
            <input type="file" name="pdf" onChange={this.handleChange} />
          </h1>
          <div style={{ visibility: pdf != null ? "visible" : "hidden" }}>
            <button id="Signature" style={{ height: '30px', width: '100px' }} draggable="true" onDragEnd={this.getPosition}>Signature</button>
            <button id="Text" style={{ height: '30px', width: '100px' }} draggable="true" onDragEnd={this.getPosition}>Text</button>
            <button id="Checkbox" style={{ height: '30px', width: '100px' }} draggable="true" onDragEnd={this.getPosition}>Checkbox</button>
            <button id="RadioBtn" style={{ height: '30px', width: '100px' }} draggable="true" onDragEnd={this.getPosition}>Radio Button</button>
            {/* <button onClick={this.ShowList()}>Show List of Elements</button> */}
          </div>
          {/* <div className="form-group"> */}
          {/* <input type="file" name="upload_file" className="form-control" placeholder="Enter Name" id="upload_file" onchange="getImagePreview(e)"/> */}
          {/* <input type="file" onChange={this.readFileToGenerate}/>
        </div> */}
          {/* <div id="preview">
        </div> */}
          <PdfContainer>
            <iframe id="pdframe" title="pdframe" src={pdf}></iframe>
            {/* <div>Div Mockup</div> */}
          </PdfContainer>

          <SignContainer>
            <SignatureCanvas
              penColor="black"
              ref={(ref) => {
                this.sigPad = ref;
              }}
            />
            <div>
              <button type="button" onClick={this.clear} disabled={signing}>
                <FaEraser color="#fff" size={14} />
              </button>
              <SignButton onClick={this.trim} disabled={signing}>
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
=======
        <div>
          Mode: 
            <button onClick={()=> setMode('initial')}>initial</button>
            <button onClick={()=> setMode('dotloop')}>dotloop</button>
          <br/>
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
          </div>
        </SignContainer>
>>>>>>> dd7caaac2961c2facf34a2416ad444f5da93116f
      </Container>
    );
}

export default Main
