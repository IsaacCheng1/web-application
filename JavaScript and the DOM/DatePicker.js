'use strict';

class DatePicker {
	constructor(id, callback) {
		this.id = id;
		this.callback = callback;

		this.months = { 0 : 'January',
						1 : 'February',
						2 : 'March',
						3 : 'April',
						4 : 'May',
						5 : 'June',
						6 : 'July',
						7 : 'August',
						8 : 'September',
						9 : 'October',
						10 : 'November',
						11 : 'December'};
		this.oneweek = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Happy Friday!', 'Sat.'];

		// class name for title
		this.titleClassName = 'title';
		// class name for left navigation
		this.leftNavClassName = 'leftnav';
		// class name for right navigation
		this.rightNavClassName = 'rightnav';
		// class name for header
		this.headerClassName = 'header';
		// class name for valid day
		this.validDayClassName = 'valid';
		// class name for invalid day
		this.invalidDayClassName = 'invalid';
		// class name for today
		this.todayClassName = 'today';
	}

	render(date) {
		var calendar = window.document.getElementById(this.id);
		calendar.innerHTML = '';
		var month = date.getMonth();
		var year = date.getFullYear();

		this.addCalendarTitle(calendar, year, month);
		this.addCalendarHeader(calendar);
		this.addCalendarBody(calendar, year, month, date.getDate());
	}

	addCalendarTitle(calendar, year, month) {
		var leftnav = window.document.createElement('div');
		leftnav.textContent = '<<<';
		leftnav.className = this.leftNavClassName;
		// add click event listner for leftnav
		var clickEventListnerForLeftNav = function() {
			if (this.month === 0) {
				year -= 1;
				month = 11;
			} else {
				month -= 1;
			}
			this.render(new Date(year, month));
		}.bind(this);
		leftnav.addEventListener('click', clickEventListnerForLeftNav, false);

		var title = window.document.createElement('div');
		title.textContent = this.months[month] + ' ' + year;
		title.className = this.titleClassName;

		var rightnav = window.document.createElement('div');
		rightnav.textContent = '>>>';
		rightnav.className = this.rightNavClassName;
		// add click event listner for rightnav
		var clickEventListnerForRightNav = function() {
			if (this.month === 11) {
				year += 1;
				month = 0;
			} else {
				month += 1;
			}
			this.render(new Date(year, month));
		}.bind(this);
		rightnav.addEventListener('click', clickEventListnerForRightNav, false);

		calendar.appendChild(leftnav);
		calendar.appendChild(title);
		calendar.appendChild(rightnav);
	}

	addCalendarHeader(calendar) {
		this.oneweek.forEach(day => {
			var header = window.document.createElement('div');
			header.textContent = day;
			header.className = this.headerClassName;
			calendar.appendChild(header);
		});
	}

	addCalendarBody(calendar, year, month, date) {
		var numOfDays = this.getDaysInMonth(month, year);
		var firstValidDay = new Date(year, month, 1).getDay();
		var numOfRows = Math.ceil((numOfDays + firstValidDay) / 7);
		for (var i = 0; i < 7 * numOfRows; i++) {
			var d = window.document.createElement('div');
			if ( i < firstValidDay || i >= firstValidDay + numOfDays) {
				d.className = this.invalidDayClassName;
			} else {
				// add click event listener for valid day
				var clickEventListener = (function() {
					var fixedDate = new Date(year, month, parseInt(event.target.textContent));
					this.callback(this.id, 
						{'month' : fixedDate.getMonth(), 'day' : fixedDate.getDay(), 'year' : fixedDate.getFullYear(), 'date' : fixedDate.getDate()});
				}).bind(this);
				d.addEventListener("click", clickEventListener, false);

				// highlight today
				if (date === i - firstValidDay + 1) {
					d.className = this.todayClassName;
				} else {
					d.className = this.validDayClassName;
				}       
			}
			d.textContent = new Date(year, month, i - firstValidDay + 1).getDate();
			calendar.appendChild(d);
		}
	}

	getDaysInMonth(month,year) {
 		return new Date(year, month+1, 0).getDate();
	}
}