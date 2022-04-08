import React, { Component } from "react";

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

import fontkit from "@pdf-lib/fontkit";
import SignatureCanvas from "react-signature-canvas";
import {
  FaPencilAlt,
  FaEraser,
  FaSpinner,
  FaDownload,
  FaFileSignature,
} from "react-icons/fa";

import { SignContainer, PdfContainer, SignButton } from "./styles";
import Container from "../../components/Container";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
export default class Main extends Component {
  state = {
    signing: false,
    pdf: null,
    list:[]
  };
  //intial value of textField counter
  i=0;

  sigPad = {};

  clear = () => {
    this.sigPad.clear();
  };

  // sleep = ms => {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // };

  trim = async () => {
    const { pdf } = this.state;

    this.setState({ signing: true });
    const url = "https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf";

    const trimmedDataURL = this.sigPad
      .getTrimmedCanvas()
      .toDataURL("image/png");

    if (pdf) { // if the pdf has a value
      this.pdfDoc = await PDFDocument.load(pdf);

      const pngImage = await this.pdfDoc.embedPng(trimmedDataURL);
      const pngDims = pngImage.scale(0.17);

      const pages = this.pdfDoc.getPages();
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

      const helveticaFont = await this.pdfDoc.embedFont(StandardFonts.Helvetica);

      firstPage.drawText("Digital Signature Verified on " + ts, {
        x: 460,
        y: 60,
        size: 5,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1),
      });

      const pdfBytes = await this.pdfDoc.saveAsBase64({ dataUri: true });

      // await this.sleep(300);
      this.setState({ pdf: pdfBytes, signing: false });
    } else {
      this.setState({ signing: false });
    }
  };

  handleChange = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({ pdf: reader.result });
    };

    reader.readAsDataURL(file);
  };


 getPosition = async (event) =>{
  // creates a mutable version of the array since it's immutable
   var newArray = this.state.list.slice();
  // creates entry variable
   var entry = {type: event.target.id, x: event.clientX, y: event.clientY};   
   // pushes the entry to newArray
   newArray.push(entry);
   // sets the new state for list
   this.setState({list: newArray});
    var checkbox;
    var sig;
    var radio;
    var text;


  
  this.i++;

   const {pdf} = this.state;
   if(pdf){
   console.log("x coords: " + event.clientX + " y coors: " + event.clientY);
   // frame
   const frame = document.getElementById("pdframe");
   const dragBtn = document.getElementById("dragMeBtn");
   // boundaries for frame
   const frameBoundaries = frame.getBoundingClientRect();
   console.log(frameBoundaries);
   const pdfDoc1 = await PDFDocument.load(pdf);
   // do calculation for where to place the pdf element
   // position - frame 
   const elX = (event.clientX - frameBoundaries.left);
   const elY = (event.clientY - frameBoundaries.top);

   console.log(elX + " "+ elY);
   const form = pdfDoc1.getForm(); 

    if(event.target.id=="Signature"){
        
    }

    if(event.target.id=="Text"){
      text = form.createTextField(`best.gundam${this.i}`)
    }

    if(event.target.id="Checkbox"){
      checkbox = form.createCheckBox(`checkbox${this.i}`);
    }

    if(event.target.id="RadioBtn"){
      radio = form.createRadioGroup(`best.gundam${this.i}`);
    }


   const textField = form.createTextField(`sign${this.i}`);
   textField.setText('Dropped');
   const pages = pdfDoc1.getPages();
  //  textField.addToPage(pages[0], {
  //     x: elX-500,
  //     y: -elY,
  //     width:150,
  //     height: 50
  //  });
  const xy= (((dragBtn.getBoundingClientRect().height*2)+event.clientY)*4);
  console.log(xy);
  textField.addToPage(pages[0], {
     x: (event.clientX-frameBoundaries.left)-20,
     y: 0
   })
   const pdfBytes1 = await pdfDoc1.saveAsBase64({ dataUri: true });

   // await this.sleep(300);
   this.setState({ pdf: pdfBytes1, signing: false });
  }
 }

 getFrame(){
  const frame = document.getElementById("pdframe");
  frame.contentWindow.postMessage('*');
  console.log(frame.contentWindow.document);
 }

 ShowList(){
   console.log("This is the new list");
  console.log(this.state.list);
 }


