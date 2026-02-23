import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import "./css/FacialExpression.css";
import axios from 'axios';

function FacialExpression({ setSongs }) {
    const videoRef = useRef();
    const [expression, setExpression] = useState("...");

    useEffect(() => {
        loadModels();
    }, []);

    const startVideo = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
    };

    const loadModels = async () => {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceExpressionNet.loadFromUri("/models");

        await startVideo();

    };

    const detectFace = async () => {

        const detections = await faceapi
            .detectAllFaces(
                videoRef.current,
                new faceapi.TinyFaceDetectorOptions()
            )
            .withFaceExpressions();

        if (detections.length > 0) {
            const expressions = detections[0].expressions;
            const maxExpression = Object.keys(expressions).reduce((a, b) =>
                expressions[a] > expressions[b] ? a : b
            );

            setExpression(maxExpression);
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/songs?mood=${maxExpression}`);
            setSongs(res.data);
            console.log(res.data);

        }
    };

    return (
        <div className="facialSection">
            <div className="content">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="video"
                />

            </div>
            <div className="left-side">
                <h3>Current Emotion: <span>{expression}</span></h3>

                <button onClick={detectFace}>Detect Mood</button>
            </div>
        </div>
    );
}

export default FacialExpression;
