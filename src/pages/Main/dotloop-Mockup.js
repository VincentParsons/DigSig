import React, { Component, useState, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import {PdfContainer} from "./styles";


// Dotloop Mockup
// Mocking what dotloop does
// generates a div per pdf page
// unlike dotloop each div has an iframe vs a png image of pdf
const DotLoopMockup = ({originalPdf, setOriginalPdf, currentPage, setCurrentPage}) => {

  const [pages, setPages] = useState([])
  const [currentPageNumber, setCurrentPageNumber] = useState(1)
  const [inputValue, setInputValue] = useState(1)

  const getField = (id, form) => {
    switch(id) {
      case 'Text':
        return form.createTextField(`Text-${form.getFields().length + 1}`)
      case 'Signature':
        const signature = form.createTextField(`Signature-${form.getFields().length + 1}`)
        signature.enableReadOnly()
        return signature
      case 'Checkbox':
        return form.createCheckBox(`CheckBox-${form.getFields().length + 1}`)
      case 'RadioBtn':
        return form.createRadioGroup(`Radio-${form.getFields().length + 1}`)
      default:
        return form.createTextField(`Text-${form.getFields().length + 1}`)

    }
  }

// add the element to pdf page
const addElementToPage = async(e)=>{
  // console.log(`this is the event ${e.clientX} ${e.clientY}`);
  //var list = this.state.list.slice();
  // console.log(preview);
  // console.log(`Screen X ${e.screenX} Y ${e.screenY}  Client X ${e.clientX} Y ${e.clientY}`);

  const pdf = await PDFDocument.load(currentPage)
  const form = pdf.getForm()

  const field = getField(e.target.id, form)
  console.log(field)
  const embedElement = document.getElementById("pdframe")
  console.log('PageY', e.pageY)
  console.log('PageX', e.pageX)
  console.log('offsetTop', embedElement.offsetTop)

  console.log('height', pdf.getPage(0).getHeight())
  console.log('width', pdf.getPage(0).getWidth())


  if(field.getName().includes("Radio")) {
    field.addOptionToPage('Radio', pdf.getPage(0), {
      x: e.pageX - embedElement.offsetLeft,
      y: pdf.getPage(0).getHeight() - ((e.pageY - embedElement.offsetTop))
    })
  } else {
    field.addToPage(pdf.getPage(0), {
      x: e.pageX - embedElement.offsetLeft,
      y: pdf.getPage(0).getHeight() - ((e.pageY - embedElement.offsetTop))
    })
  }

  const pdfBase64 = await pdf.saveAsBase64({dataUri: true})

  setCurrentPage(pdfBase64)
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
    const nextPage = currentPageNumber + 1;
    setOriginalPdf(await basePdf.saveAsBase64({dataUri: true}))
    setCurrentPage(savedNewPage)
    setCurrentPageNumber(nextPage)
    setInputValue(nextPage)
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
    const prevPage = currentPageNumber - 1;

    setOriginalPdf(await basePdf.saveAsBase64({dataUri: true}))
    setCurrentPage(savedNewPage)
    setCurrentPageNumber(prevPage)
    setInputValue(prevPage)
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
            <embed id="pdframe" title="pdframe" src={currentPage}></embed>
            </PdfContainer>
          {/*{frames.map(frame => frame)}*/}
        </div> 
    );
}


export default DotLoopMockup
