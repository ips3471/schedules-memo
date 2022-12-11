import React from 'react';
import PersonToManage from '../../personToManage';
import PersonToPayBack from '../../personToPayBack';
import PersonToPay from '../../personToPay';
import UserPayment from '../../../presenter/user-payment';
import * as controls from '../../controls/controls';

function PersonalPayment({ user, total, list }) {
	const presenter = new UserPayment(total, user, list);

	const cost =
		total / list.whoAre.length - presenter.getUserTotal(list, user.name);

	return (
		<li>
			{user.name === list.host ? '👑' : '🙂'}

			{user.name === list.host && (
				<PersonToManage
					username={user.name}
					total={total}
					cost={cost}
					list={list}
					member={list.whoAre.length}
				/>
			)}

			{user.name !== list.host && cost > 0 && (
				<PersonToPay
					total={total}
					list={list}
					cost={cost}
					member={list.whoAre.length}
					username={user.name}
					host={list.host}
				/>
			)}

			{user.name !== list.host && cost < 0 && (
				<PersonToPayBack
					username={user.name}
					host={list.host}
					toPayBack={cost}
				/>
			)}

			{user.name !== list.host &&
				cost == 0 &&
				controls.toLocalCurrency(
					total,
					list,
					presenter.getUserTotal(list.id, user.name),
				)}
		</li>
	);
}
export default PersonalPayment;
