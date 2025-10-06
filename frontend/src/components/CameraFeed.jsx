import React, { useRef } from "react";
import * as faceapi from "face-api.js";
import './CameraFeed.css'

export default function FaciaExpression() {
  const videoRef = useRef();
  // const canvasRef = useRef();

const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error("Error accessing webcam: ", err));
    };

     async function detectMood(){
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceExpressions();
           
          let mostProbableExpression = 0
          let _expression = ''

          if(!detections || detections.length === 0){
            console.log('No face detected');
            return;
          }
          for(const expressions of Object.keys(detections[0].expressions)){
            if(detections[0].expressions[expressions] > mostProbableExpression){
                mostProbableExpression = detections[0].expressions[expressions]
                _expression = expressions
            }

          console.log(_expression);
    }
    };
    loadModels().then(startVideo);
  return (
    <div className="mainContainer">
      <video
        ref={videoRef}
        autoPlay
        muted
       
      />

      
      {/* <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "720px",
          height: "560px",
        }}
      /> */}
      <button onClick={detectMood} className="detectButton">Detect Mood</button>
    </div>
  );
}
