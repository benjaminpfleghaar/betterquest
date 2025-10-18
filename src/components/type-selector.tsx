import { Axe, CircleQuestionMark, Construction, Trash2 } from "lucide-react";

const types = [
  {
    value: "blocked",
    label: "Blocked",
    icon: Construction,
  },
  {
    value: "modified",
    label: "Modified",
    icon: Axe,
  },
  {
    value: "destroyed",
    label: "Destroyed",
    icon: Trash2,
  },
  {
    value: "other",
    label: "Other",
    icon: CircleQuestionMark,
  },
];

export default function TypeSelector({ isPending }: { isPending: boolean }) {
  return (
    <fieldset
      role="radiogroup"
      className="flex gap-2"
      aria-labelledby="type-selector"
    >
      <legend id="type-selector" className="sr-only">
        Choose an issue type
      </legend>
      {types.map(({ value, label, icon: Icon }, index) => (
        <label
          key={label}
          className="flex h-12 grow cursor-pointer items-center justify-center gap-2 rounded-lg bg-stone-100 text-sm font-medium text-stone-500 outline-offset-2 outline-blue-500 has-checked:border has-checked:border-stone-200 has-checked:bg-white has-checked:text-stone-900 has-focus-visible:outline-2"
        >
          <input
            name="type"
            type="radio"
            value={value}
            disabled={isPending}
            className="peer sr-only"
            defaultChecked={index === 0}
          />
          <Icon strokeWidth={1.5} />
          <span className="hidden peer-checked:inline">{label}</span>
        </label>
      ))}
    </fieldset>
  );
}
