import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

function MailIcon() {
  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2ZM10 9L2 4V14H18V4L10 9ZM10 7L18 2H2L10 7ZM2 4V2V4V14V4Z"
        fill="#6F7A6D"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 21C1.45 21 0.979167 20.8042 0.5875 20.4125C0.195833 20.0208 0 19.55 0 19V9C0 8.45 0.195833 7.97917 0.5875 7.5875C0.979167 7.19583 1.45 7 2 7H3V5C3 3.61667 3.4875 2.4375 4.4625 1.4625C5.4375 0.4875 6.61667 0 8 0C9.38333 0 10.5625 0.4875 11.5375 1.4625C12.5125 2.4375 13 3.61667 13 5V7H14C14.55 7 15.0208 7.19583 15.4125 7.5875C15.8042 7.97917 16 8.45 16 9V19C16 19.55 15.8042 20.0208 15.4125 20.4125C15.0208 20.8042 14.55 21 14 21H2ZM2 19H14V9H2V19ZM8 16C8.55 16 9.02083 15.8042 9.4125 15.4125C9.80417 15.0208 10 14.55 10 14C10 13.45 9.80417 12.9792 9.4125 12.5875C9.02083 12.1958 8.55 12 8 12C7.45 12 6.97917 12.1958 6.5875 12.5875C6.19583 12.9792 6 13.45 6 14C6 14.55 6.19583 15.0208 6.5875 15.4125C6.97917 15.8042 7.45 16 8 16ZM5 7H11V5C11 4.16667 10.7083 3.45833 10.125 2.875C9.54167 2.29167 8.83333 2 8 2C7.16667 2 6.45833 2.29167 5.875 2.875C5.29167 3.45833 5 4.16667 5 5V7ZM2 19V9V19Z"
        fill="#6F7A6D"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11 12C12.25 12 13.3125 11.5625 14.1875 10.6875C15.0625 9.8125 15.5 8.75 15.5 7.5C15.5 6.25 15.0625 5.1875 14.1875 4.3125C13.3125 3.4375 12.25 3 11 3C9.75 3 8.6875 3.4375 7.8125 4.3125C6.9375 5.1875 6.5 6.25 6.5 7.5C6.5 8.75 6.9375 9.8125 7.8125 10.6875C8.6875 11.5625 9.75 12 11 12ZM11 10.2C10.25 10.2 9.6125 9.9375 9.0875 9.4125C8.5625 8.8875 8.3 8.25 8.3 7.5C8.3 6.75 8.5625 6.1125 9.0875 5.5875C9.6125 5.0625 10.25 4.8 11 4.8C11.75 4.8 12.3875 5.0625 12.9125 5.5875C13.4375 6.1125 13.7 6.75 13.7 7.5C13.7 8.25 13.4375 8.8875 12.9125 9.4125C12.3875 9.9375 11.75 10.2 11 10.2ZM11 15C8.56667 15 6.35 14.3208 4.35 12.9625C2.35 11.6042 0.9 9.78333 0 7.5C0.9 5.21667 2.35 3.39583 4.35 2.0375C6.35 0.679167 8.56667 0 11 0C13.4333 0 15.65 0.679167 17.65 2.0375C19.65 3.39583 21.1 5.21667 22 7.5C21.1 9.78333 19.65 11.6042 17.65 12.9625C15.65 14.3208 13.4333 15 11 15ZM11 13C12.8833 13 14.6125 12.5042 16.1875 11.5125C17.7625 10.5208 18.9667 9.18333 19.8 7.5C18.9667 5.81667 17.7625 4.47917 16.1875 3.4875C14.6125 2.49583 12.8833 2 11 2C9.11667 2 7.3875 2.49583 5.8125 3.4875C4.2375 4.47917 3.03333 5.81667 2.2 7.5C3.03333 9.18333 4.2375 10.5208 5.8125 11.5125C7.3875 12.5042 9.11667 13 11 13Z"
        fill="#6F7A6D"
      />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.45 10.05L13.025 8.625C13.175 7.725 12.9375 6.9375 12.3125 6.2625C11.6875 5.5875 10.9 5.3 9.95 5.4L8.525 3.975C8.80833 3.84167 9.10417 3.74167 9.4125 3.675C9.72083 3.60833 10.05 3.575 10.4 3.575C11.8 3.575 13 4.075 14 5.075C15 6.075 15.5 7.29167 15.5 8.725C15.5 9.075 15.4625 9.40417 15.3875 9.7125C15.3125 10.0208 15.2 10.325 15.05 10.625L14.45 10.05ZM17.8 13.3L16.4 11.95C17.0833 11.45 17.7 10.9 18.25 10.3C18.8 9.7 19.2833 9.025 19.7 8.275C18.6333 6.35833 17.1917 4.85833 15.375 3.775C13.5583 2.69167 11.575 2.15 9.425 2.15C8.84167 2.15 8.275 2.19167 7.725 2.275C7.175 2.35833 6.625 2.475 6.075 2.625L4.5 1.05C5.25 0.716667 6.05 0.458333 6.9 0.275C7.75 0.0916667 8.6 0 9.45 0C12.1833 0 14.6917 0.741667 16.975 2.225C19.2583 3.70833 20.975 5.71667 22.125 8.25C21.6583 9.36667 21.0542 10.3708 20.3125 11.2625C19.5708 12.1542 18.7333 12.7917 17.8 13.3ZM19.2 19L15.8 15.675C15.0333 15.9583 14.2458 16.1875 13.4375 16.3625C12.6292 16.5375 11.8 16.625 10.95 16.625C8.20833 16.625 5.7 15.8833 3.4125 14.4C1.125 12.9167 -0.591667 10.9083 -1.74153e-06 8.375C0.441666 7.275 1.04583 6.29167 1.8125 5.425C2.57917 4.55833 3.45 3.83333 4.425 3.25L1.6 0.375L2.975 -0.975L20.575 17.65L19.2 19ZM5.825 4.625C5.10833 5.10833 4.46667 5.66667 3.9 6.3C3.33333 6.93333 2.875 7.625 2.525 8.375C3.57500 10.2917 5.00833 11.7792 6.825 12.8375C8.64167 13.8958 10.625 14.425 12.775 14.425C13.275 14.425 13.7667 14.3875 14.25 14.3125C14.7333 14.2375 15.2 14.1417 15.65 14.025L14.325 12.7C14.025 12.8333 13.7208 12.9292 13.4125 12.9875C13.1042 13.0458 12.7833 13.075 12.45 13.075C11.05 13.075 9.85 12.575 8.85 11.575C7.85 10.575 7.35 9.35833 7.35 7.925C7.35 7.59167 7.38333 7.275 7.45 6.975C7.51667 6.675 7.60833 6.38333 7.725 6.1L5.825 4.625Z"
        fill="#6F7A6D"
      />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.75 25V19.625C2.5625 18.5417 1.64062 17.276 0.984375 15.8281C0.328125 14.3802 0 12.8542 0 11.25C0 8.125 1.09375 5.46875 3.28125 3.28125C5.46875 1.09375 8.125 0 11.25 0C13.8542 0 16.1615 0.765625 18.1719 2.29688C20.1823 3.82812 21.4896 5.82292 22.0938 8.28125L23.7188 14.6875C23.8229 15.0833 23.75 15.4427 23.5 15.7656C23.25 16.0885 22.9167 16.25 22.5 16.25H20V20C20 20.6875 19.7552 21.276 19.2656 21.7656C18.776 22.2552 18.1875 22.5 17.5 22.5H15V25H12.5V20H17.5V13.75H20.875L19.6875 8.90625C19.2083 7.01042 18.1875 5.46875 16.625 4.28125C15.0625 3.09375 13.2708 2.5 11.25 2.5C8.83333 2.5 6.77083 3.34375 5.0625 5.03125C3.35417 6.71875 2.5 8.77083 2.5 11.1875C2.5 12.4375 2.75521 13.625 3.26562 14.75C3.77604 15.875 4.5 16.875 5.4375 17.75L6.25 18.5V25H3.75ZM11.25 17.5C11.6042 17.5 11.901 17.3802 12.1406 17.1406C12.3802 16.901 12.5 16.6042 12.5 16.25C12.5 15.8958 12.3802 15.599 12.1406 15.3594C11.901 15.1198 11.6042 15 11.25 15C10.8958 15 10.599 15.1198 10.3594 15.3594C10.1198 15.599 10 15.8958 10 16.25C10 16.6042 10.1198 16.901 10.3594 17.1406C10.599 17.3802 10.8958 17.5 11.25 17.5ZM10.3125 13.5H12.2188C12.2188 12.9792 12.2865 12.5573 12.4219 12.2344C12.5573 11.9115 12.8333 11.5208 13.25 11.0625C13.625 10.6458 13.9896 10.224 14.3438 9.79688C14.6979 9.36979 14.875 8.8125 14.875 8.125C14.875 7.25 14.5365 6.51042 13.8594 5.90625C13.1823 5.30208 12.3438 5 11.3438 5C10.5104 5 9.75521 5.23958 9.07812 5.71875C8.40104 6.19792 7.92708 6.82292 7.65625 7.59375L9.375 8.3125C9.52083 7.85417 9.77604 7.48438 10.1406 7.20312C10.5052 6.92188 10.9062 6.78125 11.3438 6.78125C11.8021 6.78125 12.1823 6.90625 12.4844 7.15625C12.7865 7.40625 12.9375 7.72917 12.9375 8.125C12.9375 8.5625 12.8073 8.95312 12.5469 9.29688C12.2865 9.64062 11.9792 9.98958 11.625 10.3438C11.2083 10.7812 10.8854 11.2188 10.6562 11.6562C10.4271 12.0938 10.3125 12.7083 10.3125 13.5Z"
        fill="#026E2B"
      />
    </svg>
  );
}

