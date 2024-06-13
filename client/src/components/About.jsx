import React, { useState } from 'react';
import './css/About.css';

function About() {
  const [showMore, setShowMore] = useState(false);

  const handleClick = () => {
    setShowMore(cur=>!cur);
  };

  return (
    <div className="container">
      <h2>About This Website</h2>
      <p className="text">
        {showMore
          ? 'Welcome to our website, specially designed for anyone who wants to design their personal room easily and quickly. Our site offers a wide variety of stylish furniture and accessories, as well as unlimited color and material choices, all from the comfort of your home.The design process on our site is simple and enjoyable. Start by selecting the room you want to design, and then move on to choosing the furniture and accessories. You can choose from hundreds of different items, each carefully selected by our experts to ensure quality, design, and functionality.We understand that everyone has a unique style and personal taste, which is why we offer an enormous variety of colors and materials for you to choose from. Whether you prefer a modern and clean style or a classic and warm design, you will find everything you need here to turn your vision into reality. Every item you choose can be fully customized, allowing you to mix and match different materials and colors to suit your exact taste.In addition to furniture, we also offer a large selection of complementary accessories such as cushions, rugs, lamps, and wall art, all designed to add your personal touch to the room and make it a pleasant and inviting space. All accessories are carefully chosen to fit various styles and create perfect harmony in the room.Your personal design doesn’t have to be a complicated or expensive task. On our site, you can find design solutions for any budget and style. Additionally, we offer a variety of online tools to assist you in the design process, such as guides, instructional videos, and 3D visualization software that allows you to see the newly designed room even before you place your order.Join us and start your design journey today! The design experience with us is not only convenient and fast but also enjoyable and creative. We are committed to providing you with the best service and helping you create the room you’ve always dreamed of. All you have to do is visit our site, start designing, and enjoy the process.Our professional team is always available to help you at every stage, offer expert advice, and ensure you are satisfied with the final result. Designing a personal room has never been this easy. Join the thousands of satisfied customers who have already designed their rooms using our site, and discover the unique experience we offer. Come and explore the world of personal room design online, and experience design on a different level. We are here to turn your design dreams into reality and accompany you every step of the way. Thank you for choosing our website as your partner in designing your room!'
          : 'On this website, you can design your personal room in a simple and convenient way. Choose furniture, colors, and accessories to turn your room into a special place!'}
      </p>
      <button className="button" onClick={handleClick}>Read {`${!showMore? "more": "less"}`}</button>
    </div>
  );
}

export default About;
