class Automata {

	/** @constructor */
	constructor() {
		/**
		* Property that indicates the connected states.
		* @type {number}
		*/
		this.linked = [];

		/**
		* Property that indicates the matrix of each state.
		* @type {number}
		*/
		this.matrix = [];
	}

	/**
	* This method start the mealy machine.
	*/
	startMealy() {
		this.mergeItems(this.secondPart(this.initialPart()));
		this.setUpMatrix();
	}

	/**
	* This method start the moore machine.
	*/
	startMoore() {
		this.mergeItems(this.secondPart(this.initialPart()));
		this.setUpMatrix();
		this.setUpMachine();
	}

	/**
	* This method returns the connected automaton and minimum equivalent.
	* @return  {string}
	*/
	getFinalMatrix() {
		let output = "";
		for (let i = 0; i < this.matrix.length; i++) {
			output += "" + this.matrix[i][0];
			for (let j = 1; j < this.matrix[i].length; j++) {
				output += "," + this.matrix[i][j];
			}
			output += "\n";
		}
		return output;
	}

	/**
	* This method reset and clear the matrix and linked arrays.
	*/
	resetMatrix() {
		this.matrix = [];
		this.linked = [];
	}

	/**
	* This methos takes the input from the front and take it to the matrix to be processed in a mealy machine.
	* @param  {string}
	*/
	lineToArrayMealy(input) {
		if(input != ""){
			let lineArray = [];
			let lineSplit = input.split(",");
			for (let i = 0; i < lineSplit.length; i++) {
				lineArray.push(lineSplit[i]);
			}
			this.matrix.push(lineArray);
		}
	}

	/**
	* This methos takes the input from the front and take it to the matrix to be processed in a moore machine.
	* @param  {string}
	*/
	lineToArrayMoore(input) {
		if(input != ""){
			let lineArray = [];
			let lineSplit = input.split(",");
			lineArray.push(lineSplit[0]);
			let itemToPush = lineSplit[lineSplit.Length - 1];
			for (let i = 1; i < lineSplit.length - 1; i++) {
				lineArray.push(lineSplit[i]);
				lineArray.push(itemToPush);
			}
			this.matrix.push(lineArray);
		}
	}

	/**
	* This method realizes the first partitioning
	* @return  {array}
	*/
	initialPart() {
		let partitioning = [];
		let partitioningList = [];
		partitioningList.push(this.matrix[0][0]);
		partitioning.push(partitioningList);
		for (let i = 1; i < this.matrix.length; i++) {
			let auxChanges = false;
			for (let j = 0; j < partitioning.length; j++) {
				if (this.compare(partitioning[j][0], this.matrix[i][0])) {
					partitioning[j].push(this.matrix[i][0]);
					auxChanges = true;
				}
			}
			if (!auxChanges) {
				let partitioningListToAdd = [];
				partitioningListToAdd.push(this.matrix[i][0]);
				partitioning.push(partitioningListToAdd);
			}
		}
		return partitioning;
	}

	/**
	* This method takes the array from the first partitioning and starts the secondpartitioning.
	* @param  {array}
	* @return  {array}
	*/
	secondPart(input) {
		let changes = true;
		while (changes) {
			changes = false;
			for (let i = 0; i < input.length; i++) {
				for (let j = 1; j < input[i].length; j++) {
					let a1 = this.getStates(input[i][0], input);
					let a2 = this.getStates(input[i][j], input);
					if (a1 != a2) {
						let positionsToDelete = [];
						let listToAdd = [];
						listToAdd.push(input[i][j]);
						positionsToDelete.push(j);
						for (let k = j + 1; k < input[i].length; k++) {
							let a3 = this.getStates(input[i][k], input);
							if (a2 == a3) {
								listToAdd.push(input[i][k]);
								positionsToDelete.push(k);
							}
						}
						positionsToDelete.sort();
						positionsToDelete.reverse();
						for (let k = 0; k < positionsToDelete.length; k++) {
							input[i].splice(positionsToDelete[k], 1);
						}
						if (listToAdd.length > 0) {
							input.push(listToAdd);
						}
					}
				}
			}
		}
		return input;
	}

	/**
	* This method process the item x and the item y, and then compare if they are te same.
	* @param  {string} x - the string x
	* @param  {string} y - the string y
	* @return  {boolean}
	*/
	compare(x, y) {
		let outputX = "";
		let outputY = "";
		for (let i = 0; i < this.matrix.length; i++) {
			if (this.matrix[i][0] == x) {
				let auxInt = (this.matrix[i].length - 1) / 2;
				for (let j = 1; j <= auxInt; j++) {
					outputX += this.matrix[i][2 * j];
				}
			}
			if (this.matrix[i][0] == y) {
				let auxInt = (this.matrix[i].length - 1) / 2;
				for (let j = 1; j <= auxInt; j++) {
					outputY += this.matrix[i][2 * j];
				}
			}
		}
		if (outputX == outputY) {
			return true;
		} else {
			return false;
		}
	}

	/**
	* This method find if the state 'x' is in the input array.
	* @param  {string} x - the string x
	* @param  {array} input - the array input
	* @return  {int}
	*/
	getGroup(x, input) {
		let position = -1;
		for (let i = 0; i < input.length && position == -1; i++) {
			for (let j = 0; j < input[i].length && position == -1; j++) {
				if (x == input[i][j]) {
					position = i;
				}
			}
		}
		return position;
	}

	/**
	* This method returns the positions of the outputs states
	* @param  {string} x - the string x
	* @param  {array} input - the array input
	* @return  {string}
	*/
	getStates(x, input) {
		let positions = "";
		for (let i = 0; i < this.matrix.length; i++) {
			if (this.matrix[i][0] == x) {
				for (let j = 1; j < this.matrix[i].length; j += 2) {
					positions += this.getGroup(this.matrix[i][j], input) + "";
				}
			}
		}
		return positions;
	}

	/**
	* This method merge the redundant states in a name made by each state name
	* @param  {array}
	*/
	mergeItems(input) {
		for (let i = 0; i < input.length; i++) {
			let itemSwitch = "";
			if (input[i].length > 1) {
				for (let j = 0; j < input[i].length; j++) {
					itemSwitch += input[i][j];
				}
				for (let k = 0; k < input[i].length; k++) {
					for (let h = 0; h < this.matrix.length; h++) {
						for (let l = 0; l < this.matrix[h].length; l++) {
							if (this.matrix[h][l] == input[i][k]) {
								this.matrix[h][l] = itemSwitch;
							}
						}
					}
				}
			}
		}
	}

	/**
	* This method sets up the final matrix.
	*/
	setUpMatrix() {
		for (let h = 0; h < this.matrix.length; h++) {
			for (let x = h + 1; x < this.matrix.length; x++) {
				if (this.matrix[h][0] == this.matrix[x][0]) {
					this.matrix.splice(x, 1);
				}
			}
		}
	}

	/**
	* This method sets up the machine to be finished.
	*/
	setUpMachine() {
		for (let i = 0; i < this.matrix.length; i++) {
			let itemToPush = this.matrix[i][2];
			this.matrix[i].push(itemToPush);
		}
		for (let j = 0; j < this.matrix.length; j++) {
			for (let k = this.matrix[j].length - 1; k > 0; k--) {
				if (k / 2 == 0) {
					matrix[j][k];
				}
			}
		}
	}
}
