export interface PropsInputDatePicker {
	date: Date | null;
	setDate: (any: any) => void;
	placeholder?: string;
	onClick?: (date: Date) => void;
}
