import React,{useEffect} from 'react'
import { Hero } from '../frontendComponents/Hero';
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import Nav from '../frontendComponents/Nav';
import ai from "../../public/assets/aboutaipng.png";
const AboutUs=() => {
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
    <>
      <Nav/>
      <div className='w-screen h-[40vh] bg-cover bg-center'
           style={{backgroundImage: `url(${ai})`}}>
      </div>
      <p className='p-3 text-justify font-normal text-medium'>
        <span className='font-bold'>Enhancing Visitor Experience:</span>
        SangraM AI, our AI-powered chatbot, is designed to revolutionize the museum and heritage site ticketing
        experience. By providing a seamless and efficient way to book tickets, it eliminates the long queues and
        frustrations associated with traditional manual systems. Visitors can now enjoy a hassle-free experience from
        the moment they decide to visit a cultural location, all the way to securing their tickets and receiving
        real-time updates about events and exhibitions.
        <br/>
        <span className='font-bold'>Key Benefits and Features:</span>
        SangraM AI stands out for its ability to handle high volumes of ticket bookings effortlessly. With multilingual
        support, it caters to a diverse audience, ensuring that language barriers do not hinder the booking process. The
        chatbot is also equipped to reduce human error significantly, offering accurate and reliable service that
        enhances customer satisfaction.
        <br/>
        <span className='font-bold'>Advanced Technology Stack:</span>
        Built on a robust technology stack, SangraM AI leverages the power of Langchain for natural language processing
        and understanding, ensuring that interactions are context-aware and personalized. The backend is powered by
        reliable databases, with AWS RDS handling data storage and retrieval. The payment processing is secured through
        integration with Razorpay, providing a safe and straightforward transaction experience. The frontend is designed
        using modern frameworks like React, ensuring that users enjoy a visually appealing and intuitive interface.
        <br/>
        <span className='font-bold'>Seamless Integration and Accessibility:</span>
        <span className='font-bold'>SangraM AI</span> is not just a ticketing system but a comprehensive tool that
        integrates seamlessly with
        museum
        operations. It offers real-time updates on events and exhibitions, making it easier for visitors to plan their
        trips. The chatbot also provides downloadable PDF tickets with QR codes, simplifying entry and reducing the need
        for physical tickets. Its accessibility features ensure that all users, regardless of their technological
        proficiency, can easily navigate the booking process.
        <br/>
        <span className='font-bold'>A Vision for the Future:</span>
        SangraM AI is more than just a solution for today; it's a vision for the future of cultural exploration. By
        streamlining the booking process and providing a rich, interactive experience, it aims to foster greater
        engagement with museums and heritage sites. As we continue to develop and enhance SangraM AI, our goal is to
        make cultural locations more accessible and enjoyable for everyone, driving up visitor numbers and enriching the
        cultural landscape.
      </p>
    </>
  );
}

export default AboutUs