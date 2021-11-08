import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
	{ src: '/images/helmet-1.png', matched: false },
	{ src: '/images/potion-1.png', matched: false },
	{ src: '/images/ring-1.png', matched: false },
	{ src: '/images/scroll-1.png', matched: false },
	{ src: '/images/shield-1.png', matched: false },
	{ src: '/images/sword-1.png', matched: false },
];

function App() {
	const [disabled, setDisabled] = useState(false);
	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);

	//shuffle cards for new game
	const shuffleCards = () => {
		const shuffleCards = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random() }));

		setChoiceOne(null);
		setChoiceTwo(null);

		setCards(shuffleCards);
		setTurns(0);
	};

	//Handle choice
	const handleChoice = (card) => {
		console.log(card);
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
	};

	//Compare 2 selected Cards
	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true);
			if (choiceOne.src === choiceTwo.src) {
				setCards((prevCards) => {
					return prevCards.map((card) => {
						if (card.src === choiceOne.src) {
							return { ...card, matched: true };
						} else {
							return card;
						}
					});
				});
				console.log('those cards match!');
				resetTurn();
			} else {
				console.log('those cards do not match');
				setTimeout(() => resetTurn(), 1000);
			}
		}
	}, [choiceOne, choiceTwo]);
	console.log(cards);

	//reset choices & increase turn
	const resetTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns((prevTurns) => prevTurns + 1);
		setDisabled(false);
	};

	//start a new game automatically
	useEffect(() => {
		shuffleCards();
	}, []);
	return (
		<div className="App">
			<h1>Welcome to Magic Memory</h1>
			<button onClick={shuffleCards}>New Game</button>

			<div className="card-grid">
				{cards.map((card) => (
					<SingleCard
						key={card.id}
						card={card}
						handleChoice={handleChoice}
						flipped={card === choiceOne || card === choiceTwo || card.matched}
						disabled={disabled}
					/>
				))}
			</div>
			<p>Turns: {turns}</p>
		</div>
	);
}

export default App;
