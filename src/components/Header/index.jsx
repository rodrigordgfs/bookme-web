import Button from "../Button";

const Header = ({ title, subtitle, actionTitle, onAction }) => {
  return (
    <div className="flex flex-col gap-2 md:gap-0 md:flex-row h-36 md:h-20 items-center justify-center md:justify-between">
      <div className="flex flex-col gap-2 md:gap-0">
        <h1 className="text-2xl font-medium md:text-start text-center">
          {title}
        </h1>
        <p className="text-sm text-zinc-600 md:text-start text-center">
          {subtitle}
        </p>
      </div>
      {actionTitle && (
        <Button onClick={onAction} size="fit">
          {actionTitle}
        </Button>
      )}
    </div>
  );
};

export default Header;
