import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Alert, CircularProgress } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import API from "../api/axios.js";
import OtpInput from "../components/OtpInput";

const VerifyOtp = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (!state?.tempId) navigate("/clarify/register");
    }, [state, navigate]);

    const handleVerify = async () => {
        if (otp.includes("")) {
            setError("Please enter complete OTP");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await API.post("/auth/verify-otp", {
                tempId: state.tempId,
                otp: otp.join(""),
            });

            setSuccess("OTP verified successfully!");
            setTimeout(() => navigate("/clarify/login"), 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="otp-page">

            <div className="otp-card">
                <div className="otp-icon">
                    <MailOutlineIcon fontSize="large" />
                </div>

                <div className="otp-head">
                    <h2>Verify OTP</h2>
                    <p>
                        Please enter the OTP sent to <br />
                        <b>{state?.email}</b>
                    </p>
                </div>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}
                <OtpInput otp={otp} setOtp={setOtp} />

                <p className="resend-text">
                    Didn’t get the code? <span>Resend</span>
                </p>

                <Button
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    onClick={handleVerify}
                    sx={{ mt: 2, height: 45 }}
                >
                    {loading ? <CircularProgress size={22} /> : "Next"}
                </Button>
            </div>
        </div>
    );
};

export default VerifyOtp;
