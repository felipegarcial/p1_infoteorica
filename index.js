const btnAddLine = document.querySelector("#id-add-line");
const btnStartMachine = document.querySelector("#id-start-machine");
const btnCreateOtherMachine = document.querySelector(
	"#id-create-other-machine"
);
const eleTypeOfMachine = document.getElementsByName("typeMachine");
const eleTextArea = document.querySelector("#id-text-area");
const wrapperDataInput = document.querySelector("#wrapper-data-input");
const wrapperDataOutput = document.querySelector("#wrapper-data-output");

const automata = new Automata();
let typeMachine = 0;

const resetMachine = () => {
	wrapperDataOutput.innerHTML = "";
	wrapperDataInput.innerHTML = "";
	automata.resetMatrix();
};
const addLineP = (el, inputText) => {
	console.log("Entro");
	let p = document.createElement("p");
	p.textContent = inputText;

	el.appendChild(p);
};

const addResultLines = (resultMatrixArray) => {
	resultMatrixArray.forEach((line) => {
		addLineP(wrapperDataOutput, line);
	});
};

for (i = 0; i < eleTypeOfMachine.length; i++) {
	eleTypeOfMachine[i].addEventListener("change", (event) => {
		typeMachine = parseInt(event.target.value);
		resetMachine();
	});
}

btnAddLine.addEventListener("click", () => {
	addLineP(wrapperDataInput, eleTextArea.value);

	if (typeMachine === 0 && eleTextArea.value !== "") {
		automata.lineToArrayMealy(eleTextArea.value);
	} else {
		automata.lineToArrayMoore(eleTextArea.value);
	}
	console.log(eleTextArea.value);

	eleTextArea.value = "";
});

btnStartMachine.addEventListener("click", () => {
	console.log(typeMachine);
	if (typeMachine === 0) {
		automata.startMealy();
	} else {
		automata.startMoore();
	}
	const resultMatrixArray = automata.getFinalMatrix().split("\n");
	addResultLines(resultMatrixArray);
	console.log(automata.getFinalMatrix());
});
btnCreateOtherMachine.addEventListener("click", () => {
	eleTypeOfMachine[0].checked = true;
	resetMachine();
});
