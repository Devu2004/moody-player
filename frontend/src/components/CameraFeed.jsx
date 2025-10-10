// src/components/CameraFeed.jsx
import * as faceapi from "face-api.js";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import MoodSongs from "./MoodSongs";
import "./CameraFeed.css";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export default function CameraFeed({ setSong, Song = [] }) {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [error, setError] = useState("");
  const [detectedMood, setDetectedMood] = useState("");
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [showSongs, setShowSongs] = useState(false);

  // 1. Load models once
  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = `${import.meta.env.BASE_URL}models`; // Vite-friendly
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL) // optional but helpful
        ]);
        setModelsLoaded(true);
        console.log("Face-api models loaded from", MODEL_URL);
      } catch (err) {
        console.error("Model loading failed:", err);
        setError("Error loading AI models. Please refresh the page.");
      }
    };
    loadModels();
  }, []);

  // 2. Start/stop video stream
  useEffect(() => {
    let localStream = null;
    const start = async () => {
      try {
        if (!videoRef.current) return;
        localStream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = localStream;
        await videoRef.current.play();
        setVideoReady(true);
        setLoading(false);
        console.log("Camera started");
      } catch (err) {
        console.error("Camera error:", err);
        setError("Cannot access camera. Please allow webcam permissions.");
        setLoading(false);
      }
    };

    const stop = () => {
      if (localStream) {
        localStream.getTracks().forEach((t) => t.stop());
        localStream = null;
      }
      if (videoRef.current) videoRef.current.srcObject = null;
      setVideoReady(false);
      console.log("Camera stopped");
    };

    if (!showSongs) start();
    else stop();

    return () => stop();
  }, [showSongs]);

  // 3. Detect mood
  const detectMood = async () => {
    setError("");
    setDetectedMood("");
    setIsFaceDetected(false);

    if (!modelsLoaded) {
      setError("Models are not loaded yet. Please wait.");
      return;
    }
    if (!videoReady || !videoRef.current) {
      setError("Camera not ready. Try again.");
      return;
    }

    try {
      // use detectSingleFace to simplify
      const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 });
      const detection = await faceapi
        .detectSingleFace(videoRef.current, options)
        .withFaceLandmarks()
        .withFaceExpressions();

      if (!detection) {
        setError("😕 No face detected! Try again.");
        return;
      }

      setIsFaceDetected(true);
      console.log("Raw expressions:", detection.expressions);

      // find most probable expression
      let entries = Object.entries(detection.expressions);
      entries.sort((a, b) => b[1] - a[1]);
      let top = entries[0] ? entries[0][0] : null;
      if (!top) {
        setError("Could not determine expression. Try again.");
        return;
      }

      const normalizedMood = top.toLowerCase();
      setDetectedMood(normalizedMood);

      // call backend
      const url = `${BACKEND}/songs?mood=${encodeURIComponent(normalizedMood)}`;
      const response = await axios.get(url, { timeout: 10000 });
      console.log("API response:", response.data);

      if (response.data?.songs?.length) {
        setSong(response.data.songs);
        setShowSongs(true);
      } else {
        setError("No songs found for this mood.");
      }
    } catch (err) {
      console.error("Detect/Fetch error:", err);
      setError(err?.response?.data?.message || "Error detecting mood. Try again.");
    }
  };

  // Reset & back handlers
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
            <button onClick={detectMood} className="detectButton" disabled={!modelsLoaded || !videoReady}>
              Detect Mood
            </button>
            <button onClick={handleReset} className="refreshButton">🔄 Refresh</button>
          </div>
        </>
      )}

      {showSongs && (
        <div className="songsView">
          {detectedMood && <p className="detectedMood">Detected Mood - {detectedMood}</p>}
          <MoodSongs Song={Song} />
          <button onClick={handleBack} className="backButton">← Back to Camera</button>
        </div>
      )}
    </div>
  );
}


