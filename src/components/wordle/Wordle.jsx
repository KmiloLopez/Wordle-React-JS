import { useEffect, useState } from "react";
import { StyledBox, StyledButton } from "./Wordle.Styled";
import possibleWords from "./possibleWords";
import { useRef } from "react";
import Confetti from "react-confetti";
import confetti from "canvas-confetti";

const Wordle = () => {
  const [wordEntered, setWordEntered] = useState("");
  const [ramdomWordNew, setRamdomWordNew] = useState("");

  const [winner, setWinner] = useState(false);
  const [infoChart, setInfoChart] = useState([]);
  const [firstTime, setFirstTime] = useState(true);
  const [maxLength, setMaxLength] = useState(0);
  const [shouldPicOtherRamdomWord, setShouldPicOtherRamdomWord] =
    useState(false);

  const buttonRef = useRef(null);

  useEffect(() => {
    console.log("wordEntered", wordEntered);
    console.log("infoChart", infoChart);
    console.log("maxLength", maxLength);
    console.log("shouldPicOtherRamdomWord", shouldPicOtherRamdomWord);
  }, [wordEntered, infoChart, maxLength, shouldPicOtherRamdomWord]);

  useEffect(() => {
    if (shouldPicOtherRamdomWord || firstTime) {
      const ramdomWord =
        possibleWords[Math.floor(Math.random() * possibleWords.length)];
      console.log("Random word selected:", ramdomWord);
      setRamdomWordNew(ramdomWord);
      setFirstTime(false);
    }
    setShouldPicOtherRamdomWord(false);
    buttonRef.current.blur();
  }, [shouldPicOtherRamdomWord, firstTime]);

  useEffect(() => {
    console.log("InfoChart", infoChart);
  }, [infoChart]);

  const handleResetClick = () => {
    setWordEntered("");
    setMaxLength(0);
    setInfoChart([]);
    setShouldPicOtherRamdomWord(true);
    setFirstTime(true);
    buttonRef.current.blur();
    setWinner(false);
  };

  useEffect(() => {
    const checkWordMatches = () => {
      if (wordEntered && ramdomWordNew) {
        if (wordEntered.length < 5) {
          alert("Please enter a word of 5 letters");
          return;
        }
        if (wordEntered === ramdomWordNew) {
          console.log("YESSSSS they are equal");
          setWinner(true);
        }
        const results = wordEntered.split("").map((entletter, entindex) => {
          if (entletter === ramdomWordNew[entindex]) {
            return 2;
          } else if (ramdomWordNew.includes(entletter)) {
            return 1;
          } else {
            return 0;
          }
        });
        if (results.includes(2)) {
          confetti();
        }
        setInfoChart((prev) => [
          ...prev,
          { word: wordEntered, result: results },
        ]);

        setWordEntered("");
        setMaxLength(0);
      }
    };

    const handleKeyPressed = (event) => {
      console.log("keyPressed");
      const key = event.key;

      // Check if the key is a single letter (A-Z or a-z)
      if (/^[a-zA-Z]$/.test(key)) {
        if (maxLength <= 4) {
          console.log("key saved into wordEntered");
          setWordEntered((prevWord) => prevWord + key.toUpperCase());

          setMaxLength((prev) => prev + 1);
        } else {
          console.log("exceeded max length");
        }
      }

      if (key === "Enter") {
        console.log("Enter pressed");
        setMaxLength(0);
        checkWordMatches();
      }
      if (event.key === "Backspace") {
        setMaxLength((prev) => prev - 1);
        setWordEntered((prevWord) => prevWord.slice(0, -1)); // Remove the last letter
      }
    };

    console.log("addEventListener Ready");
    window.addEventListener("keyup", handleKeyPressed);

    return () => {
      console.log("addEventListener removed");
      window.removeEventListener("keyup", handleKeyPressed);
    };
  }, [wordEntered, maxLength, ramdomWordNew]);

  return (
    <>
      <div className="box"></div>
      {winner && <Confetti />}

      <div style={{ display: "flex", flexDirection: "column" }}>
        <ShowBoxes infoChart={infoChart} wordEntered={wordEntered} />
        <StyledButton
          ref={buttonRef}
          type="button"
          onClick={() => handleResetClick()}
        >
          Reset Game
        </StyledButton>
      </div>
    </>
  );
};

const ShowBoxes = ({ infoChart, wordEntered }) => {
  let boxes = [];
  const row = [];
  for (let j = 0; j < 6; j++) {
    for (let i = 0; i < 5; i++) {
      if (infoChart[j] !== undefined) {
        boxes.push(
          <StyledBox color={infoChart[j].result[i]} key={i}>
            {infoChart[j].word[i]}
          </StyledBox>
        );
      } else {
        const linesFilled = infoChart.length;

        const shouldFillLine = linesFilled == j;

        boxes.push(
          <StyledBox color="3" key={i}>
            {shouldFillLine ? wordEntered[i] : ""}
          </StyledBox>
        );
      }
    }
    row.push(
      <div style={{ display: "flex" }} key={j}>
        {boxes}
      </div>
    );
    boxes = [];
  }
  return row;
};

export default Wordle;
