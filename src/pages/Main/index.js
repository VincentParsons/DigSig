import React, { Component } from "react";

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

import fontkit from "@pdf-lib/fontkit";
import SignatureCanvas from "react-signature-canvas";
import DotLoopMockup from "./dotloop-Mockup";

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
export default class Main extends DotLoopMockup {

  //intial value of textField counter
  i=0;

  sigPad = {};

  clear = () => {
    this.sigPad.clear();
  };

  trim = async () => {
    const { pdf } = this.state;

    this.setState({ signing: true });
    const url = "https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf";

    const trimmedDataURL = this.sigPad
      .getTrimmedCanvas()
      .toDataURL("image/png");

    if (pdf) {
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


  addToPage = async (event) =>{
    // creates a mutable version of the array since it's immutable
     var newArray = this.state.list.slice(); 
    // creates entry variable
     var entry = {type: event.target.id, x: event.screenX, y: event.screenY, page: null}; 
    
     // pushes the entry to newArray
     newArray.push(entry);
     // sets the new state for list
     this.setState({list: newArray});
      var checkbox;
      var sig;
      var radio;
      var text;
    
    this.i++;

    const frame = document.getElementById("pdframe");
    //  const dragBtn = document.getElementById("dragMeBtn");
    //  // boundaries for frame
    //  const frameBoundaries = frame.getBoundingClientRect();
    //  console.log(frameBoundaries);
    const pdfDoc1 = await PDFDocument.load(frame.src);
    const form = pdfDoc1.getForm();
    const pages = pdfDoc1.getPages();
      if(event.target.id=="Signature"){
          
      }
  
      if(event.target.id=="Text"){
        text = form.createTextField(`text`)
        text.addToPage(pages[0], {
          x: 0,
          y: 0
        });
      }
  
      if(event.target.id=="Checkbox"){
        checkbox = form.createCheckBox(`checkbox1`);
        checkbox.addToPage(pages[0], {
          x:0,
          y:50});
      }
  
      if(event.target.id=="RadioBtn"){
        radio = form.createRadioGroup(`radio`);
        radio.addOptionToPage('radioBtn1', pages[0], {y:100, x:0} );
      }
  
  
    const pdfBytes1 = await pdfDoc1.saveAsBase64({ dataUri: true });
    this.setState({pdf: pdfBytes1, list: newArray});
   }

 ShowList(){
  // console.log("This is the new list");
 }
  
  render() {
    const { signing, pdf } = this.state;
    var loading = false;
    const { x, y } = this.state;
    return (
      <Container>
        <div>
          Mode: 
            <button onClick={()=> this.setState({mode: 'initial'})}>initial</button>
            <button onClick={()=> this.setState({mode: 'dotloop'})}>dotloop</button>
          <br/>
          <div className="nav-btns">
                  <button id="Signature" style={{height: '30px', width : '100px'}} draggable="true" onDragEnd={this.state.mode === "initial" ? this.addToPage : this.addElementToPage}>Signature</button> 
                  <button id="Text" style={{height: '30px', width : '100px'}} draggable="true" onDragEnd={this.state.mode === "initial" ? this.addToPage : this.addElementToPage}>Text</button> 
                  <button id="Checkbox" style={{height: '30px', width : '100px'}} draggable="true" onDragEnd={this.state.mode === "initial" ? this.addToPage : this.addElementToPage}>Checkbox</button> 
                  <button id="RadioBtn" style={{height: '30px', width : '100px'}} draggable="true" onDragEnd={this.state.mode === "initial" ? this.addToPage : this.addElementToPage}>Radio Button</button> 
          </div>
        </div>
        <div style={{ display: this.state.mode !=="initial" ? "block":"none"}}>
          <DotLoopMockup></DotLoopMockup>
        </div>
        {/* <h1> */}
        <h1 style={{visibility: this.state.mode!=="dotloop" ? "visible":"hidden"}}>
        <FaFileSignature />
        <a href="/"> digital-signature</a>
        <input type="file" onChange={this.handleChange} />
        </h1>

        <PdfContainer style={{display: this.state.mode!=="dotloop" ? "block":"none"}}>
          <iframe id="pdframe" title="pdframe" src={pdf}></iframe>
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
          </div>
        </SignContainer>
      </Container>
    );
  }
}
