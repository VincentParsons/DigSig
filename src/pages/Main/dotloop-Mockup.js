import React, { Component, useState, useEffect } from "react";

import { PDFDocument } from "pdf-lib";

// Created by Jakeb Roos-Williams
// Dotloop Mockup
// Mocking what dotloop does
// generates a div per pdf page
// unlike dotloop each div has an iframe vs a png image of pdf
export default class DotLoopMockup extends Component {
    state = {
      signing: false,
      pdf: null,
      list:[],
      mode: "dotloop",
      scrollPosition: {},
      pdfs: []
  };

// add the element to pdf page
addElementToPage = async(e)=>{
  // console.log(`this is the event ${e.clientX} ${e.clientY}`);
  var list = this.state.list.slice();
  var preview = document.getElementById("preview");
  // console.log(preview);
  var element = {type: e.target.id, x: e.clientX, y: e.clientY, page: 0};
  console.log(`Screen X ${e.screenX} Y ${e.screenY}  Client X ${e.clientX} Y ${e.clientY}`);
  var newEl = document.createElement("span");
  newEl.innerHTML = e.target.id;
  newEl.backgroundColor = "white";
  newEl.style.position = "absolute";
  newEl.style.left = element.x+"px";
  newEl.style.top = element.y+'px';
  preview.appendChild(newEl);

 var bodyRect = document.body.getBoundingClientRect();
 var page = 0;
 while(page < preview.children.length){
  //  console.log("New Test");
  // var dpage = preview.children[page];
  // var iframe = document.getElementById(dpage.id.replace("page", "frame"));
  // console.log(iframe.getClientRects()[0].height);
  // // DIV 
  // console.log(`DIV ${page}`);
  // // div top
  // console.log(`Div top ${dpage.getClientRects()[0].top}`);
  // // div left
  // console.log(`Div left ${dpage.getClientRects()[0].left}`);
  // // mouse client Y
  // console.log(`Mouse ${e.clientY}`);

  // // scrollY
  // console.log(`Scroll ${window.scrollY}`);
  // page++;
  page++;
 }
}

goLookForPage(){
  // height of document
  console.log(document.documentElement.scrollHeight);

  // where is the div
  console.log(window.outerHeight);
  // scroll y
  console.log(window.scrollY);
}

getPreviewElement(){
  var preview = document.getElementById("preview");
  return preview;
}

getFile = async (event)=>{
  const file = event.target.files[0];
  var tmppath = URL.createObjectURL(file);
}

// goes finds the page from x,y event coordinates
calculatePage= async(e)=>{
  this.state.pdfs.forEach(pdf => {
    var frame = document.getElementById(pdf.id);
    console.log(frame);
    console.log(e);
  });
  return 0;
}

// reads file and generate divs for each page of the pdf 
 readFileToGenerate = (event) => { // event parameter = e: event
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
      pdfDoc2 = await PDFDocument.load(pdf2);
      pages = pdfDoc2.getPages();
      this.generateDivs(pages, pdfDoc2);
      this.setState({pdf: pdf2, pdfs: []});
    };
    window.addEventListener("scroll", ()=>{
      this.setState({scrollY: window.scrollY});
    }); 
    
    reader.readAsDataURL(file);
   }

   generateImages(){
   }

  // generate DIVs for each page of pdf like dotloop
// research included 15 hours
// testing dotloop, reading sourcecode of dotloop, looking at our source,
// comparing and contrasting source to programmatically create a mockup like dotloop
// generating a div per pdf page
  generateDivs = async(pdfPages, srcpdf=null)=>{
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
    this.createFrames(pdfs);
}

createFrames(pdfs){
  var documentEditor = this.getPreviewElement();
  documentEditor.innerHTML = "";
  var framecount = 0;
  pdfs.forEach(pdf => {
    var div = document.createElement('div');
    div.id = "document-page-"+framecount;
    div.innerHTML = `<iframe id='document-frame-${framecount}' width='100%' height='100%' src=${pdf}></iframe>`;
    div.style.borderColor = "black";
    div.style.borderStyle = "solid";
    div.style.borderWidth = "1px";
    div.style.marginBottom = "20px";
    div.style.height = "600px";
    documentEditor.appendChild(div);
    framecount++;
  });
}


componentWillUnmount(){
  this.setState({});
}



render(){
        return (<div>
          <h2>Dotloop Mockup</h2>
        <div className="form-group">
          <input    
          type="file" onChange={this.readFileToGenerate}/>
          {/* 
              readFileToGenerate function is to generate multiple divs per pdfpage inside preview based on pdfdocument like dotloop line 270
              handleChange function is the initial function for previewing the whole pdf inside the iframe pdframe line 273
          */}
        </div>
        <div id="preview">
        </div> 
    </div>);
}
}



