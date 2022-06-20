/** @jsx jsx */
import React from "react";
import { css, Global, jsx } from "@emotion/react";
import { useGesture } from "@use-gesture/react";
import { format, formatISO, parseISO } from "date-fns";
import { animated, useSpring } from "react-spring";
import background from "./assets/background.jpeg";
import cardBackground from "./assets/card-background.png";
import weddingCalendar from "./assets/wedding.ics";
import Fireflies from "./components/Fireflies";

const ceremonyDate = parseISO("2022-12-19");
const receptionDate = parseISO("2022-12-22");

function App() {
  const [cardStyle, api] = useSpring(() => ({
    transform: `perspective(0px) scale3d(0.8,0.8,0.8) rotateX(0deg) rotateY(0deg)`,
  }));

  const cardBind = useGesture({
    onHover: (event) => {
      const rect = (
        event.currentTarget as EventTarget & HTMLElement
      ).getBoundingClientRect();

      if (!event.hovering) {
        api.start({
          transform: `perspective(${rect.width}px) scale3d(0.8,0.8,0.8) rotateX(0deg) rotateY(0deg)`,
        });
      }
    },
    onMove: (event) => {
      const threshold = 5;
      const {
        currentTarget,
        xy: [x, y],
      } = event;
      const rect = (
        currentTarget as EventTarget & HTMLElement
      ).getBoundingClientRect();

      const horizontal = (x - rect.left) / rect.width;
      const vertical = (y - rect.top) / rect.height;
      const rotateX = threshold / 2 - horizontal * threshold;
      const rotateY = vertical * threshold - threshold / 2;

      api.start({
        transform: `perspective(${rect.width}px) scale3d(0.85,0.85,0.85) rotateX(${rotateY}deg) rotateY(${rotateX}deg)`,
      });
    },
  });

  return (
    <>
      <Global
        styles={css`
          body {
            margin: 0;
            font-family: "Bentham", serif;
            font-size: min(calc(0.5em + 1vw), 1em);
          }
          * {
            box-sizing: border-box;
          }
        `}
      />
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          height: "100%",
          width: "100%",
          background: `linear-gradient(180deg,rgba(0,0,0,.2),#080808), url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <animated.main
          {...cardBind()}
          onClick={() => {
            const anchor = document.createElement("a");
            anchor.href = weddingCalendar;
            anchor.target = "_blank";
            anchor.download = "wedding.ics";
            anchor.click();
          }}
          css={{
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            aspectRatio: "2160/3120",
            minHeight: "100vh",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            transform: "scale(0.8)",
            position: "relative",
            cursor: "pointer",
          }}
          style={cardStyle}
        >
          <div
            css={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={cardBackground}
              css={{
                width: "100%",
                objectFit: "contain",
                boxShadow:
                  "0 0 5px 0 rgba(0,0,0,.12),0 8px 5px -5px rgba(0,0,0,.3)",
              }}
            />
          </div>
          <div
            css={{
              zIndex: 1,
              flex: 1,
              padding: "0 24%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <header css={{ paddingTop: "6em" }}>
              <h1 css={{ marginBottom: 0 }}>
                <p
                  css={{
                    fontSize: "0.5em",
                    fontWeight: "normal",
                  }}
                >
                  Bang Nguyen & Thuy Do
                  <br />
                  together with
                  <br />
                  Hien Tang & Nham Mai
                  <br />
                  cordially invited you and your love to
                  <br />
                  the wedding of
                </p>
                <span
                  css={{
                    fontFamily: "'Monsieur La Doulaise', cursive",
                    fontWeight: "lighter",
                    fontStyle: "italic",
                    fontSize: "2.5em",
                    textTransform: "capitalize",
                  }}
                >
                  Tien
                  <span
                    css={{
                      display: "block",
                      fontFamily: "'Bentham', serif",
                      fontSize: "0.25em",
                      fontStyle: "initial",
                      letterSpacing: "0.4em",
                      textTransform: "uppercase",
                      marginTop: "-0.8em",
                    }}
                  >
                    and
                  </span>
                  Anh
                </span>
              </h1>
            </header>
            <section css={{ display: "flex", justifyContent: "space-between" }}>
              <p css={{ margin: 0 }}>
                Wedding ceremony
                <br />
                <time
                  dateTime={formatISO(ceremonyDate)}
                  css={{
                    letterSpacing: "0.1em",
                  }}
                >
                  {format(ceremonyDate, `MMM do, y`)}
                </time>
                <br />
                Thai Binh, Vietnam
              </p>
              <p css={{ margin: 0 }}>
                Wedding reception
                <br />
                <time
                  dateTime={formatISO(receptionDate)}
                  css={{
                    letterSpacing: "0.1em",
                  }}
                >
                  {format(receptionDate, `MMM do, y`)}
                </time>
                <br />
                Hanoi, Vietnam
              </p>
            </section>
          </div>
        </animated.main>
      </div>
      <Fireflies />
    </>
  );
}

export default App;
