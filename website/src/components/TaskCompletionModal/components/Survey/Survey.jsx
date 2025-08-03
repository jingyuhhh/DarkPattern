import React from "react";
import {
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Divider,
} from "@mui/material";

export const likertQuestions = [
  {
    key: "Asymmetric",
    text: "I found certain design choices to present available options unequally. For example, some options were made more obvious or attractive than others.",
  },
  {
    key: "Covert",
    text: "I found the effects of certain design choices hidden from me. For example, I couldn’t tell what would happen when I clicked or did something.",
  },
  {
    key: "Deceptive",
    text: "I found some design choices to induce false beliefs by confusing, misleading, or keeping information from me. For example, some designs confused me or made me believe something that wasn’t true.",
  },
  {
    key: "HidesInformation",
    text: "I found certain design choices to obscure or delay necessary information. For example, important information was hidden or shown too late.",
  },
  {
    key: "Restrictive",
    text: "I found certain design choices to restrict available options. For example, it felt like I wasn’t given all the choices I should have.",
  },
];

const yesNoMaybeQuestion =
  'Deceptive design strategies can be described as "user interface design choices that benefit an online service by coercing, steering, or deceiving users into making decisions that, if fully informed and capable of selecting alternatives, they might not make." Did you notice any deceptive design strategies during the previous task?';

const likertLabels = {
  1: "Strongly Disagree",
  2: "Disagree",
  3: "Somewhat Disagree",
  4: "Neutral",
  5: "Somewhat Agree",
  6: "Agree",
  7: "Strongly Agree",
};

const Survey = ({
  likertAnswers,
  setLikertAnswers,
  yesNoMaybe,
  setYesNoMaybe,
}) => {
  const handleLikertChange = (index, value) => {
    const newAnswers = [...likertAnswers];
    newAnswers[index] = value;
    setLikertAnswers(newAnswers);
  };

  return (
    <div>
      {likertQuestions.map((q, idx) => (
        <div key={q.key} style={{ marginBottom: "16px" }}>
          <Typography variant="body1">{q.text}</Typography>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={likertAnswers[idx] || ""}
              onChange={(e) =>
                handleLikertChange(idx, parseInt(e.target.value))
              }
            >
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <FormControlLabel
                  key={num}
                  value={num}
                  control={<Radio />}
                  label={`${likertLabels[num]}`}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Divider sx={{ marginY: 1 }} />
        </div>
      ))}

      <Typography variant="body1" gutterBottom>
        {yesNoMaybeQuestion}
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          row
          value={yesNoMaybe || ""}
          onChange={(e) => setYesNoMaybe(e.target.value)}
        >
          {["Yes", "No", "Maybe"].map((opt) => (
            <FormControlLabel
              key={opt}
              value={opt}
              control={<Radio />}
              label={opt}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default Survey;
