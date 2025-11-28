import React from "react";

export default function Contact() {
  return (
    <div className="contact-wrapper">
      <div className="contact-container">
        <div className="contact-header text-center">
          <h1>Contact Miyume</h1>
          <p>Have questions, custom requests, or just want to say hi? 💌</p>
        </div>

        <form className="contact-form">
          <div className="mb-3">
            <label>Your Name</label>
            <input type="text" placeholder="Enter your name" />
          </div>
          <div className="mb-3">
            <label>Your Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="mb-3">
            <label>Message</label>
            <textarea rows="5" placeholder="Write your message"></textarea>
          </div>
          <button type="submit">Send Message 💌</button>
        </form>

        <div className="contact-info text-center">
          <h4>Reach Out Directly 📞</h4>
          <p><strong>Email:</strong> Tehreemfatima9c@gmail.com</p>
          <p><strong>Phone:</strong> +92 332 4700408</p>
        </div>
      </div>

      <style jsx>{`
        .contact-wrapper {
          min-height: 100vh;
          background-color: #fef6f9; /* soft pink bg */
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 3rem 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .contact-container {
          width: 100%;
          max-width: 600px;
        }
        .contact-header h1 {
          color: #000;
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        .contact-header p {
          color: #333;
          font-size: 1rem;
          margin-bottom: 2rem;
        }
        .contact-form {
          background: #fff;
          padding: 2rem;
          border-radius: 20px;
          box-shadow: 0 15px 30px rgba(0,0,0,0.15);
          margin-bottom: 2rem;
        }
        .contact-form label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #000;
        }
        .contact-form input,
        .contact-form textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 14px;
          border: 1px solid #ccc;
          background: #fff0f6;
          color: #000;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        .contact-form input::placeholder,
        .contact-form textarea::placeholder {
          color: #999;
        }
        .contact-form input:focus,
        .contact-form textarea:focus {
          border-color: #ff80b3;
          outline: none;
          box-shadow: 0 0 12px rgba(255,128,179,0.3);
        }
        .contact-form button {
          width: 100%;
          padding: 0.85rem;
          border-radius: 16px;
          border: none;
          background-color: #ff99c8;
          color: #fff;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 1rem;
          transition: all 0.3s ease;
        }
        .contact-form button:hover {
          background-color: #ff80b3;
          box-shadow: 0 4px 12px rgba(255,128,179,0.3);
        }
        .contact-info h4 {
          color: #000;
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }
        .contact-info p {
          color: #333;
          margin-bottom: 0.25rem;
        }
        @media(max-width: 600px) {
          .contact-wrapper {
            padding: 2rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}