type Role = "parent" | "therapist" | null;

export function RightPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<Role>(null);
  const navigate = useNavigate();

  const handleRoleSelect = (selected: Role) => {
    setRole((prev) => (prev === selected ? null : selected));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "therapist") {
      navigate("/dashboard");
    } else if (role === "parent") {
      navigate("/parent");
    }
  };

  return (
    <div className="flex lg:w-[40%] lg:flex-none bg-white flex-col justify-start items-center pt-20 pb-12 px-8 md:px-16">
      <div className="w-full max-w-[384px] flex flex-col gap-10">
        {/* Header section */}
        <div className="flex flex-col items-center gap-3">
          {/* Brain icon circle */}
          <div
            className="w-16 h-16 flex items-center justify-center rounded-full flex-shrink-0"
            style={{
              background: "#b8d8be",
              border: "4px solid #FFF",
              boxShadow: "inset 0 2px 4px 4px rgba(0, 0, 0, 0.05)",
            }}
          >
            <BrainIcon />
          </div>

          <div className="flex flex-col items-center gap-1 text-center">
            <h2
              className="font-bold tracking-tight"
              style={{
                fontSize: "32px",
                lineHeight: "1.2",
                color: "#0D1F11",
                letterSpacing: "-0.32px",
              }}
            >
              Welcome back
            </h2>
            <p
              className="text-base font-normal leading-relaxed"
              style={{ color: "#3F493E", maxWidth: "300px" }}
            >
              Please enter your details to access your dashboard.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Email field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-xs font-semibold pl-2"
              style={{ color: "#3F493E" }}
            >
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <MailIcon />
              </span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-12 pr-4 py-[18px] rounded-2xl text-base font-normal outline-none transition-all"
                style={{
                  background: "#E2FAE1",
                  border: "1px solid transparent",
                  boxShadow: "inset 0 2px 4px 1px rgba(0, 0, 0, 0.05)",
                  color: "#0D1F11",
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#026E2B";
                  e.target.style.boxShadow =
                    "inset 0 2px 4px 1px rgba(0, 0, 0, 0.05), 0 0 0 3px rgba(2, 110, 43, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "transparent";
                  e.target.style.boxShadow =
                    "inset 0 2px 4px 1px rgba(0, 0, 0, 0.05)";
                }}
              />
            </div>
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center px-2">
              <label
                htmlFor="password"
                className="text-xs font-semibold"
                style={{ color: "#3F493E" }}
              >
                Password
              </label>
              <button
                type="button"
                className="text-xs font-semibold hover:underline"
                style={{ color: "#026E2B" }}
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <LockIcon />
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-[18px] rounded-2xl text-base font-normal outline-none transition-all"
                style={{
                  background: "#E2FAE1",
                  border: "1px solid transparent",
                  boxShadow: "inset 0 2px 4px 1px rgba(0, 0, 0, 0.05)",
                  color: "#0D1F11",
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#026E2B";
                  e.target.style.boxShadow =
                    "inset 0 2px 4px 1px rgba(0, 0, 0, 0.05), 0 0 0 3px rgba(2, 110, 43, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "transparent";
                  e.target.style.boxShadow =
                    "inset 0 2px 4px 1px rgba(0, 0, 0, 0.05)";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Role selection — pill toggle group */}
          <div
            className="flex gap-2 p-1 rounded-full"
            style={{ background: "#E2FAE1" }}
            role="group"
            aria-label="Select role"
          >
            {(["parent", "therapist"] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => handleRoleSelect(r)}
                className="flex-1 py-2.5 rounded-full text-sm font-semibold transition-all"
                style={
                  role === r
                    ? {
                        background: "linear-gradient(99deg, #026E2B 0%, #436444 100%)",
                        color: "#ffffff",
                        boxShadow: "0 2px 8px rgba(2, 110, 43, 0.30)",
                      }
                    : {
                        background: "transparent",
                        color: "#3F493E",
                      }
                }
              >
                I am a {r}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 pt-2">
            {/* Log In button */}
            <button
              type="submit"
              className="w-full py-4 rounded-full text-white text-base font-medium transition-opacity hover:opacity-90 active:opacity-80 relative overflow-hidden"
              style={{
                background: "linear-gradient(99deg, #026E2B 0%, #117431 100%)",
                boxShadow:
                  "0 4px 15px -3px rgba(2, 110, 43, 0.40), inset 0 1px 0 rgba(255, 255, 255, 0.20)",
              }}
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
