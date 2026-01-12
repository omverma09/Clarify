import { TextField } from "@mui/material";
import { useRef } from "react";

const OtpInput = ({ otp, setOtp }) => {
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = "";
      } else if (index > 0) {
        newOtp[index - 1] = "";
        inputRefs.current[index - 1].focus();
      }

      setOtp(newOtp);
    }
  };

  return (
    <div className="otp-box-container">
      {otp.map((digit, index) => (
        <TextField
          key={index}
          inputRef={(el) => (inputRefs.current[index] = el)}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          inputProps={{
            maxLength: 1,
            style: {
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "600",
            },
          }}
          className="otp-input"
        />
      ))}
    </div>
  );
};

export default OtpInput;