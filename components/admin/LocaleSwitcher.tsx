import {useLocale, useTranslations} from "next-intl";
import LocaleSwitcherSelect from "@/components/admin/LocaleSwitcherSelect";

export default function LocaleSwitcher() {
    const t = useTranslations("LocaleSwitcher");
    const locale = useLocale();

    return (
        <LocaleSwitcherSelect
            defaultValue={locale}
            items={[
                {
                    value: "fr",
                    label: t("fr"),
                },
                {
                    value: "en",
                    label: t("en"),
                }
            ]}
            label={t("label")}
        />
    );
}
