export interface PropsSelector {
	children: React.ReactNode;
	onChange?: (any: any) => void;
	name?: string;
	value?: any;
	placeholder?: string;
	overflow?: boolean;
	textname?: string;
	valuename?: string;
}

export interface PropsOption {
	children?: React.ReactNode;
	title: string;
	value: any;
	onClick?: () => void;
}
