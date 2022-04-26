import React, { Component, useState, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import {PdfContainer} from "./styles";


// Dotloop Mockup
// Mocking what dotloop does
// generates a div per pdf page
// unlike dotloop each div has an iframe vs a png image of pdf
const DotLoopMockup = () => {

  const [originalPdf, setOriginalPdf] = useState({})
  const [pages, setPages] = useState([])
  const [currentPage, setCurrentPage] = useState({})
  const [currentPageNumber, setCurrentPageNumber] = useState(1)
  const [inputValue, setInputValue] = useState(1)

// add the element to pdf page
const addElementToPage = async(e)=>{
  // console.log(`this is the event ${e.clientX} ${e.clientY}`);
  //var list = this.state.list.slice();
  // console.log(preview);
  // console.log(`Screen X ${e.screenX} Y ${e.screenY}  Client X ${e.clientX} Y ${e.clientY}`);

  console.log('pageX', e.pageX)
  console.log('pageY', e.pageY)

  const pdf = await PDFDocument.load(currentPage)
  const form = pdf.getForm()

  const text = form.createTextField('text')

  text.addToPage(pdf.getPage(0), {
    x: e.pageX - 100,
    y: (pdf.getPage(0).getHeight() - e.pageY) + 26
  })


  const pdfBase64 = await pdf.saveAsBase64({dataUri: true})

  setCurrentPage(pdfBase64)
 /* var bodyRect = document.body.getBoundingClientRect();
 var page = 0;
 while(page < preview.children.length){
   console.log("New Test");
  var dpage = preview.children[page];
  // var iframe = document.getElementById(dpage.id.replace("page", "frame"));
  // console.log(iframe.getClientRects()[0].height);
  // // DIV 
  console.log(`DIV ${page}`);
  // div top
  console.log(`Div top ${dpage.getClientRects()[0].top}`);
  // div left
  console.log(`Div left ${dpage.getClientRects()[0].left}`);
  // mouse client Y
  console.log(`Mouse ${e.clientY}`);

  // scrollY
  console.log(`Scroll ${window.scrollY}`);
  // page++;
  page++;
 } */
}

const goLookForPage = function(){
  // height of document
  console.log(document.documentElement.scrollHeight);

  // where is the div
  console.log(window.outerHeight);
  // scroll y
  console.log(window.scrollY);
}

const getPreviewElement = function(){
  var preview = document.getElementById("preview");
  return preview;
}

const getFile = async (event)=>{
  const file = event.target.files[0];
  var tmppath = URL.createObjectURL(file);
}

// goes finds the page from x,y event coordinates
/* const calculatePage= async(e)=>{
  this.state.pdfs.forEach(pdf => {
    var frame = document.getElementById(pdf.id);
    console.log(frame);
    console.log(e);
  });
  return 0;
} */

// reads file and generate divs for each page of the pdf 
 const readFileToGenerate = (event) => { // event parameter = e: event
    // read pdf
    // create newFileReader
    const reader = new FileReader();
    //clears preview
   // var preview = this.getPreviewElement();
    //preview.innerHTML = "";
    // get file
    const file = event.target.files[0];
    var pdf2;
    var pdfDoc2;
    var pages;
    
    reader.onloadend = async() => {
      const pdfDoc = await PDFDocument.load(reader.result)
      const pages = pdfDoc.getPages()

      const newPdf = await PDFDocument.create()
      const copiedPage = await newPdf.copyPages(pdfDoc, [0])

      newPdf.addPage(copiedPage[0])
      const savedNewPdf = await newPdf.saveAsBase64({dataUri: true})
      //pdf2 = reader.result;
      // get pages
      //pdfDoc2 = await PDFDocument.load(pdf2);
      //pages = pdfDoc2.getPages();
      //generateDivs(pdf2);
      setOriginalPdf(reader.result)
      setCurrentPage(savedNewPdf)
      setPages(pages)
    };
/*     window.addEventListener("scroll", ()=>{
      this.setState({scrollY: window.scrollY});
    });  */
    
    reader.readAsDataURL(file);
   }

   const generateImages = function(){
   }

  // generate DIVs for each page of pdf like dotloop
// research included 15 hours
// testing dotloop, reading sourcecode of dotloop, looking at our source,
// comparing and contrasting source to programmatically create a mockup like dotloop
// generating a div per pdf page
  /* const generateDivs = async(pdfPages, srcpdf=null)=>{
    var i = 0;
    var pdfs = [];
    while(i < pdfPages.length){
      let pdfNew =await PDFDocument.create();
      const copiedPages = await pdfNew.copyPages(srcpdf, [i]);
      const [firstPage] = copiedPages;
      pdfNew.addPage(firstPage);
      const bytes = await pdfNew.saveAsBase64({ dataUri: true });
      pdfs.push(bytes);
      pdfNew = null;
      i++;
    }
    createFrames(pdfs);
} */

/* const createFrames = function(pdfs){
  var documentEditor = this.getPreviewElement();
  documentEditor.innerHTML = "";

  const frames = pdfs.map(toFrame)

  setFrames(frames)
} */

/* const toFrame = (pdf, index) => {
  return <div id={`document-page-${index}`}>
  <iframe 
  id={`document-frame-${index}`}
   width='100%' 
   height='100%' 
  style={{border: '1px solid black', marginBottom: 20, height: 600}}
  src={pdf}></iframe>
</div>
} */


/* componentWillUnmount(){
  this.setState({});
} */

const saveChangedPage = async (basePdf, currentPdfPage) => {
  basePdf.removePage(currentPageNumber - 1)

  const copiedPage = await basePdf.copyPages(currentPdfPage, [0])

  basePdf.insertPage(currentPageNumber - 1, copiedPage[0])
}

const incrementHandler = async () => {
  if(currentPageNumber < pages.length) {
    const basePdf = await PDFDocument.load(originalPdf)
    const currentPdfPage = await PDFDocument.load(currentPage)

    await saveChangedPage(basePdf, currentPdfPage)

    const newPage = await PDFDocument.create()
    const copiedPage = await newPage.copyPages(basePdf, [currentPageNumber])

    newPage.addPage(copiedPage[0])
    const savedNewPage = await newPage.saveAsBase64({dataUri: true})

    setOriginalPdf(await basePdf.saveAsBase64({dataUri: true}))
    setCurrentPage(savedNewPage)
    setCurrentPageNumber(currentPageNumber + 1)
  }
}

const decrementHandler = async () => {
  if(currentPageNumber > 1) {
    const basePdf = await PDFDocument.load(originalPdf)
    const currentPdfPage = await PDFDocument.load(currentPage)
  
    await saveChangedPage(basePdf, currentPdfPage)
  
    const newPage = await PDFDocument.create()
    const copiedPage = await newPage.copyPages(basePdf, [currentPageNumber - 2])

    newPage.addPage(copiedPage[0])
    const savedNewPage = await newPage.saveAsBase64({dataUri: true})

    setOriginalPdf(await basePdf.saveAsBase64({dataUri: true}))
    setCurrentPage(savedNewPage)
    setCurrentPageNumber(currentPageNumber - 1)
  }
}

const changePageHandler = async (e) => {
  setInputValue(e.target.value)
  if(typeof parseInt(e.target.value) === "number" && parseInt(e.target.value) >= 1 && parseInt(e.target.value) <= pages.length)
  {
    const basePdf = await PDFDocument.load(originalPdf)
    const currentPdfPage = await PDFDocument.load(currentPage)

    await saveChangedPage(basePdf, currentPdfPage)

    const newPage = await PDFDocument.create()
    const copiedPage = await newPage.copyPages(basePdf, [e.target.value - 1])

    newPage.addPage(copiedPage[0])
    const savedNewPage = await newPage.saveAsBase64({dataUri: true})

    setOriginalPdf(await basePdf.saveAsBase64({dataUri: true}))
    setCurrentPage(savedNewPage)
    setCurrentPageNumber(e.target.value)
  }
}

    return (<div>
      <div className="nav-btns">
                  <button id="Signature" style={{height: '30px', width : '100px'}} draggable="true" onDragEnd={addElementToPage}>Signature</button> 
                  <button id="Text" style={{height: '30px', width : '100px'}} draggable="true" onDragEnd={addElementToPage}>Text</button> 
                  <button id="Checkbox" style={{height: '30px', width : '100px'}} draggable="true" onDragEnd={addElementToPage}>Checkbox</button> 
                  <button id="RadioBtn" style={{height: '30px', width : '100px'}} draggable="true" onDragEnd={addElementToPage}>Radio Button</button> 
          </div>
          <h2>Dotloop Mockup</h2>
        <div className="form-group">
          <input    
          type="file" onChange={readFileToGenerate}/>
          {/* 
              readFileToGenerate function is to generate multiple divs per pdfpage inside preview based on pdfdocument like dotloop line 270
              handleChange function is the initial function for previewing the whole pdf inside the iframe pdframe line 273
          */}
        </div>
        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
          <button onClick={decrementHandler}>{'<-'}</button>
          <div><input onChange={changePageHandler} type="text" value={inputValue} /><span>{`of ${pages.length}`}</span></div>
          <button onClick={incrementHandler}>{'->'}</button>
        </div>
          <PdfContainer>
            <iframe id="pdframe" title="pdframe" src={currentPage}></iframe>
            </PdfContainer>
          {/*{frames.map(frame => frame)}*/}
        </div> 
    );
}


export default DotLoopMockup
