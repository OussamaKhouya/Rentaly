"use client";

import clsx from "clsx";
import { useTransition } from "react";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import * as Select from "@radix-ui/react-select";
import { CheckIcon, LanguageIcon } from "@heroicons/react/16/solid";

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
  label: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label,
}: Props) {
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div className="relative w-full">
      <Select.Root defaultValue={defaultValue} onValueChange={onChange} >
        <Select.Trigger
          aria-label={label}
          className={clsx(
            "flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700  w-full",
            isPending && "pointer-events-none opacity-80"
          )}
        >
          <LanguageIcon className="h-5 w-5 text-blue-500" />
          <Select.Value />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            align="end"
            className="z-50 min-w-[8rem] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800 w-full"
            position="popper"
            sideOffset={4}
          >
            <Select.Viewport>
              <Select.Group>
                {items.map((item) => (
                  <Select.Item
                    key={item.value}
                    className={clsx(
                      "flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-slate-700 outline-none transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700",
                      item.value === defaultValue && "bg-slate-100 dark:bg-slate-700 w-full"
                    )}
                    value={item.value}
                  >
                    <Select.ItemText>
                      <div className="flex items-center gap-2">
                        <span className="w-full">{item.label}</span>

                        {item.value === defaultValue && (
                          <CheckIcon className="h-6 w-6 text-blue-500" />
                        )}
                      </div>
                    </Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
