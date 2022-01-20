import {  Droppable } from 'react-drag-and-drop';


export const Preview = ({files}) => {
    if (!files.length){
       return null 
    };


    return files.map((file) => <Droppable
                        isDragAndDropElement={true} type={["fruit"]}
                      ><embed  style={{ minHeight: '100vh',maxWidth: '570vh', padding:'20px',paddingTop:'opx' }}src={`http://localhost:8000/${file.filename}`}  alt={file.originalname}/></Droppable>)

};