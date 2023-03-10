import ReceiptItem from './receipt-item';
import CategoryTotal from './categoryTotal';

function PageComponent({
	title,
	category,
	setIsDialogOpen,
	receiptsByCategory,
	categoryTotal,
	handleUpdatePicture,
}) {
	const total = categoryTotal[category]
		? categoryTotal[category].reduce((acc, curr) => acc + curr.payment, 0)
		: 0;

	const onAddClick = () => {
		setIsDialogOpen(prev => {
			return { ...prev, state: true, category: category };
		});
	};

	return (
		<div className='mb-2'>
			<div className='flex justify-between'>
				<h3 className='font-bold'>{title}</h3>
				<button className='' onClick={onAddClick}>
					<span className='text-lg'>✍</span>
				</button>
			</div>
			<ul className='py-1'>
				{receiptsByCategory &&
					receiptsByCategory.map(item => (
						<ReceiptItem
							key={item.id}
							item={item}
							handleUpdatePicture={handleUpdatePicture}
							category={category}
						/>
					))}
			</ul>
			<CategoryTotal total={total} title={title} />
			<hr className='my-4' />
		</div>
	);
}

export default PageComponent;
