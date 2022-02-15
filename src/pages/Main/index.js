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
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class Main extends Component {
  state = {
    signing: false,
    pdf: null,
  };

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

    if (pdf) {
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

  render() {
    const { signing, pdf } = this.state;
    const { x, y } = this.state;
    return (
      <Container>
        <>
          <Router>
            <Navbar />

            <Switch>
              <Route path="/" />
            </Switch>
          </Router>
        </>

        <h1>
          <FaFileSignature />

          <a href="/"> digital-signature</a>
          <input type="file" onChange={this.handleChange} />
        </h1>

        <PdfContainer>
          <iframe title="pdframe" src={pdf} />
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

            <SignButton onClick={this.trim} loading={signing}>
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
