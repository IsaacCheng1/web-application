'use strict';

class TableTemplate {
	static fillIn(id, dictionary, columnName) {
		var table = window.document.getElementById(id);
		var rows = table.rows;

		// first examine the header row
		var header = rows[0];
		TableTemplate.fillInHeader(header, dictionary);

		// then examine column
		if (columnName === undefined) {
			for (var i = 0; i < header.cells.length; i++) {
				TableTemplate.fillInOneColumn(rows, dictionary, header.cells[i].textContent);
			}
		} else {
			TableTemplate.fillInOneColumn(rows, dictionary, columnName);
		}
		table.style.visibility = "visible";
	}

	static fillInHeader(header, dictionary) {
		var cells = header.cells;
		for (var i = 0; i < cells.length; i++) {
			var cs142TemplateProcessor = new Cs142TemplateProcessor(cells[i].textContent);
			cells[i].textContent = cs142TemplateProcessor.fillIn(dictionary);
		}
	}

	static fillInOneColumn(rows, dictionary, columnName) {
		var header = rows[0];
		var targetColumn;
		var cell;

		// find target column
		for (var i = 0; i < header.cells.length; i++) {
			cell = header.cells[i];
			if (cell.textContent === columnName) {
				targetColumn = i;
				break;
			}
		}

		// fill in every row's target column
		for (var j = 1; j < rows.length; j++) {
			cell = rows[j].cells[targetColumn];
			var cs142TemplateProcessor = new Cs142TemplateProcessor(cell.textContent);
			cell.textContent = cs142TemplateProcessor.fillIn(dictionary);
		}
	}
}