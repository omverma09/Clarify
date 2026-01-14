// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="content">
        <h1>404</h1>
        <div className="emoji">¯\_(ツ)_/¯</div>
        <h2>Looks like you're lost in space...</h2>
        <p>This page doesn't exist (or never did).</p>
        
        <Link to="/" className="home-btn">
          Return to Feed
        </Link>
      </div>

      <style jsx>{`
        .not-found-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #fa7108, #f74e00);
          color: white;
          text-align: center;
        }
        .content h1 {
          font-size: 8rem;
          margin: 0;
          line-height: 1;
        }
        .emoji {
          font-size: 4rem;
          margin: 1rem 0;
        }
        .home-btn {
          display: inline-block;
          margin-top: 2rem;
          padding: 0.8rem 2rem;
          background: white;
          color: #4f46e5;
          border-radius: 50px;
          text-decoration: none;
          font-weight: bold;
          transition: transform 0.2s;
        }
        .home-btn:hover {
          transform: scale(1.08);
        }
      `}</style>
    </div>
  );
}