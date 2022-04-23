import React, { Component, useState, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import {PdfContainer} from "./styles";


// Dotloop Mockup
// Mocking what dotloop does
// generates a div per pdf page
// unlike dotloop each div has an iframe vs a png image of pdf
const DotLoopMockup = ({pdf, setPdf}) => {
  const [frames, setFrames] = useState([])

// add the element to pdf page
const addElementToPage = async(e)=>{
  // console.log(`this is the event ${e.clientX} ${e.clientY}`);
  //var list = this.state.list.slice();
  var preview = document.getElementById("preview");
  // console.log(preview);
  // console.log(`Screen X ${e.screenX} Y ${e.screenY}  Client X ${e.clientX} Y ${e.clientY}`);


 var bodyRect = document.body.getBoundingClientRect();
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
 }
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
    var preview = this.getPreviewElement();
    preview.innerHTML = "";
    // get file
    const file = event.target.files[0];
    var pdf2;
    var pdfDoc2;
    var pages;
    
    reader.onloadend = async() => {
      pdf2 = reader.result;
      // get pages
      //pdfDoc2 = await PDFDocument.load(pdf2);
      //pages = pdfDoc2.getPages();
      //generateDivs(pdf2);
      setPdf(pdf2);
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
  const generateDivs = async(pdfPages, srcpdf=null)=>{
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
}

const createFrames = function(pdfs){
  var documentEditor = this.getPreviewElement();
  documentEditor.innerHTML = "";

  const frames = pdfs.map(toFrame)

  setFrames(frames)
}

const toFrame = (pdf, index) => {
  return <div id={`document-page-${index}`}>
  <iframe 
  id={`document-frame-${index}`}
   width='100%' 
   height='100%' 
  style={{border: '1px solid black', marginBottom: 20, height: 600}}
  src={pdf}></iframe>
</div>
}


/* componentWillUnmount(){
  this.setState({});
} */



    return (<div>
          <h2>Dotloop Mockup</h2>
        <div className="form-group">
          <input    
          type="file" onChange={readFileToGenerate}/>
          {/* 
              readFileToGenerate function is to generate multiple divs per pdfpage inside preview based on pdfdocument like dotloop line 270
              handleChange function is the initial function for previewing the whole pdf inside the iframe pdframe line 273
          */}
        </div>
          <PdfContainer><iframe id="pdframe" title="pdframe" src={pdf}></iframe></PdfContainer>
          {/*{frames.map(frame => frame)}*/}
        </div> 
    );
}


export default DotLoopMockup
