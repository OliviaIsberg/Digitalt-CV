function svgPathMove(x, y) {
	return 'M' + Array.from(arguments).join(' ');
}

function svgPathCurve(x1, y1, x2, y2, x, y) {
	return 'C' + Array.from(arguments).join(' ');
}

function svgPathArc(rx, ry, xRot, largeArc, sweep, x, y) {
	return 'A' + Array.from(arguments).join(' ');
}

function drawLine() {
	let width = window.innerWidth;
	let height = window.innerHeight;

	let pathElement = document.getElementById('path');
	let cLocator = document.getElementById('c-locator');
	let photo = document.getElementById('photo');

	let cOffsetRight = cLocator.offsetLeft + cLocator.offsetWidth;
	let cOffsetMidY = cLocator.offsetTop + cLocator.offsetHeight / 2;
	let midPointX = cOffsetRight - (photo.offsetLeft + photo.offsetWidth / 2)
	let photoRadius = (photo.offsetWidth + parseInt(window.getComputedStyle(photo).getPropertyValue('outline-width').slice(0, -2))) / 2;
	let photoMidX = photo.offsetLeft + photo.offsetWidth / 2;
	let photoMidY = photo.offsetTop + photo.offsetHeight / 2
	let photoBottomLeftX = photoMidX + (photoRadius * Math.cos(135 * Math.PI / 180));
	let photoBottomLeftY = photoMidY + (photoRadius * Math.sin(135 * Math.PI / 180));
	let bezierHandleX = photoBottomLeftX + (photoRadius * 1.5 * Math.cos(45 * Math.PI / 180));
	let bezierHandleY = photoBottomLeftY + (photoRadius * 1.5 * Math.sin(45 * Math.PI / 180));

	let path = [
		svgPathMove(width * 1.05, height * 0.95),
		svgPathCurve(width * 0.90, height * 0.95, width * 0.85, height * 0.76, width * 0.80, height * 0.58),
		svgPathCurve(width * 0.75, height * 0.40, width * 0.70, cOffsetMidY + 80, cOffsetRight, cOffsetMidY + 80),
		svgPathArc(1, 1, 0, 0, 1, cOffsetRight, cOffsetMidY - 80),
		svgPathArc(1, 1, 0, 0, 1, cOffsetRight, cOffsetMidY + 80),
		svgPathCurve(midPointX, cOffsetMidY + 80, bezierHandleX, bezierHandleY, photoBottomLeftX, photoBottomLeftY),
		svgPathArc(photoRadius, photoRadius, 0, 0, 1, photoMidX, photoMidY - photoRadius),
		svgPathArc(photoRadius, photoRadius, 0, 0, 1, photoMidX, photoMidY + photoRadius),
		svgPathCurve(photoMidX - photoRadius * 2, photoMidY + photoRadius, width * -0.05, height * -0.15 + (photoMidY + photoRadius - height * -0.15) / 2, width * -0.05, height * -0.15),
	].join('');

	pathElement.setAttribute('d', path);
	pathElement.style.setProperty('--dashlen', pathElement.getTotalLength());
	pathElement.style.setProperty('--dashoffsetafter', pathElement.getTotalLength() * -1);
}

window.addEventListener('load', drawLine);
window.addEventListener('resize', drawLine);