import { CalendarEdit } from "iconsax-react";
import DatePicker from "~/components/common/DatePicker";
import Moment from "react-moment";
import { PropsInputDatePicker } from "./interfaces";
import { TippyHeadless } from "../Tippy";
import clsx from "clsx";
import styles from "./InputDatePicker.module.scss";
import { useState } from "react";

function InputDatePicker({
  date,
  setDate,
  placeholder = "Chưa chọn ngày",
  onClick,
}: PropsInputDatePicker) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <TippyHeadless
        visible={open}
        onClickOutside={() => setOpen(false)}
        position="bottom-end"
        render={() => (
          <DatePicker
            onClose={() => setOpen(false)}
            onSetValue={setDate}
            value={date}
            open={open}
            onClick={onClick}
          />
        )}
      >
        <div
          onClick={() => setOpen(true)}
          className={clsx(styles.container, { [styles.show]: open })}
        >
          <CalendarEdit color="#7d8c9e" size={20} />
          {date ? (
            <Moment format="DD/MM/YYYY" date={date} />
          ) : (
            <p>{placeholder}</p>
          )}
        </div>
      </TippyHeadless>
    </div>
  );
}

export default InputDatePicker;
