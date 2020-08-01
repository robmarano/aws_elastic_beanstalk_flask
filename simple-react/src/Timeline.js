import React, { useState, useEffect } from 'react';
import './Timeline.css';

function findNextInactiveStateNumber(items) {
	let i = 0;
	for (i=0;i<items.length;i++) {
		// console.log(i+": "+items[i].name+" "+items[i].active);
		if (items[i].active === false) {
			break;
		}
	}
	return(i);
}

// const Timeline = (props) => {
function Timeline({ items, setItems }) {
	const totalItems = items.length;
	const [numberOfActiveItems, setNumberOfActiveItems] = useState(items.filter(item => item.active).length);
	let initialWidth = totalItems > 1 ? (numberOfActiveItems - 1) / (totalItems - 1) * 100 : 0;
	if (initialWidth < 0) {
		initialWidth = 0;
	}
	const [progressBarWidth, setProgressBarWidth] = useState(initialWidth);
	// console.log('INITIAL numberOfActiveItems = ' + numberOfActiveItems);
	// console.log('INITIAL progressBarWidth = ' + progressBarWidth);
	// console.log(items);
	// console.log('state number = ' + findNextInactiveStateNumber(items));
	

  	Timeline.upButtonClicked = () => {
    	console.log('Up Button was clicked!');
    	let i = findNextInactiveStateNumber(items);
    	// console.log('state number = ' + i);
    	if (i<items.length) {
    		let name = items[i].name;
    		let phase = { name:`${name}`, active: true };
    		items[i] = phase;
    		// console.log(items);
    		let numActive = items.filter(item => item.active).length;
    		// console.log('# items active = '+ numActive);
			setNumberOfActiveItems(numActive);
			// console.log('numberOfActiveItems = ' + numberOfActiveItems);
			setProgressBarWidth(totalItems > 1 ? (numActive - 1) / (totalItems - 1) * 100 : 0);
			// console.log('progressBarWidth = ' + progressBarWidth);
    	}
	}

  	Timeline.downButtonClicked = () => {
    	console.log('Down Button was clicked!');
    	let i = findNextInactiveStateNumber(items) - 1;
    	// console.log('state number = ' + i);
    	if (i>=0) {
    		let name = items[i].name;
    		let phase = { name:`${name}`, active: false };
    		items[i] = phase;
    		// console.log(items);
    		let numActive = items.filter(item => item.active).length;
    		// console.log('# items active = '+ numActive);
			setNumberOfActiveItems(numActive);
			// console.log('numberOfActiveItems = ' + numActive);
			setProgressBarWidth(totalItems > 1 ? (numActive - 1) / (totalItems - 1) * 100 : 0);
			// console.log('progressBarWidth = ' + progressBarWidth);
    	}
	}


	useEffect(() => {
		console.log('in useEffect(): numberOfActiveItems = ' + numberOfActiveItems);
		console.log('in useEffect(): progressBarWidth = ' + progressBarWidth);
		console.log(`items = ${JSON.stringify(items)}`);
	});

	return (
		<div>
			<button className="button" onClick={Timeline.downButtonClicked}>«</button>
			<button className="button" onClick={Timeline.upButtonClicked}>»</button>
			<p></p>
			<div className="timeline">
				<div className="timeline-progress" style={{ width: `${progressBarWidth}%`}}></div>
				<div className="timeline-items">
					{items.map((item, i) => (
						<div key={i} className={"timeline-item" + (item.active ? ' active' : '')}>
							<div className="timeline-content">
								{item.name}
							</div>
						</div>
					))}
				</div>
			</div>
		        <div>
		        {numberOfActiveItems}
		        <br></br>
				{progressBarWidth}
				</div>
		</div>
	)

}
export default Timeline;
