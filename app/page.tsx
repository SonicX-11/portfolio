"use client";

import React, { useEffect } from "react";

export default function AtelierHeroPage() {
  useEffect(() => {
    const root = document.documentElement;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) return;

    root.classList.add("is-entering");

    const failsafe = setTimeout(() => {
      root.classList.remove("is-entering", "is-playing");
      root.style.removeProperty("--au-state");
    }, 4500);

    function initPlayback() {
      requestAnimationFrame(() => {
        root.classList.add("is-playing");
        root.style.setProperty("--au-state", "running");

        const tracks = document.getAnimations ? document.getAnimations() : [];
        let finishedCount = 0;
        let totalAu = 0;

        tracks.forEach((anim) => {
          if (anim.animationName && anim.animationName.startsWith("au-")) {
            totalAu++;
            anim.onfinish = () => {
              finishedCount++;
              if (finishedCount >= totalAu) {
                cleanup();
              }
            };
          }
        });

        const timeoutDuration = totalAu === 0 ? 2200 : Math.max(2200, 1500);
        const timeoutFallback = setTimeout(cleanup, timeoutDuration);

        function cleanup() {
          clearTimeout(failsafe);
          clearTimeout(timeoutFallback);
          root.classList.remove("is-entering", "is-playing");
          root.style.removeProperty("--au-state");
        }
      });
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(initPlayback).catch(initPlayback);
      setTimeout(() => {
        if (!root.classList.contains("is-playing")) {
          initPlayback();
        }
      }, 1200);
    } else {
      setTimeout(initPlayback, 1200);
    }
  }, []);

  return (
    <>
      <style jsx global>{`
        @font-face {
          font-family: "AU Grotesk";
          src: url(/assets/au-grotesk-regular.woff2) format("woff2");
          font-weight: 400;
          font-display: block;
        }
        @font-face {
          font-family: "AU Grotesk";
          src: url(/assets/au-grotesk-bold.woff2) format("woff2");
          font-weight: 700;
          font-display: block;
        }

        :root {
          --vh: 1vh;
          --ink: #ffffff;
          --base-bot: #130e09;
          --rule: rgba(255, 255, 255, 0.115);
          --grid: rgba(255, 255, 255, 0.0265);
          --menu-bg: #fcfcfc;
          --menu-ink: #141414;
          --small-min: 10px;
          --u: min(100vw / 1280, var(--vh) * 100 / 800);
          --small: max(var(--small-min), 12.6 * var(--u));
          --ls: -0.051em;
          --au-state: paused;
          --e-expo: cubic-bezier(0.16, 1, 0.3, 1);
          --e-quint: cubic-bezier(0.22, 1, 0.36, 1);
          --e-sweep: cubic-bezier(0.76, 0, 0.24, 1);
        }

        @supports (height: 1dvh) {
          :root {
            --vh: 1dvh;
          }
        }

        @media (min-height: 480px) {
          :root {
            --small-min: 11.28px;
          }
        }

        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          height: 100%;
          background: #130e09;
          font-family: "AU Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif;
          color: #ffffff;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: geometricPrecision;
          font-kerning: normal;
        }

        a,
        button {
          color: inherit;
          font: inherit;
          text-decoration: none;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }

        a:focus-visible,
        button:focus-visible {
          outline: 1px solid white;
          outline-offset: 3px;
        }

        .small {
          font-size: var(--small);
          line-height: 1;
          font-weight: 400;
          margin: 0;
          letter-spacing: var(--ls);
          -webkit-text-stroke: 0.022em currentColor;
        }

        .actions {
          -webkit-text-stroke: 0.022em currentColor;
        }

        .hero {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          width: 100%;
          height: 100vh;
          height: 100dvh;
          min-height: 320px;
          background: linear-gradient(
            180deg,
            #0d0905 0%,
            #0f0a05 15%,
            #0d0a05 30%,
            #0d0905 45%,
            #0e0a06 60%,
            #0f0c07 75%,
            #130e08 90%,
            #130e09 100%
          );
        }

        .hero__photo {
          position: absolute;
          z-index: -3;
          --pw: max(min(100vw, 1536 * var(--u)), var(--vh) * 160);
          --fade: clamp(0px, 100vw - var(--pw), var(--pw) * 0.08);
          top: var(--photo-top, 0px);
          left: calc((100vw - var(--pw)) * 0.5293);
          width: var(--pw);
          aspect-ratio: 16/10;
          mask-image: linear-gradient(
            90deg,
            transparent,
            black var(--fade),
            black calc(100% - var(--fade)),
            transparent
          );
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent,
            black var(--fade),
            black calc(100% - var(--fade)),
            transparent
          );
        }

        .hero__photo img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
        }

        .hero__grid {
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          display: grid;
          grid-template-columns: repeat(48, 1fr);
          mask-image: radial-gradient(
            ellipse 62% 95% at 50% 62%,
            rgba(0, 0, 0, 0.83) 0%,
            #000 100%
          );
          -webkit-mask-image: radial-gradient(
            ellipse 62% 95% at 50% 62%,
            rgba(0, 0, 0, 0.83) 0%,
            #000 100%
          );
        }

        .hero__grid i {
          display: block;
          height: 100%;
        }

        .hero__grid::after {
          content: "";
          position: absolute;
          top: 0;
          left: calc(75% - 0.5px);
          width: 2px;
          height: 100%;
          background: var(--grid);
        }

        .logo {
          position: absolute;
          left: calc(20.65 * var(--u));
          top: calc(12.8 * var(--u));
          width: max(142.6 * var(--u), 96px);
          fill: var(--logo-ink, #ffffff);
        }
        .logo svg {
          display: block;
          width: 100%;
          height: auto;
          shape-rendering: geometricPrecision;
        }

        .tagline {
          position: absolute;
          left: calc(100% * 386.5 / 1280);
          top: calc(12.6 * var(--u));
        }
        .tagline span {
          display: block;
        }
        .tagline span:nth-child(1) {
          letter-spacing: -0.045em;
        }
        .tagline span:nth-child(2) {
          letter-spacing: -0.051em;
        }
        .tagline span:nth-child(3) {
          letter-spacing: -0.045em;
        }

        .contact {
          position: absolute;
          font-style: normal;
          left: calc(100% * 798.5 / 1280);
          top: calc(12.5 * var(--u));
        }
        .contact a {
          display: block;
          letter-spacing: -0.047em;
        }
        .contact span {
          display: block;
          letter-spacing: -0.069em;
        }

        .actions {
          position: absolute;
          right: calc(32 * var(--u));
          top: calc(13 * var(--u));
          display: flex;
          align-items: center;
          gap: 1.22em;
          font-size: var(--small);
        }

        button.lang {
          letter-spacing: -0.064em;
          line-height: 1;
          transform: translate(0em, 0.139em);
          -webkit-text-stroke: 0.01em currentColor;
        }

        button.menu {
          letter-spacing: -0.055em;
          width: 6.349em;
          height: 1.508em;
          background: var(--menu-bg);
          color: var(--menu-ink);
          text-align: left;
          padding-left: 0.33em;
          line-height: 1.508em;
        }
        button.menu span {
          display: inline-block;
          transform: translateY(0);
        }
        @media (hover: hover) {
          button.menu:hover {
            background: #fff;
          }
        }

        .services {
          position: absolute;
          width: 100%;
          top: calc(211.75 * var(--u));
          font-size: max(var(--small-min) * 1.06, 13.3 * var(--u));
          line-height: 1;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .services li {
          position: absolute;
          white-space: nowrap;
          -webkit-text-stroke: 0.008em currentColor;
        }
        .services li span.rv {
          display: inline-block;
        }
        .services li:nth-child(1) {
          left: calc(20 * var(--u));
          --ls: -0.047em;
          letter-spacing: var(--ls);
        }
        .services li:nth-child(2) {
          left: calc(50% - 3 * var(--u));
          transform: translateX(-50%);
          --ls: -0.0485em;
          letter-spacing: var(--ls);
        }
        .services li:nth-child(3) {
          right: calc(33.25 * var(--u));
          --ls: -0.064em;
          letter-spacing: var(--ls);
        }

        .rule {
          position: absolute;
          width: 100%;
          top: calc(239 * var(--u));
          height: 1px;
          background: var(--rule);
          z-index: -1;
          box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.038),
            0 1px 0 rgba(255, 255, 255, 0.014);
        }

        .hl {
          position: absolute;
          left: 50%;
          bottom: 0.4914em;
          margin: 0;
          width: 0;
          height: 0;
          font-size: calc(170.94 * var(--u));
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0;
          white-space: nowrap;
        }

        .hl__line {
          position: absolute;
          left: 0;
          bottom: var(--b);
          overflow: visible;
        }

        .hl__clip {
          position: relative;
          overflow: hidden;
          clip-path: inset(-0.8em -3.6em -0.05em -3.6em);
          -webkit-clip-path: inset(-0.8em -3.6em -0.05em -3.6em);
        }

        .hl__track {
          position: relative;
          display: block;
          transform: translateY(var(--rise, 0em));
          will-change: transform;
        }

        .hl__track span {
          position: absolute;
          left: var(--x);
          top: -0.909em;
          transform-origin: 0 0;
          transform: translateY(calc(0.909em + var(--dy, 0em)))
            scale(var(--sx), var(--sy)) translateY(-0.909em)
            translateY(0.5445em) scaleY(var(--k, 1)) translateY(-0.5445em);
        }

        @keyframes au-rise {
          from {
            transform: translateY(var(--rise));
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes au-soft {
          from {
            transform: translateY(var(--rise));
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes au-draw {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @keyframes au-wipe {
          from {
            clip-path: inset(0 100% 0 0);
            -webkit-clip-path: inset(0 100% 0 0);
          }
          to {
            clip-path: inset(0 0 0 0);
            -webkit-clip-path: inset(0 0 0 0);
          }
        }

        @keyframes au-on {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        html.is-entering .rule {
          transform-origin: 0 50%;
          animation: au-draw 0.85s var(--e-sweep) 0.24s var(--au-state) both;
          will-change: transform;
        }

        html.is-entering .hl__track {
          --rise: 1em;
          animation: au-rise 1.05s var(--e-expo) var(--au-state) both;
        }
        html.is-entering .hl__line:nth-child(1) .hl__track {
          animation-delay: 0.1s;
        }
        html.is-entering .hl__line:nth-child(2) .hl__track {
          animation-delay: 0.18s;
        }
        html.is-entering .hl__line:nth-child(3) .hl__track {
          animation-delay: 0.26s;
        }

        html.is-entering .services li {
          --rise: calc(100% + 0.6em);
          animation: au-rise 0.8s var(--e-quint) var(--au-state) both;
          clip-path: inset(-0.25em -0.4em -0.35em -0.4em);
          -webkit-clip-path: inset(-0.25em -0.4em -0.35em -0.4em);
          will-change: transform;
        }
        html.is-entering .services li:nth-child(1) {
          animation-delay: 0.56s;
        }
        html.is-entering .services li:nth-child(2) {
          animation-delay: 0.62s;
        }
        html.is-entering .services li:nth-child(3) {
          animation-delay: 0.68s;
        }

        html.is-entering .logo-sq-0 {
          animation: au-on 0.14s ease-out 0.7s var(--au-state) both;
        }
        html.is-entering .logo-sq-1 {
          animation: au-on 0.14s ease-out 0.735s var(--au-state) both;
        }
        html.is-entering .logo-sq-2 {
          animation: au-on 0.14s ease-out 0.84s var(--au-state) both;
        }
        html.is-entering .logo-sq-3 {
          animation: au-on 0.14s ease-out 0.91s var(--au-state) both;
        }
        html.is-entering .logo-sq-4 {
          animation: au-on 0.14s ease-out 0.805s var(--au-state) both;
        }
        html.is-entering .logo-sq-5 {
          animation: au-on 0.14s ease-out 0.945s var(--au-state) both;
        }
        html.is-entering .logo-sq-6 {
          animation: au-on 0.14s ease-out 0.7s var(--au-state) both;
        }

        html.is-entering .tagline span:nth-child(1) {
          --rise: 0.55em;
          animation: au-soft 0.75s var(--e-quint) 0.78s var(--au-state) both;
        }
        html.is-entering .tagline span:nth-child(2) {
          --rise: 0.55em;
          animation: au-soft 0.75s var(--e-quint) 0.83s var(--au-state) both;
        }
        html.is-entering .tagline span:nth-child(3) {
          --rise: 0.55em;
          animation: au-soft 0.75s var(--e-quint) 0.88s var(--au-state) both;
        }

        html.is-entering .contact a {
          --rise: 0.55em;
          animation: au-soft 0.75s var(--e-quint) 0.88s var(--au-state) both;
        }
        html.is-entering .contact span {
          --rise: 0.55em;
          animation: au-soft 0.75s var(--e-quint) 0.93s var(--au-state) both;
        }

        html.is-entering button.lang {
          --rise: 0.55em;
          animation: au-soft 0.6s var(--e-quint) 0.98s var(--au-state) both;
        }

        html.is-entering button.menu {
          clip-path: inset(0 100% 0 0);
          -webkit-clip-path: inset(0 100% 0 0);
          animation: au-wipe 0.6s cubic-bezier(0.25, 1, 0.5, 1) 1.02s
            var(--au-state) both;
        }
      `}</style>

      <div className="hero">
        <div className="hero__photo" role="presentation">
          <img
            src="/images/police.jpg"
            alt="Atelier Unit Background"
          />
        </div>
        <div className="hero__grid" aria-hidden="true">
          <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
          <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
          <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
          <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
          <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
        </div>

        <a href="#" className="logo" aria-label="Atelier Unit — home">
          <svg viewBox="0 0 142.60 30.00">
            <rect className="logo-sq-0" x="0.00" y="0.00" width="8.2" height="8.2" />
            <rect className="logo-sq-1" x="19.20" y="0.00" width="8.2" height="8.2" />
            <rect className="logo-sq-2" x="76.80" y="0.00" width="8.2" height="8.2" />
            <rect className="logo-sq-3" x="115.20" y="0.00" width="8.2" height="8.2" />
            <rect className="logo-sq-4" x="57.60" y="10.90" width="8.2" height="8.2" />
            <rect className="logo-sq-5" x="134.40" y="10.90" width="8.2" height="8.2" />
            <rect className="logo-sq-6" x="0.00" y="21.80" width="8.2" height="8.2" />
          </svg>
        </a>

        <div className="tagline small">
          <span>Craftwork and brand systems.</span>
          <span>Shaped by culture. Built with detail</span>
          <span>and technology.</span>
        </div>

        <address className="contact small">
          <a href="mailto:hello@atelierunit.com">hello@atelierunit.com</a>
          <span>Milano, EST 2013</span>
        </address>

        <div className="actions">
          <button className="lang" type="button" aria-label="Language: English">
            EN
          </button>
          <button className="menu" type="button" aria-expanded="false">
            <span>Menu</span>
          </button>
        </div>

        <ul className="services small" aria-label="Services">
          <li><span className="rv">Brand Direction</span></li>
          <li><span className="rv">Digital Products</span></li>
          <li><span className="rv">Advanced Tech</span></li>
        </ul>
        <div className="rule" aria-hidden="true"></div>

        <h1 className="hl" aria-label="Craftwork, technology, design">
          <span className="hl__line" style={{ "--b": "1.56780em" } as React.CSSProperties} aria-hidden="true">
            <span className="hl__clip">
              <span className="hl__track">
                <span style={{ "--x": "-3.04844em", "--dy": "-0.00275em", "--sx": 1.0769, "--sy": 1.0063, "--k": 1.0055 } as React.CSSProperties}>C</span>
                <span style={{ "--x": "-2.35055em", "--dy": "-0.00275em", "--sx": 1.0093, "--sy": 1.0063 } as React.CSSProperties}>R</span>
                <span style={{ "--x": "-1.68881em", "--dy": "-0.00275em", "--sx": 1.0542, "--sy": 1.0063 } as React.CSSProperties}>A</span>
                <span style={{ "--x": "-1.00202em", "--dy": "-0.00275em", "--sx": 0.9712, "--sy": 1.0063 } as React.CSSProperties}>F</span>
                <span style={{ "--x": "-0.41697em", "--dy": "-0.00275em", "--sx": 0.9516, "--sy": 1.0063 } as React.CSSProperties}>T</span>
                <span style={{ "--x": "0.15715em", "--dy": "-0.00275em", "--sx": 0.9612, "--sy": 1.0063 } as React.CSSProperties}>W</span>
                <span style={{ "--x": "1.01367em", "--dy": "-0.00275em", "--sx": 0.9833, "--sy": 1.0063, "--k": 1.0055 } as React.CSSProperties}>O</span>
                <span style={{ "--x": "1.69181em", "--dy": "-0.00275em", "--sx": 1.0093, "--sy": 1.0063 } as React.CSSProperties}>R</span>
                <span style={{ "--x": "2.33501em", "--dy": "-0.00275em", "--sx": 0.9371, "--sy": 1.0063 } as React.CSSProperties}>K</span>
              </span>
            </span>
          </span>
          <span className="hl__line" style={{ "--b": "0.78390em" } as React.CSSProperties} aria-hidden="true">
            <span className="hl__clip">
              <span className="hl__track">
                <span style={{ "--x": "-3.16648em", "--dy": "0.00059em", "--sx": 0.9516, "--sy": 0.9950 } as React.CSSProperties}>T</span>
                <span style={{ "--x": "-2.64032em", "--dy": "0.00059em", "--sx": 0.9875, "--sy": 0.9950 } as React.CSSProperties}>E</span>
                <span style={{ "--x": "-2.06523em", "--dy": "0.00059em", "--sx": 1.0678, "--sy": 0.9950, "--k": 1.0055 } as React.CSSProperties}>C</span>
                <span style={{ "--x": "-1.36691em", "--dy": "0.00059em", "--sx": 1.0031, "--sy": 0.9950 } as React.CSSProperties}>H</span>
                <span style={{ "--x": "-0.71845em", "--dy": "0.00059em", "--sx": 1.0161, "--sy": 0.9950 } as React.CSSProperties}>N</span>
                <span style={{ "--x": "-0.05103em", "--dy": "0.00059em", "--sx": 0.9833, "--sy": 0.9950, "--k": 1.0055 } as React.CSSProperties}>O</span>
                <span style={{ "--x": "0.62228em", "--dy": "0.00059em", "--sx": 0.9965, "--sy": 0.9950 } as React.CSSProperties}>L</span>
                <span style={{ "--x": "1.14822em", "--dy": "0.00059em", "--sx": 0.9833, "--sy": 0.9950, "--k": 1.0055 } as React.CSSProperties}>O</span>
                <span style={{ "--x": "1.85243em", "--dy": "0.00059em", "--sx": 1.0231, "--sy": 0.9950, "--k": 1.0055 } as React.CSSProperties}>G</span>
                <span style={{ "--x": "2.50618em", "--dy": "0.00059em", "--sx": 0.9953, "--sy": 0.9950 } as React.CSSProperties}>Y</span>
              </span>
            </span>
          </span>
          <span className="hl__line" style={{ "--b": "0.00000em" } as React.CSSProperties} aria-hidden="true">
            <span className="hl__clip">
              <span className="hl__track">
                <span style={{ "--x": "-1.77928em", "--dy": "-0.00281em", "--sx": 1.0751, "--sy": 0.9918 } as React.CSSProperties}>D</span>
                <span style={{ "--x": "-1.09091em", "--dy": "-0.00281em", "--sx": 0.9983, "--sy": 0.9918 } as React.CSSProperties}>E</span>
                <span style={{ "--x": "-0.48284em", "--dy": "-0.00281em", "--sx": 1.0123, "--sy": 0.9918, "--k": 1.0055 } as React.CSSProperties}>S</span>
                <span style={{ "--x": "0.11501em", "--dy": "-0.00281em", "--sx": 1.053, "--sy": 0.9918 } as React.CSSProperties}>I</span>
                <span style={{ "--x": "0.32558em", "--dy": "-0.00281em", "--sx": 1.0231, "--sy": 0.9918, "--k": 1.0055 } as React.CSSProperties}>G</span>
                <span style={{ "--x": "1.03138em", "--dy": "-0.00281em", "--sx": 1.0062, "--sy": 0.9918 } as React.CSSProperties}>N</span>
              </span>
            </span>
          </span>
        </h1>
      </div>
    </>
  );
}