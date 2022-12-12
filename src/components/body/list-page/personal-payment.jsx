import React from 'react';
import PersonToManage from '../../personToManage';
import PersonToPayBack from '../../personToPayBack';
import PersonToPay from '../../personToPay';
import UserPayment from '../../../presenter/user-payment';
import * as controls from '../../controls/controls';

function PersonalPayment({ user, total, page }) {
	const presenter = new UserPayment(total, user, page);

	const cost =
		total / page.whoAre.length - presenter.getUserTotal(page, user.name);

	return (
		<li>
			{user.name === page.host ? '👑' : '🙂'}

			{user.name === page.host && (
				<PersonToManage
					username={user.name}
					total={total}
					cost={cost}
					page={page}
					member={page.whoAre.length}
				/>
			)}

			{user.name !== page.host && cost > 0 && (
				<PersonToPay
					total={total}
					page={page}
					cost={cost}
					member={page.whoAre.length}
					username={user.name}
					host={page.host}
				/>
			)}

			{user.name !== page.host && cost < 0 && (
				<PersonToPayBack
					username={user.name}
					host={page.host}
					toPayBack={cost}
				/>
			)}

			{user.name !== page.host &&
				cost == 0 &&
				controls.toLocalCurrency(
					total,
					page,
					presenter.getUserTotal(page.id, user.name),
				)}
		</li>
	);
}
export default PersonalPayment;
