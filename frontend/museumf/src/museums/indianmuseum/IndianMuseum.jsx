import React,{useEffect} from 'react'
import Gallery from '../../frontendComponents/Gallery.jsx'
import LineLeft from '../../frontendComponents/LineLeft.jsx'
import LineRight from '../../frontendComponents/LineRight.jsx'
import locate from '../locatecomp.png'
import vid from './museum3.mp4'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import {Link} from "react-router-dom";
import Nav from "../../frontendComponents/Nav.jsx";
const Museum = () => {
    useEffect(() => {
        const lenis = new Lenis();

        lenis.on("scroll", (e) => {
            console.log(e);
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    });
    return (
        <div className="wrapper">
            <Nav/>
            <div className="imgcont w-[100%] h-[65vh] z-[0] relative">
                <div className="filter w-[100%] h-[100%] bg-black opacity-[0.5] z-[2] absolute"></div>
                <video src={vid} alt="vid" autoPlay loop muted className='w-[100%] h-[100%] absolute z-[1] object-cover'/>
                <div className="textcont absolute bottom-[0%] z-[3] pl-[2vw] w-[100%] h-[8vw]">
                    <h1 className='text-[3vw] text-white italic'>Indian Museum</h1>
                    <h3 className='text-[1vw] text-white font-[200]'>Kolkata, West Bengal</h3>
                </div>
            </div>
            <div className="button w-[100%] h-[5vw] flex items-center justify-end pr-[2vw]">
                <Link to="/museums/32/booking" className='flex justify-center items-center w-[8.7vw] h-[3vw] rounded-[2vw] bg-[#1b0202] text-amber-600 p-[0.2vw]'><h4 className='text-[1vw] font-[200]'>GET TICKETS</h4></Link>
            </div>

            <div className="miscel w-[100%] mb-[2.5vw] max-h-[78vh] ">
                <LineLeft component="TIMING"/>
                <div className="timings w-[100%] h-[10vw] ">
                    <div className="upper w-[100%] flex items-center justify-center h-[85%] ">
                        <div className="left h-[100%] flex items-center justify-center w-[50%] ">
                            <div className="times h-[100%] w-[40%] ">
                                <div className="day w-[100%] h-[18%] ">
                                    <h4 className='text-[1vw] font-[200]  flex items-center'>MON-FRI</h4>
                                </div>
                                <div className="etimes w-[100%] h-[81%]  flex items-center justify-center">
                                    <div className="time h-[3vw] w-[7vw] flex items-center justify-center ">
                                        <h3 className='text-[2vw] font-[200] h-[100%] w-[80%]  flex items-center justify-center'>9:00</h3>
                                        <div className="ampm  h-[100%] w-[19%] flex items-end">
                                            <h5 className='text-[1vw] font-[800] '>am</h5>
                                        </div>
                                    </div>
                                    <div className="underline w-[10%] h-[0.05vw] ml-[0.3vw] mr-[0.3vw] bg-black"></div>
                                    <div className="time h-[3vw] w-[7vw] flex items-center justify-center ">
                                        <h3 className='text-[2vw] font-[200] h-[100%] w-[80%]  flex items-center justify-center'>13:00</h3>
                                        <div className="ampm h-[100%] w-[19%] flex items-end">
                                            <h5 className='text-[1vw] font-[800] '>pm</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="right h-[100%] w-[50%]  flex items-center justify-center">
                            <div className="times h-[100%] w-[40%] ">
                                <div className="day w-[100%] h-[18%] ">
                                    <h4 className='text-[1vw] font-[200]  flex items-center'>SAT-SUN</h4>
                                </div>
                                <div className="etimes w-[100%] h-[81%]  flex items-center justify-center">
                                    <div className="time h-[3vw] w-[7vw] flex items-center justify-center ">
                                        <h3 className='text-[2vw] font-[200] h-[100%] w-[80%]  flex items-center justify-center'>10</h3>
                                        <div className="ampm  h-[100%] w-[19%] flex items-end">
                                            <h5 className='text-[1vw] font-[800] '>am</h5>
                                        </div>
                                    </div>
                                    <div className="underline w-[10%] h-[0.05vw] bg-black ml-[0.3vw] mr-[0.3vw] "></div>
                                    <div className="time h-[3vw] w-[7vw] flex items-center justify-center ">
                                        <h3 className='text-[2vw] font-[200] h-[100%] w-[80%]  flex items-center justify-center'>12</h3>
                                        <div className="ampm  h-[100%] w-[19%] flex items-end">
                                            <h5 className='text-[1vw] font-[800] '>pm</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lower w-[100%] pl-[3vw] h-[15%] ">
                        <h4 className='text-[1vw] font-[200]'>The timings might differ due to festivals</h4>
                    </div>
                </div>


                <LineRight component="LOCATION"/>

                <div className="locations w-[100%] h-[10vw]  flex items-center justify-between">
                    <div className="part1 pl-[3vw] h-[100%] w-[85%] flex items-center ">
                        <div className="textcontainer max-h-[100%] w-[50vw] ">
                            <h2 className='text-[2.5vw] tracking-[0.1vw] leading-[100%]'>Jawaharlal Nehru Rd, Fire Brigade Head Quarter</h2>
                            <h3 className='text-[1.5vw]'>New Market Area, Dharmatala, Taltala, Kolkata, West Bengal 700016</h3>
                            <h5 className='text-[0.8vw]'>Click on the location icon to locate on google maps</h5>
                        </div>
                    </div>
                    <div className="location part2 h-[100%] w-[11%]  flex items-center justify-center">
                        <Link target="_blank" to="https://maps.app.goo.gl/K6YN9iscGTxqur5A9" className="cursor-pointer img w-[40%] h-[40%] ">
                            <img className="h-[100%] w-[100%] object-contain" src={locate} alt="loc" />
                        </Link>
                    </div>
                </div>
                <LineLeft component="ACCESSIBILITY"/>
                <div className="accessiblity flex items-center   justify-around w-[100%] h-[10vw] ">
                    <div className="image h-[6vw] w-[6vw]  ">
                        <img className="w-[100%] h-[100%] object-cover" src="https://imgs.search.brave.com/QUSx7FoyjKP-4tAcgV0R4uDu-SfKqg5DVm0my4KD7_c/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4z/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvaGVhbHRoLWNh/cmUtNjIvMzIvRGlz/YWJpbGl0eS0wMS02/NC5wbmc" alt="" />
                    </div>
                    <div className="image h-[6vw] w-[6vw]  ">
                        <img className="w-[100%] h-[100%] object-contain" src="https://imgs.search.brave.com/OTj367x7qpe8SOZrFPXIJvZ5XEn0wnul9iEvf7k5z3o/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wbHVz/cG5nLmNvbS9pbWct/cG5nL3dpZmktcG5n/LWJsYWNrLWFuZC13/aGl0ZS13aS1maS13/aWZpLXNlbWJvbC1r/YWJsb3N1ei1pbnRl/cm5ldC1pLWFyZXQt/c2lueWFsLTk2MC5w/bmc" alt="" />
                    </div>
                    <div className="image h-[6vw] w-[6vw]  ">
                        <img className="w-[100%] h-[100%] object-contain" src="https://imgs.search.brave.com/_xc3uQLtcudGmTho8czM5bajzoQNrSNuhW10EN66Xys/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG40/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvY2FyLW1haW50/ZW5hbmNlLWFuZC1z/ZXJ2aWNlLzMyL3Bh/cmtpbmctY2FyLXRp/Y2tldC16b25lLTY0/LnBuZw" alt="" />
                    </div>
                    <div className="image h-[6vw] w-[6vw]  ">
                        <img className="w-[100%] h-[100%] object-cover" src="https://imgs.search.brave.com/3s6ij5Rg5njD0XRVZeOIBrZqorEae7GwMjlqu0SSHh8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMTgv/ODg2LzU5MS9zbWFs/bC90b2lsZXQtcmVz/dHJvb20tbWVuLXdv/bWVuLWRpc2FibGVk/LWhhbmRpY2FwLXdo/ZWVsY2hhaXItc2ln/bi1wbmcucG5n" alt="" />
                    </div>
                </div>
                <LineRight component="GALLERY"/>
                <Gallery/>
            </div>
        </div>
    )
}

export default Museum