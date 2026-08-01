type EmailLinkProps = {
  className?: string;
  children?: React.ReactNode;
};

const USER = "info";
const HOST = "oradentalwellness.com";

/** Builds the address only on interaction so static HTML is harder to harvest. */
export function EmailLink({ className, children }: EmailLinkProps) {
  const openMail = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = `mailto:${USER}@${HOST}`;
  };

  return (
    <a
      href="#contact"
      className={className}
      onClick={openMail}
      aria-label={`Email ${USER} at ${HOST}`}
    >
      {children ?? (
        <>
          {USER}
          <span aria-hidden>@</span>
          {HOST}
        </>
      )}
    </a>
  );
}
