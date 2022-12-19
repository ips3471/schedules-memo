class UserPayment {
	constructor(categoryTotal) {
		this.categoryTotal = categoryTotal;
	}

	userTotal(user) {
		return this.#sortByUser(user).reduce(
			(categoryAcc, curr) =>
				categoryAcc + curr.reduce((userAcc, curr) => userAcc + curr.payment, 0),
			0,
		);
	}

	#sortByUser(user) {
		return Object.keys(this.categoryTotal).map(key =>
			this.categoryTotal[key].filter(i => i.name === user.name),
		);
	}

	/* getUserTotal(list, userName) {
		const categories = list.receipts;
		if (!categories) return;
		const reservation = categories.reservation
			? Object.values(categories.reservation).filter(
					item => item.name === userName,
			  ) //
			: [];
		const mart = categories.mart
			? Object.values(categories.mart).filter(item => item.name === userName) //
			: [];
		const ticket = categories.ticket
			? Object.values(categories.ticket).filter(item => item.name === userName) //
			: [];
		const car = categories.car
			? Object.values(categories.car).filter(item => item.name === userName) //
			: [];
		const food = categories.food
			? Object.values(categories.food).filter(item => item.name === userName) //
			: [];

		return (
			reservation.reduce((prev, curr) => prev + Number(curr.payment), 0) +
			mart.reduce((prev, curr) => prev + Number(curr.payment), 0) +
			ticket.reduce((prev, curr) => prev + Number(curr.payment), 0) +
			car.reduce((prev, curr) => prev + Number(curr.payment), 0) +
			food.reduce((prev, curr) => prev + Number(curr.payment), 0)
		);
	} */
}

export default UserPayment;
