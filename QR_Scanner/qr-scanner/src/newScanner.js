import React, { useRef, useEffect, useState } from 'react';
import jsQR from 'jsqr';

const Scanner = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false); // State to handle scanner pause

    useEffect(() => {
        const startScanner = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                videoRef.current.srcObject = stream;

                videoRef.current.onloadedmetadata = () => {
                    if (!isPaused) {
                        videoRef.current.play();
                        scanQRCode();
                    }
                };
            } catch (error) {
                console.error('Error accessing camera: ', error);
            }
        };

        const scanQRCode = () => {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            const drawFrame = () => {
                if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
                    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

                    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    const code = jsQR(imageData.data, canvas.width, canvas.height);

                    if (code && !isPaused) {
                        console.log('QR Code decoded:', code.data);

                        const stream = videoRef.current.srcObject;
                        stream.getTracks().forEach(track => track.stop());

                        handleQRCodeData(code.data);
                        return;
                    }
                }

                if (!isPaused) {
                    requestAnimationFrame(drawFrame); // Continue scanning
                }
            };

            if (!isPaused) {
                drawFrame();
            }
        };

        const handleQRCodeData = (decodedText) => {
            let parsedData;
            try {
                parsedData = JSON.parse(decodedText);
            } catch (error) {
                console.error('Error parsing QR code data:', error);
                setScanResult(`
                    <h2>Scan Error</h2>
                    <p>Invalid QR code data format.</p>
                `);
                return;
            }

            if (!parsedData.Tid) {
                setScanResult(`
                    <h2>Scan Error</h2>
                    <p>QR code data does not contain ticket_Id.</p>
                `);
                return;
            }

            fetch('http://localhost:3000/check-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ticket_id: parsedData.Tid })
            })
                .then(response => response.json())
                .then(data => {
                    let resultMessage = '';

                    if (data.status === 'allowed') {
                        resultMessage = `
                            <h2>Success!</h2>
                            <p>Ticket ID: ${parsedData.Tid}</p>
                            <p>Name: ${data.name}</p>
                            <p>Number of Adults: ${data.no_of_adults}</p>
                            <p>Number of Children: ${data.no_of_children}</p>
                            <p>Number of Foreigners: ${data.no_of_foreigners}</p>
                            <p>Events: ${data.events}</p>
                            <h3 style="color: aquamarine">You are allowed.</h3>
                        `;
                        speak("You are allowed");
                    } else if (data.status === 'not allowed') {
                        resultMessage = `
                            <h2>Rejected</h2>
                            <p>Ticket ID: ${parsedData.Tid}</p>
                            <h3 style="color: red">You are rejected.</h3>
                        `;
                        speak("You are rejected");
                    } else {
                        resultMessage = `
                            <h2>Unknown Status</h2>
                            <p>Ticket ID: ${parsedData.Tid}</p>
                            <h3 style="color: orange">Status is unknown.</h3>
                        `;
                        speak("Status is unknown");
                    }

                    setScanResult(resultMessage);

                    // Pause scanner for 3 seconds and then resume
                    setTimeout(() => {
                        if (!isPaused) {
                            startScanner();
                        }
                    }, 3000);
                })
                .catch(error => {
                    console.error('Error:', error);
                    setScanResult(`
                        <h2>Error Occurred</h2>
                        <p>Unable to process QR code.</p>
                    `);

                    speak("Error occurred, unable to process QR code.");

                    // Restart the scanner after 3 seconds if not paused
                    setTimeout(() => {
                        if (!isPaused) {
                            startScanner();
                        }
                    }, 3000);
                });
        };

        if (!isPaused) {
            startScanner();
        }

        return () => {
            const stream = videoRef.current?.srcObject;
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [isPaused]);

    const [scanResult, setScanResult] = useState(''); // State to handle scan results

    const handlePauseResume = () => {
        if (isPaused) {
            setIsPaused(false); // Resume scanning
        } else {
            setIsPaused(true); // Pause scanning
            const stream = videoRef.current?.srcObject;
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        }
    };

    // Function to handle text-to-speech
    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div style={styles.container}>
            <video ref={videoRef} style={styles.video}></video>
            <canvas ref={canvasRef} width="300" height="300" style={styles.canvas}></canvas>
            <div id="result" dangerouslySetInnerHTML={{ __html: scanResult }} style={styles.result}></div>
            <button onClick={handlePauseResume} style={styles.button}>
                {isPaused ? 'Resume Scanner' : 'Pause Scanner'}
            </button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
    },
    video: {
        display: 'none',
    },
    canvas: {
        border: '2px solid #333',
        borderRadius: '10px',
        backgroundColor: 'black',
    },
    result: {
        marginTop: '20px',
        fontSize: '18px',
        color: '#333',
    },
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
    },
};

export default Scanner;
