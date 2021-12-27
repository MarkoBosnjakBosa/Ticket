import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const [event, setEvent] = useState({name: "", date: "", address: ""});
	const [eventErrors, setEventErrors] = useState({});
	const [events, setEvents] = useState([]);
	const [ticket, setTicket] = useState({event: "", name: ""});
	const [ticketErrors, setTicketErrors] = useState({});
	const [tickets, setTickets] = useState([]);
	const [eventCreated, setEventCreated] = useState(false);
	const [ticketCreated, setTicketCreated] = useState(false);

	const handleEvent = e => {
		const {name, value} = e.target;
		setEvent(values => ({...values, [name]: value}));
	};

	const submitEvent = e => {
		e.preventDefault();
		let isValid = validateEventForm();
		if(isValid) {
			let options = {method: "POST", headers: new Headers({"Content-Type": "application/json", "Accept": "application/json"}), body: JSON.stringify(event)};
			fetch(process.env.REACT_APP_SERVER_BASE_URL + "/events/create", options)
			.then(response => response.json())
			.then(response => {
				setEvents(values => [...values, response.event]);
				setEventCreated(true);
				clearForm("event");
			}).catch(error => {
				console.log("Error: ", error);
			});
		}
	}

	const validateEventForm = () => {
		let isValid = true;
		let errors = {name: false, date: false, address: false};
		if(!event.name) {
			isValid = false;
			errors.name = "Please provide a valid name!";
		}
		let dateFormat = /^(0?[1-9]|[12][0-9]|3[01])[\.](0?[1-9]|1[012])[\.]\d{4}$/;
		if(!event.date || !dateFormat.test(event.date)) {
			isValid = false;
			errors.date = "Please provide a valid date!";
		}
		if(!event.address) {
			isValid = false;
			errors.address = "Please provide a valid address!"
		}
		setEventErrors(errors);
		return isValid;
	}

	const handleTicket = e => {
		const {name, value} = e.target;
		setTicket(values => ({...values, [name]: value}));
	};

	const submitTicket = e => {
		e.preventDefault();
		let isValid = validateTicketForm();
		if(isValid) {
			let options = {method: "POST", headers: new Headers({"Content-Type": "application/json", "Accept": "application/json"}), body: JSON.stringify(ticket)};
			fetch(process.env.REACT_APP_SERVER_BASE_URL + "/tickets/book", options)
			.then(response => response.json())
			.then(response => {
				setTickets(values => [...values, response.ticket]);
				setTicketCreated(true);
				clearForm("ticket");
			}).catch(error => {
				console.log("Error: ", error);
			});
		}
	}

	const validateTicketForm = () => {
		let isValid = true;
		let errors = {name: false};
		if(!ticket.event) {
			isValid = false;
			errors.event = "Please provide a valid event!"
		}
		if(!ticket.name) {
			isValid = false;
			errors.name = "Please provide a valid name!"
		}
		setTicketErrors(errors);
		return isValid;
	}

	const cancelTicket = barcode => {
		let confirmed = window.confirm("Delete ticket " + barcode + "?");
		if(confirmed) {
			let options = {method: "DELETE"};
			fetch(process.env.REACT_APP_SERVER_BASE_URL + "/tickets/cancel/" + barcode, options).then(response => {
				setTickets(tickets.filter(ticket => ticket.barcode !== barcode));
			}).catch(error => {
				console.log("Error: ", error);
			});
		}
	}

	const hideAlert = type => {
		if(type === "event") {
			setEventCreated(false);
		}
		if(type === "ticket") {
			setTicketCreated(false);
		}
	}

	const clearForm = type => {
		if(type === "event") {
			setEvent({name: "", date: "", address: ""});
		}
		if(type === "ticket") {
			setTicket(values => ({...values, ["name"]: ""}));
		}
	}

	useEffect(() => {
		let options = {method: "GET"};
		fetch(process.env.REACT_APP_SERVER_BASE_URL + "/events/get", options)
			.then(response => response.json())
			.then(events => setEvents(events));
		fetch(process.env.REACT_APP_SERVER_BASE_URL + "/tickets/get", options)
			.then(response => response.json())
			.then(tickets => setTickets(tickets));
	}, []);

	return (
		<div className="App">
			<div className="nav nav-tabs justify-content-center" role="tablist">
				<button type="button" id="eventsNavTab" data-bs-toggle="tab" data-bs-target="#eventsTab" className="nav-link active" role="tab">Events</button>
				<button type="button" id="ticketsNavTab" data-bs-toggle="tab" data-bs-target="#ticketsTab" className="nav-link" role="tab">Tickets</button>
			</div>
			<div className="tab-content">
				<div id="eventsTab" className="tab-pane fade active show">
					<h1>Events</h1>
					{eventCreated && <div className="alert alert-success alert-dismissible" role="alert">
						<b>Event has been successfully created!</b>
						<button type="button" className="btn-close" onClick={() => hideAlert('event')}></button>
					</div>}
					<form onSubmit={submitEvent}>
						<div className="row">
							<div className="mb-3 col-3">
								<input type="text" name="name" value={event.name} onChange={handleEvent} className="form-control" placeholder="Name..."/>
								<small className="form-text error">{eventErrors["name"]}</small>
							</div>
							<div className="mb-3 col-3">
								<input type="text" name="date" value={event.date} onChange={handleEvent} className="form-control" placeholder="Date..."/>
								<small className="form-text error">{eventErrors["date"]}</small>
							</div>
							<div className="mb-3 col-5">
								<input type="text" name="address" value={event.address} onChange={handleEvent} className="form-control" placeholder="Address..."/>
								<small className="form-text error">{eventErrors["address"]}</small>
							</div>
							<div className="mb-3 col-1">
								<button type="submit" className="btn btn-primary">Submit</button>
							</div>
						</div>
					</form>
					<table className="table">
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Date</th>
								<th>Address</th>
							</tr>
						</thead>
						{events.length ?
							<tbody>
								{events.map((item, index) => {
									return (
										<tr key={index}>
											<th>{index + 1}</th>
											<td>{item.name}</td>
											<td>{item.date}</td>
											<td>{item.address}</td>
										</tr>
									);
								})}
							</tbody>
						:
							<tbody>
								<tr>
									<td colSpan="4" className="noEvents">No events found!</td>
								</tr>
							</tbody>
						}
					</table>
				</div>
				<div id="ticketsTab" className="tab-pane fade">
					<h1>Tickets</h1>
					{ticketCreated && <div className="alert alert-success alert-dismissible" role="alert">
						<b>Ticket has been successfully created!</b>
						<button type="button" className="btn-close" onClick={() => hideAlert('ticket')}></button>
					</div>}
					<form onSubmit={submitTicket}>
						<div className="row">
							<div className="mb-3 col-1">
								<label htmlFor="event" className="col-form-label">Event:</label>
							</div>
							<div className="mb-3 col-4">
								<select name="event" className="form-control" onChange={handleTicket}>
									<option key="-1" value="">Select event...</option>
									{events.map((item, index) => (
										<option key={index} value={item.name}>{item.name}</option>
									))}
								</select>
								<small className="form-text error">{ticketErrors["event"]}</small>
							</div>
							<div className="mb-3 col-6">
								<input type="text" name="name" value={ticket.name} onChange={handleTicket} className="form-control" placeholder="Name..."/>
								<small className="form-text error">{ticketErrors["name"]}</small>
							</div>
							<div className="mb-3 col-1">
								<button type="submit" className="btn btn-primary">Submit</button>
							</div>
						</div>
					</form>
					<table className="table">
						<thead>
							<tr>
								<th>#</th>
								<th>Barcode</th>
								<th>Event</th>
								<th>Name</th>
								<th>Actions</th>
							</tr>
						</thead>
						{tickets.length ?
							<tbody>
								{tickets.map((item, index) => {
									return (
										<tr key={index}>
											<th>{index + 1}</th>
											<td>{item.barcode}</td>
											<td>{item.event}</td>
											<td>{item.name}</td>
											<td><button type="type" className="btn btn-danger" onClick={() => cancelTicket(item.barcode)}>Cancel</button></td>
										</tr>
									);
								})}
							</tbody>
						:
							<tbody>
								<tr>
									<td colSpan="5" className="noTickets">No tickets booked!</td>
								</tr>
							</tbody>
						}
					</table>
				</div>
			</div>
		</div>
	);
}

export default App;