getImagePreview(e)
 {
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
  reader.onloadend = async() => {
    pdf2 = reader.result;
    // get pages
    pdfDoc2 = await PDFDocument.load(pdf2);
    pages = pdfDoc2.getPages();
    console.log(pages.length);
    this.generateDivs(pages, pdfDoc2);
  };

  reader.readAsDataURL(file);
 }



  newSig = async() =>
  {
    // get frame where pdf lives
    // [0,1]
    var frame = document.getElementById("document-frame-0");

    // load pdf document
    var pdfDoc1 = await PDFDocument.load(frame.src);

    // copying the trim id
    const trimmedDataURL = this.sigPad
    .getTrimmedCanvas()
    .toDataURL("image/png");

    // embeds images
    const pngImage = await pdfDoc1.embedPng(trimmedDataURL);
    const pngDims = pngImage.scale(0.17);
    const pages = pdfDoc1.getPages();
    console.log(pages);
    // draws image to second page
    pages[0].drawImage(pngImage, {
      x: 445,
      y: 78,
      width: pngDims.width,
      height: pngDims.height,
    });

    const pdfBytes = await pdfDoc1.saveAsBase64({ dataUri: true });
    // setting source to the new bytes of the new pdf.
    frame.src = pdfBytes;
  }

 
 // generate DIVs for each page of pdf 
 generateDivs = async(pdfPages, srcpdf=null)=>{
  var i = 0;
  var documentEditor = document.getElementById("preview");
  documentEditor.innerHTML = "";
  while(i < pdfPages.length){
    let pdfNew =await PDFDocument.create();
    const copiedPages = await pdfNew.copyPages(srcpdf, [i]);
    const [firstPage] = copiedPages;
    pdfNew.addPage(firstPage);
    //console.log(copiedpages);
    const bytes = await pdfNew.saveAsBase64({ dataUri: true })
      var div = document.createElement('div');
      div.id = "document-page-"+i;
      div.innerHTML = `<iframe id='document-frame-${i}' width='100%' height='100%' src=${bytes}></iframe>`;
      div.style.borderColor = "black";
      div.style.borderStyle = "solid";
      div.style.borderWidth = "1px";
      div.style.marginBottom = "20px";
      div.contentEditable = true;
      div.style.height = "600px";
      documentEditor.appendChild(div);
      pdfNew = null;
      i++;
  }
 }

  
  render() {
    const { signing, pdf } = this.state;
    var loading = false;
    const { x, y } = this.state;
    return (
      <Container>
        <h1>
        <FaFileSignature />
        <a href="/"> digital-signature</a>
        <input type="file" onChange={this.handleChange} />
        </h1>
        <button id="Signature" style={{height: '30px', width : '100px'}} draggable="true" onDragEnd={this.getPosition}>Signature</button> 
        <button id="Text" style={{height: '30px', width : '100px'}} draggable="true" onDragEnd={this.getPosition}>Text</button> 
        <button id="Checkbox" style={{height: '30px', width : '100px'}} draggable="true" onDragEnd={this.getPosition}>Checkbox</button> 
        <button id="RadioBtn" style={{height: '30px', width : '100px'}} draggable="true" onDragEnd={this.getPosition}>Radio Button</button> 
        <button onClick={this.ShowList()}>Show List of Elements</button>
        <div className="form-group">
          {/* <input type="file" name="upload_file" className="form-control" placeholder="Enter Name" id="upload_file" onchange="getImagePreview(e)"/> */}
          <input type="file" onChange={this.readFileToGenerate}/>
          {/* 
              readFileToGenerate function is to generate multiple divs per pdfpage inside preview based on pdfdocument like dotloop line 270
              handleChange function is the initial function for previewing the whole pdf inside the iframe pdframe line 273
          */}
        </div>
         <div id="preview">
        </div> 
        <PdfContainer>
          {/* <iframe id="pdframe" title="pdframe" src={pdf} /> */}
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
            <SignButton onClick={this.newSig} disabled={signing}>
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
      </Container>
    );
  }
}
