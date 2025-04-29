import { Session } from "next-auth";
import { useTranslations } from "next-intl";

const Header = ({ session }: { session: Session }) => {
  const t = useTranslations("Admin");

  return (
    <header className="admin-header flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-semibold text-dark-400">
          {session?.user?.name}
        </h2>
        <p className="text-base text-slate-500">
          {t("Dashboard")}
        </p>
      </div>
    </header>
  );
};
export default Header;
