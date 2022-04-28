import React, {useState} from 'react'
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import {
    FaFileSignature,
  } from "react-icons/fa";
import {PdfContainer} from "./styles";


const Initial = ({pdf, setPdf}) => {
    const addToPage = async (event) =>{
        // creates a mutable version of the array since it's immutable
         //var newArray = this.state.list.slice(); 
        // creates entry variable
         var entry = {type: event.target.id, x: event.screenX, y: event.screenY, page: null}; 
        
         // pushes the entry to newArray
         //newArray.push(entry);
         // sets the new state for list
         //this.setState({list: newArray});
          var checkbox;
          var sig;
          var radio;
          var text;
        
        //this.i++;
    
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
        setPdf(pdfBytes1)
        //setList??
       }

      const handleChange = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];
    
        reader.onloadend = () => {
            setPdf(reader.result)
        };
    
        reader.readAsDataURL(file);
      };


    return (
        <>
        <div className="nav-btns">
                  <button id="Signature" style={{height: '30px', width : '100px'}} draggable="true" onDragEnd={addToPage}>Signature</button> 
                  <button id="Text" style={{height: '30px', width : '100px'}} draggable="true" onDragEnd={addToPage}>Text</button> 
                  <button id="Checkbox" style={{height: '30px', width : '100px'}} draggable="true" onDragEnd={addToPage}>Checkbox</button> 
                  <button id="RadioBtn" style={{height: '30px', width : '100px'}} draggable="true" onDragEnd={addToPage}>Radio Button</button> 
          </div>
            <h1>
            <FaFileSignature />
            <a href="/"> digital-signature</a>
            <input type="file" onChange={handleChange} />
            </h1>
            <PdfContainer>
            <iframe id="pdframe" title="pdframe" src={pdf}></iframe>
            </PdfContainer> 
        </>
    )
}

export default Initial