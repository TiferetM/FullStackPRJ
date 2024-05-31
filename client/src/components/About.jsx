import React, { useState } from 'react';
import './css/About.css';

function About() {
  const [showMore, setShowMore] = useState(false);

  const handleClick = () => {
    setShowMore(true);
  };

  return (
    <div className="container">
      <h2>About This Website</h2>
      <p className="text">
        {showMore
          ? 'This website is specially designed for anyone who wants to design their personal room easily and quickly. We offer a wide variety of stylish furniture and accessories, unlimited color and material choices, all from the comfort of your home. Join us and experience an unforgettable design journey!'
          : 'On this website, you can design your personal room in a simple and convenient way. Choose furniture, colors, and accessories to turn your room into a special place!'}
      </p>
      {!showMore && <button className="button" onClick={handleClick}>Read More</button>}
    </div>
  );
}

export default About;
