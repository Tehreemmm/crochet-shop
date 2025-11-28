import React from "react";
import bg2 from "../assets/bg2.jpeg";

export default function About() {
  return (
    <div className="about-wrapper">
      <div className="about-container">
        {/* Header */}
        <div className="about-header text-center">
          <h1>About Miyume</h1>
          <p>Handmade with love, inspired by tradition 💖</p>
        </div>

        {/* Story Section */}
        <div className="about-story">
          <div className="about-image">
            <img src={bg2} alt="Crochet Keychains" />
          </div>
          <div className="about-text">
            <h3>The Story Behind Miyume 🧶</h3>
            <p>
              Miyume is more than just a crochet shop — it’s a passion project
              born from the joy of turning yarn into timeless treasures. Each
              piece is handmade with patience, care, and creativity, blending
              cozy textures with modern charm.
            </p>
            <p>
              Whether it’s a warm blanket, a cute accessory, or a custom order
              made just for you, Miyume is all about making people feel loved
              through the art of crochet.
            </p>
          </div>
        </div>

        {/* Blog-style Extra Section */}
        <div className="about-blog mt-5">
          <h3>From Yarn to Heart 💗</h3>
          <p>
            Every stitch tells a story. At Miyume, we believe in quality over
            quantity — each piece is crafted with attention and passion, turning
            simple yarn into meaningful keepsakes that can be cherished for years.
          </p>
          <p>
            Our goal is to combine tradition with a modern aesthetic, so every
            item is not only functional but also a piece of art that spreads
            warmth and happiness.
          </p>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .about-wrapper {
          min-height: 100vh;
          background-color: #fef6f9; /* soft pink bg */
          padding: 4rem 1rem;
          display: flex;
          justify-content: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .about-container {
          width: 100%;
          max-width: 900px;
        }
        .about-header h1 {
          font-size: 2.5rem;
          color: #000; /* black text */
          margin-bottom: 0.5rem;
        }
        .about-header p {
          font-size: 1.1rem;
          color: #333; /* dark gray */
          margin-bottom: 3rem;
        }
        .about-story {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
          align-items: center;
        }
        .about-image img {
          width: 100%;
          border-radius: 20px;
          max-height: 450px;
          object-fit: cover;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        .about-text {
          flex: 1;
          color: #000;
        }
        .about-text h3 {
          font-size: 1.8rem;
          color: #ff99c8; /* soft pink heading */
          margin-bottom: 1rem;
        }
        .about-text p {
          font-size: 1rem;
          color: #333;
          line-height: 1.7;
          margin-bottom: 1rem;
        }
        .about-blog {
          background: #fff;
          padding: 2rem;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          color: #000;
        }
        .about-blog h3 {
          font-size: 1.8rem;
          color: #ff99c8;
          margin-bottom: 1rem;
        }
        .about-blog p {
          font-size: 1rem;
          color: #333;
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        @media(max-width: 768px) {
          .about-story {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}

