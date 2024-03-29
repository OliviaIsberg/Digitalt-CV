/**
 * Generates SVG Path Command String for the Move Command
 * @param {number} x - X Coordinate to move to
 * @param {number} y - Y Coordinate to move to
 * @returns {string} SVG Path Move Command String
 */
function svgPathMove(x, y) {
	return 'M' + Array.from(arguments).join(' ');
}

/**
 * Generates SVG Path Command String for the Curve Command
 * @param {number} x1 - X Coordinate of the first Bezier Curve handle
 * @param {number} y1 - Y Coordinate of the first Bezier Curve handle
 * @param {number} x2 - X Coordinate of the second Bezier Curve handle
 * @param {number} y2 - Y Coordinate of the second Bezier Curve handle
 * @param {number} x - X Coordinate that the Bezier Curve ends at
 * @param {number} y - Y Coordinate that the Bezier Curve ends at
 * @returns {string} SVG Path Curve Command String
 */
function svgPathCurve(x1, y1, x2, y2, x, y) {
	return 'C' + Array.from(arguments).join(' ');
}

/**
 * Generates SVG Path Command String for the Arc Command
 * @param {number} rx - X Radius
 * @param {number} ry - Y Radius
 * @param {number} xRot - Arc rotation
 * @param {number} largeArc - Large Arc Flag, 0 or 1
 * @param {number} sweep - Sweep Flag, 0 or 1
 * @param {number} x - X Coordinate that the Arc ends at
 * @param {number} y - Y Coordinate that the Arc ends at
 * @returns {string} SVG Path Move Command String
 */
function svgPathArc(rx, ry, xRot, largeArc, sweep, x, y) {
	return 'A' + Array.from(arguments).join(' ');
}

/**
 * Generates the SVG Path Command String and updates the Path Element
 * Calculates the totalt path length and sets the CSS variables accordingly
 */
function drawLine() {
	let width = window.innerWidth;
	let height = window.innerHeight;

	let pathElement = document.getElementById('path');
	let cLocator = document.getElementById('c-locator');
	let photo = document.getElementById('photo');

	let startingPointX = Math.max(width, 1500);
	let cOffsetRight = cLocator.offsetLeft + cLocator.offsetWidth;
	let cOffsetMidY = cLocator.offsetTop + cLocator.offsetHeight / 2;
	let bezierHandle1X = cOffsetRight + (startingPointX - cOffsetRight) / 2
	let cvRadius = parseInt(window.getComputedStyle(cLocator).getPropertyValue('font-size').slice(0, -2));
	let midPointX = cOffsetRight - (photo.offsetLeft + photo.offsetWidth / 2)
	let photoRadius = (photo.offsetWidth + 3) / 2;
	let photoMidX = photo.offsetLeft + photo.offsetWidth / 2;
	let photoMidY = photo.offsetTop + photo.offsetHeight / 2
	let photoBottomLeftX = photoMidX + (photoRadius * Math.cos(135 * Math.PI / 180));
	let photoBottomLeftY = photoMidY + (photoRadius * Math.sin(135 * Math.PI / 180));
	let bezierHandle2X = photoBottomLeftX + (photoRadius * 1.5 * Math.cos(45 * Math.PI / 180));
	let bezierHandle2Y = photoBottomLeftY + (photoRadius * 1.5 * Math.sin(45 * Math.PI / 180));

	let path = [
		svgPathMove(startingPointX, height * 0.95),
		svgPathCurve(bezierHandle1X, height * 0.95, bezierHandle1X, cOffsetMidY + cvRadius, cOffsetRight, cOffsetMidY + cvRadius),
		svgPathArc(1, 1, 0, 0, 1, cOffsetRight, cOffsetMidY - cvRadius),
		svgPathArc(1, 1, 0, 0, 1, cOffsetRight, cOffsetMidY + cvRadius),
		svgPathCurve(midPointX, cOffsetMidY + cvRadius, bezierHandle2X, bezierHandle2Y, photoBottomLeftX, photoBottomLeftY),
		svgPathArc(photoRadius, photoRadius, 0, 0, 1, photoMidX, photoMidY - photoRadius),
		svgPathArc(photoRadius, photoRadius, 0, 0, 1, photoMidX, photoMidY + photoRadius),
		svgPathCurve(photoMidX - photoRadius * 2, photoMidY + photoRadius, width * -0.05, height * -0.15 + (photoMidY + photoRadius - height * -0.15) / 2, width * -0.05, height * -0.15),
	].join('');

	pathElement.setAttribute('d', path);

	// Add 50% fudge factor to workaround annoying safari bug on IOS with improperly calculated path length
	let pathLength = Math.ceil(pathElement.getTotalLength() * 1.5);

	pathElement.style.setProperty('--dash-length', pathLength);
	pathElement.style.setProperty('--dash-start', pathLength * 3);
}

/*
 * Adds event listeners to calculate path animation on load and on resize
 * This makes the animation "responsive"
 */
window.addEventListener('load', drawLine);
window.addEventListener('resize', drawLine);