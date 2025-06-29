// import React, { useEffect, useRef } from 'react';
// import { Html5QrcodeScanner } from 'html5-qrcode';
//
// const Scanner = () => {
//     const scannerRef = useRef(null);
//
//     useEffect(() => {
//         if (!scannerRef.current) {
//             scannerRef.current = new Html5QrcodeScanner(
//                 "reader", { fps: 10, qrbox: 250 });
//
//             const onScanSuccess = (decodedText, decodedResult) => {
//                 console.log('QR Code decoded:', decodedText);
//
//                 // Stop the scanner to prevent multiple scans
//                 scannerRef.current.clear();
//
//                 // Parse the decoded text as JSON
//                 let parsedData;
//                 try {
//                     parsedData = JSON.parse(decodedText);
//                 } catch (error) {
//                     console.error('Error parsing QR code data:', error);
//                     document.getElementById('result').innerHTML = `
//                         <h2>Scan Error</h2>
//                         <p>Invalid QR code data format.</p>
//                     `;
//                     return;
//                 }
//
//                 // Ensure the parsed data has the expected format
//                 if (!parsedData.Tid) {
//                     console.error('Invalid QR code data:', parsedData);
//                     document.getElementById('result').innerHTML = `
//                         <h2>Scan Error</h2>
//                         <p>QR code data does not contain ticket_Id.</p>
//                     `;
//                     return;
//                 }
//
//                 fetch('http://localhost:3000/check-status', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ ticket_id: parsedData.Tid })
//                 })
//                     .then(response => response.json())
//                     .then(data => {
//                         console.log('Response from server:', data);
//                         if (data.status === 'allowed') {
//                             document.getElementById('result').innerHTML = `
//                                 <h2>Success!</h2>
//                                 <p>Ticket ID: ${parsedData.Tid}</p>
//                                 <p>Name: ${data.name}</p>
//                                 <p>Number of Adults: ${data.no_of_adults}</p>
//                                 <p>Number of Children: ${data.no_of_children}</p>
//                                 <p>Number of Foreigners: ${data.no_of_foreigners}</p>
//                                 <p>Events: ${data.events}</p>
//                                 <h3 style="color: aquamarine">You are allowed.</h3>
//                             `;
//                         } else if (data.status === 'not allowed') {
//                             document.getElementById('result').innerHTML = `
//                                 <h2>Rejected</h2>
//                                 <p>Ticket ID: ${parsedData.Tid}</p>
//                                 <h3 style="color: red">You are rejected.</h3>
//                             `;
//                         } else {
//                             document.getElementById('result').innerHTML = `
//                                 <h2>Unknown Status</h2>
//                                 <p>Ticket ID: ${parsedData.Tid}</p>
//                                 <h3 style="color: orange">Status is unknown.</h3>
//                             `;
//                         }
//
//                         // Restart the scanner after a delay
//                         setTimeout(() => {
//                             scannerRef.current.render(onScanSuccess);
//                         }, 3000); // Adjust the delay as needed
//                     })
//                     .catch(error => {
//                         console.error('Error:', error);
//                         document.getElementById('result').innerHTML = `
//                             <h2>Error Occurred</h2>
//                             <p>Unable to process QR code.</p>
//                         `;
//
//                         // Restart the scanner after a delay
//                         setTimeout(() => {
//                             scannerRef.current.render(onScanSuccess);
//                         }, 3000); // Adjust the delay as needed
//                     });
//             };
//
//             scannerRef.current.render(onScanSuccess);
//         }
//
//         return () => {
//             if (scannerRef.current) {
//                 scannerRef.current.clear();
//                 scannerRef.current = null;
//             }
//         };
//     }, []);
//
//     return (
//         <div>
//             <div id="reader" style={{ width: '250px' }}></div>
//             <div id="result"></div>
//         </div>
//     );
// };
//
// export default Scanner;
