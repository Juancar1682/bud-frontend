import { FormEvent, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import MoodLinearScale from "../components/MoodLinearScale";
import { apiPost } from "../services/apiClient";
import { TbMoodEmpty, TbMoodLookDown, TbMoodSad } from "react-icons/tb";
import { MdMood } from "react-icons/md";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { IconType } from "react-icons";

type MoodEmoji = {
  min: number;
  max: number;
  emoji: React.ReactNode;
  label: string;
};

const moodEmojis: MoodEmoji[] = [
  { min: 1, max: 2, emoji: <TbMoodSad />, label: "Very Low" },
  { min: 3, max: 4, emoji: <TbMoodLookDown />, label: "Low" },
  { min: 5, max: 6, emoji: <TbMoodEmpty />, label: "Neutral" },
  { min: 7, max: 8, emoji: <HiOutlineEmojiHappy />, label: "Good" },
  { min: 9, max: 10, emoji: <MdMood />, label: "Great" },
];

function getMoodEmoji(score: number): MoodEmoji {
  const matched = moodEmojis.find(
    (entry) => score >= entry.min && score <= entry.max,
  );
  if (matched) {
    return matched;
  }

  return { min: 5, max: 6, emoji: "😐", label: "Neutral" };
}

function Mood() {
  const [moodScore, setMoodScore] = useState<number>(7);
  const [tags, setTags] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const selectedMood = getMoodEmoji(moodScore);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (moodScore < 1 || moodScore > 10) {
      setFeedback("Mood score must be between 1 and 10.");
      return;
    }

    setSaving(true);
    const response = await apiPost<
      { entry: { id: string } },
      { score: number; tags: string[]; note?: string }
    >("/api/mood", {
      score: moodScore,
      tags: tags
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      note: note.trim() || undefined,
    });
    setSaving(false);

    if (!response.success) {
      setFeedback(response.error.message);
      return;
    }

    setFeedback("Mood saved.");
  };

  return (
    <Card title="Log Mood" subtitle="Track how you feel right now">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="rounded-2xl border border-black/10 bg-white/60 p-4 dark:border-white/15 dark:bg-white/5">
          <p className="text-sm font-medium">Mood Snapshot</p>
          <div className="mt-3">
            <MoodLinearScale value={moodScore} onChange={setMoodScore} />
          </div>
          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="text-4xl" aria-hidden="true">
              {selectedMood.emoji}
            </span>
            <p className="text-sm">
              <span className="font-semibold text-bud-primary">
                {moodScore}/10
              </span>{" "}
              · {selectedMood.label}
            </p>
          </div>
          <p className="mt-2 text-center text-xs text-bud-darkBg/65 dark:text-bud-lightBg/65">
            Slide or tap an emoji to set your mood.
          </p>
        </div>

        <div className="space-y-2">
          <Button type="submit" fullWidth disabled={saving}>
            {saving ? "Saving..." : "Log Mood"}
          </Button>
          {feedback ? (
            <p className="text-sm text-bud-primaryDeep dark:text-bud-primarySoft">
              {feedback}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-5 gap-2">
          {moodEmojis.map((mood) => {
            const isSelected = moodScore >= mood.min && moodScore <= mood.max;

            return (
              <button
                key={mood.label}
                type="button"
                className={`rounded-xl border px-2 py-2 text-center transition-colors ${
                  isSelected
                    ? "border-bud-primary bg-bud-primary/10"
                    : "border-black/10 bg-white/70 hover:bg-black/5 dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10"
                }`}
                onClick={() => setMoodScore(mood.max)}
                aria-label={`Set mood to ${mood.label}`}
              >
                <p className="flex justify-center text-xl" aria-hidden="true">
                  {mood.emoji}
                </p>
                <p className="flex justify-center mt-1 text-[11px]">
                  {mood.label}
                </p>
              </button>
            );
          })}
        </div>

        <label className="block text-sm font-medium" htmlFor="tags">
          Tags (optional)
        </label>
        <input
          id="tags"
          value={tags}
          onChange={(event) => setTags(event.target.value)}
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm focus:border-bud-primary focus:outline-none dark:border-white/20 dark:bg-white/10"
          placeholder="sleep, stress, movement"
        />

        <label className="block text-sm font-medium" htmlFor="note">
          Note (optional)
        </label>
        <textarea
          id="note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          className="min-h-28 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm focus:border-bud-primary focus:outline-none dark:border-white/20 dark:bg-white/10"
          placeholder="What influenced your mood today?"
        />
      </form>
    </Card>
  );
}

export default Mood;
