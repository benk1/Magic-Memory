import React from 'react';
import './SingleCard.css';

function SingleCard({ card, handleChoice, flipped, disabled }) {
	const handleClick = () => {
		if (!disabled) handleChoice(card);
	};
	return (
		<div className="card">
			<div className={flipped ? 'flipped' : ''}>
				<img src={card.src} className="front" alt="card front" />
				<img
					src="/images/cover.png"
					onClick={handleClick}
					className="back"
					alt="cover"
				/>
			</div>
		</div>
	);
}

export default SingleCard;
