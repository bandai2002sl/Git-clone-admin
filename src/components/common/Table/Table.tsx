import {PropsTable} from './interfaces';
import styles from './Table.module.scss';

function Table({data, column}: PropsTable) {
	return (
		<div className={styles.container}>
			<table>
				<thead>
					<tr>
						{column.map((v, i) => (
							<th key={i}>{v.title}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((v: any, i: number) => (
						<tr key={i}>
							{column.map((y, j) => (
								<td className={y.className} key={j}>
									{y.render(v)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Table;
