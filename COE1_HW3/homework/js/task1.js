function validateInput(ia, ny, per) {
    return (
        !isNaN(ia) &&
        !isNaN(ny) &&
        !isNaN(per) &&
        ia >= 1000 &&
        ny >= 1 &&
        per <= 100
    );
}

function calculate(ia, ny, per) {
    let ta = ia;
    let tp = 0;

    for (let year = 1; year <= ny; year++) {
        const yp = (ta * per) / 100;
        ta += yp;
        tp += yp;
    }

    return {
        tp: tp.toFixed(2),
        ta: ta.toFixed(2)
    };
}

function display(ia, ny, per, tp, ta) {
    alert(
        'Initial amount: ' + ia.toFixed(2) +
        '\nNumber of years: ' + ny +
        '\nper of year: ' + per + '%' +
        '\n\nTotal profit: ' + tp +
        '\nTotal amount: ' + ta
    );
}

function getInput(msg) {
    const userInput = prompt(msg);
    return userInput !== null && userInput.trim() !== '' ? userInput.trim() : null;
}

function Main() {
    const iaInput = getInput('Enter initial amount of money:');
    const nyInput = getInput('Enter number of years:');
    const perInput = getInput('Enter per of a year:');

    if (iaInput === null || nyInput === null || perInput === null) {
        alert('Invalid input data');
        return;
    }

    const ia = parseFloat(iaInput);
    const ny = parseInt(nyInput);
    const per = parseFloat(perInput);

    if (validateInput(ia, ny, per)) {
        const { tp, ta } = calculate(ia, ny, per);
        display(ia, ny, per, tp, ta);
    } else {
        alert('Invalid input data');
    }
}

Main();
