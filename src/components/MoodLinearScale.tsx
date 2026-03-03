import { CSSProperties } from "react";
import { TbMoodEmpty, TbMoodLookDown, TbMoodSad } from "react-icons/tb";
import { MdMood } from "react-icons/md";
import { HiOutlineEmojiHappy } from "react-icons/hi";

type MoodLinearScaleProps = {
  value: number;
  min?: number;
  max?: number;
  onChange: (next: number) => void;
};

const anchors = [
  { score: 1, emoji: <TbMoodSad />, label: "Very Low" },
  { score: 3, emoji: <TbMoodLookDown />, label: "Low" },
  { score: 5, emoji: <TbMoodEmpty />, label: "Neutral" },
  { score: 7, emoji: <HiOutlineEmojiHappy />, label: "Good" },
  { score: 10, emoji: <MdMood />, label: "Great" },
];

function MoodLinearScale({
  value,
  min = 1,
  max = 10,
  onChange,
}: MoodLinearScaleProps) {
  const progress = ((value - min) / (max - min)) * 100;
  const trackStyle: CSSProperties = {
    background: `linear-gradient(90deg, #A1869E 0%, #A1869E ${progress}%, rgba(161, 134, 158, 0.22) ${progress}%, rgba(161, 134, 158, 0.22) 100%)`,
  };

  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-3 w-full cursor-pointer appearance-none rounded-full accent-bud-secondary"
        style={trackStyle}
        aria-label="Mood score"
      />

      <div className="mt-3 flex items-start justify-between gap-1">
        {anchors.map((anchor) => (
          <button
            key={anchor.score}
            type="button"
            onClick={() => onChange(anchor.score)}
            className={`flex min-w-0 flex-1 flex-col items-center rounded-lg px-1 py-1 text-center transition-colors ${
              value === anchor.score
                ? "bg-bud-primary/10 text-bud-primary"
                : "text-bud-darkBg/65 hover:bg-black/5 dark:text-bud-lightBg/70 dark:hover:bg-white/10"
            }`}
            aria-label={`Set mood to ${anchor.label}`}
          >
            <span className="text-xl leading-none" aria-hidden="true">
              {anchor.emoji}
            </span>
            <span className="mt-1 text-[10px] leading-tight">
              {anchor.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default MoodLinearScale;
