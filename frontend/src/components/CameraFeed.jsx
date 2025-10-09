import * as faceapi from "face-api.js";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import MoodSongs from "./MoodSongs";
import "./CameraFeed.css";

export default function CameraFeed({ setSong, Song = [] }) {
  const videoRef = useRef();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [detectedMood, setDetectedMood] = useState("");
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [showSongs, setShowSongs] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = "/models";
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      } catch (err) {
        console.error("Model loading failed:", err);
        setError("Error loading AI models. Please refresh the page.");
      }
    };
    loadModels();
  }, []);

  //  useEffect to manage the camera stream 
  useEffect(() => {
    const startVideo = () => {
      if (videoRef.current && !videoRef.current.srcObject) { // Check if it's not already running
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              setLoading(false);
            }
          })
          .catch((err) => {
            console.error("Error accessing webcam:", err);
            setError("Cannot access camera. Please allow webcam permissions.");
          });
      }
    };

    const stopVideo = () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop()); // Stop all tracks
        videoRef.current.srcObject = null; // Clear the reference
        console.log("Camera stream stopped.");
      }
    };

    if (showSongs) {
      stopVideo();
    } else {
      startVideo();
    }

    return () => {
        stopVideo();
    };
  }, [showSongs]); 

  // Detect mood function 
  const detectMood = async () => {
    setError("");
    setDetectedMood("");
    setIsFaceDetected(false);
    try {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();
      if (!detections || detections.length === 0) {
        setError("😕 No face detected! Try again.");
        return;
      }
      setIsFaceDetected(true);
      let mostProbableExpression = 0;
      let _expression = "";
      for (const exp of Object.keys(detections[0].expressions)) {
        if (detections[0].expressions[exp] > mostProbableExpression) {
          mostProbableExpression = detections[0].expressions[exp];
          _expression = exp;
        }
      }
      setDetectedMood(_expression);
      const response = await axios.get(
        `https://moody-player-backend-ma12.onrender.com`
      );
      if (response.data?.songs?.length) {
        setSong(response.data.songs);
        setShowSongs(true);
      } else {
        setError("No songs found for this mood.");
      }
    } catch (err) {
      console.error(err);
      setError("Error detecting mood. Try again.");
    }
  };

  // Reset function 
  const handleReset = () => {
    setSong([]);
    setDetectedMood("");
    setError("");
    setIsFaceDetected(false);
    setShowSongs(false);
  };

  
  const handleBack = () => {
    setShowSongs(false);
    setSong([]);
    setDetectedMood("");
  };

  return (
    <div className={`mainContainer ${showSongs ? "songsMode" : "cameraMode"}`}>
      {/* CAMERA VIEW */}
      {!showSongs && (
        <>
          {loading && <p className="statusMsg">⏳ Loading models & camera...</p>}
          {error && <p className="errorMsg">{error}</p>}
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className={`cameraFeed ${isFaceDetected ? "active" : ""}`}
          />
          
          <div className="btnContainer">
            <button onClick={detectMood} className="detectButton">Detect Mood</button>
            <button onClick={handleReset} className="refreshButton">🔄 Refresh</button>
          </div>
        </>
      )}

      {/* SONGS VIEW */}
      {showSongs && (
        <div className="songsView">
          {detectedMood && (
            <p className="detectedMood">Detected Mood - {detectedMood}</p>
          )}
          <MoodSongs Song={Song} />
          <button onClick={handleBack} className="backButton">← Back to Camera</button>
        </div>
      )}
    </div>
  );
}


