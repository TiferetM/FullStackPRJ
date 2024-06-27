import React from 'react';
import './css/Home.css'// נתיב יחסי לקובץ CSS

const testimonials = [
  {
    name: "John Doe",
    feedback: "This is the best service I have ever used!",
    date: "2023-01-15"
  },
  {
    name: "Jane Smith",
    feedback: "Amazing experience, highly recommend!",
    date: "2023-01-10"
  },
  {
    name: "Samuel Green",
    feedback: "Great customer support and reliable service.",
    date: "2023-01-05"
  }
];

function Home() {
  return (
    <div className="home-container">
      <div className="testimonials">
        {testimonials.map((testimonial, index) => (
          <div className="testimonial" key={index}>
            <p className="feedback">"{testimonial.feedback}"</p>
            <p className="name">- {testimonial.name}</p>
            <p className="date">{testimonial.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
