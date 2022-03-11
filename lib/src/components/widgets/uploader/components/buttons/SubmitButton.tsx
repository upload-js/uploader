import { JSX } from "preact";
import { UploaderLocale } from "uploader";
import { useState } from "preact/compat";
import { useTransientFlag } from "uploader/modules/FormUtils";
import cn from "classnames";

interface Props {
  busyText: string;
  idleText: string;
  locale: UploaderLocale;
  onSubmit: () => Promise<void>;
}

export const SubmitButton = ({ busyText, idleText, locale, onSubmit }: Props): JSX.Element => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useTransientFlag();
  const isDisabled = isSubmitting || isError;

  const submitAsync = (e: Event): void => {
    e.preventDefault();

    setIsSubmitting(true);

    onSubmit().then(
      () => {},
      e => {
        console.error(e);
        setIsError();
        setIsSubmitting(false);
      }
    );
  };

  return (
    <button disabled={isDisabled} onClick={submitAsync} className={cn("btn btn--primary", { disabled: isDisabled })}>
      {isSubmitting ? busyText : isError ? locale["error!"] : idleText}
    </button>
  );
};
