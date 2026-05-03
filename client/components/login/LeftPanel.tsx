import { TurnleaLogoIcon } from "@/components/TurnleaLogo";

function LeafIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17 8C8 10 5.9 16.17 3.82 19.34C3.82 19.34 3 20.5 3 21C3 21 4 21 5 20C6 19 7 18 8 17C9 16 10 15 11 14C12 13 13 12 14 11C15 10 16 9 17 8Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 21C3 21 7 17 12 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const features = [
  { icon: <LeafIcon />, label: "Natural\n& intuitive" },
  { icon: <HeartIcon />, label: "Built with\ncare" },
  { icon: <ShieldIcon />, label: "Safe &\nchild-friendly" },
];

export function LeftPanel() {
  return (
    <div
      className="relative flex-1 lg:w-[60%] lg:flex-none flex flex-col overflow-hidden min-h-[320px] lg:min-h-screen"
      style={{
        backgroundImage: "url('/loginbackground.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-8 py-10 md:px-12 md:py-14 lg:px-14 lg:pt-16 lg:pb-10">

        {/* Brand identity */}
        <div className="flex items-center gap-3 mb-6 lg:mb-8">
          <div
            className="flex w-10 h-10 items-center justify-center rounded-xl flex-shrink-0"
            style={{
              background: "rgba(255,255,255,0.55)",
              border: "1px solid rgba(255,255,255,0.80)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 2px 12px rgba(60,120,50,0.12)",
            }}
          >
            <TurnleaLogoIcon className="[&_path]:fill-[#1a5c1a]" />
          </div>
          <div className="flex flex-col">
            <span
              className="font-bold text-xl leading-none tracking-tight"
              style={{ color: "#1a4a1a", letterSpacing: "-0.4px" }}
            >
              Turnlea
            </span>
            <span
              className="font-medium text-xs leading-none mt-0.5"
              style={{ color: "rgba(26, 74, 26, 0.65)" }}
            >
              The Talking Tree
            </span>
          </div>
        </div>

        {/* Main content area: headline + description */}
        <div className="flex flex-1 flex-col justify-center gap-6">

          {/* Headline + description */}
          <div className="flex flex-col gap-5">
            <h1
              className="font-bold leading-[1.12] tracking-tight"
              style={{
                fontSize: "clamp(28px, 3.8vw, 52px)",
                color: "#163d16",
                letterSpacing: "-1.2px",
              }}
            >
              Watch
              <br />
              conversations
              <br />
              grow,{" "}
              <span className="font-light italic" style={{ color: "#026E2B" }}>
                one turn
              </span>
              <br />
              at a time.
            </h1>

            {/* Divider with leaf */}
            <div className="flex items-center gap-3">
              <div className="h-px w-8" style={{ background: "rgba(22, 61, 22, 0.25)" }} />
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M17 8C8 10 5.9 16.17 3.82 19.34C3.82 19.34 3 20.5 3 21C3 21 4 21 5 20C6 19 7 18 8 17C9 16 10 15 11 14C12 13 13 12 14 11C15 10 16 9 17 8Z"
                  fill="#2d7a2d"
                  stroke="#2d7a2d"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
              <div className="h-px w-8" style={{ background: "rgba(22, 61, 22, 0.25)" }} />
            </div>

            <p
              className="text-sm md:text-base leading-relaxed"
              style={{ color: "rgba(22, 61, 22, 0.72)", maxWidth: "340px" }}
            >
              Supporting families and therapists in overcoming speech delays
              through engaging, nurturing digital tools designed for small hands
              and big futures.
            </p>
          </div>
        </div>

        {/* Bottom feature badges */}
        <div className="mt-6 lg:mt-8">
          <div
            className="flex items-center justify-between px-5 py-3 rounded-2xl w-3/5"
            style={{
              background: "rgba(255, 255, 255, 0.30)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.55)",
              boxShadow: "0 4px 24px rgba(40, 100, 35, 0.10)",
            }}
          >
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-2 flex-1 justify-center">
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
                  style={{
                    background: "rgba(255,255,255,0.55)",
                    border: "1px solid rgba(255,255,255,0.75)",
                    color: "#1a5c1a",
                  }}
                >
                  {f.icon}
                </div>
                <span
                  className="text-xs font-semibold leading-tight whitespace-pre-line"
                  style={{ color: "#163d16" }}
                >
                  {f.label}
                </span>
                {i < features.length - 1 && (
                  <div
                    className="w-px self-stretch mx-3"
                    style={{ background: "rgba(22, 61, 22, 0.18)" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
