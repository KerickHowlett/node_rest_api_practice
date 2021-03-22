import { model } from 'mongoose';
import { ContactSchema } from '../models/crmModel';

const Confirmation = { message: 'Successfully deleted contact' };
const Contact = model( 'Contact', ContactSchema );
const ModifySettings = { new: true, useFindAndModify: false };

const query = {
	_id: Number,
    get id() { return { _id: this._id }; },
	set id ( request ) { this._id = request.params.contactID; },
	clear() { this._id = null; }
};

const responseCall = ( response, error, value ) => {
	const key = error ? 'send' : 'json';
	const argument = error ? error : value;
	response[ key ]( argument );
	query.clear();
};

export const addNewContact = ( request, response ) => {
	const newContact = new Contact( request.body );
	newContact.save( ( error, contact ) => responseCall( response, error, contact ) );
};

export const getContacts = ( request, response ) => {
	console.dir( request ); // Don't like having the request argument just hanging there, not doing anything -- the lazy bum.
	Contact.find( ( error, contacts ) => responseCall( response, error, contacts ) );
};

export const getContactWithId = ( request, response ) => {
	query.id = request;
	Contact.findById( query.id, ( error, contact ) => responseCall( response, error, contact ) );
};

export const updateContact = ( request, response ) => {
	query.id = request;
	Contact.findOneAndUpdate( query.id, request.body, ModifySettings, ( error, contact ) => responseCall( response, error, contact ) );

};

export const deleteContact = ( request, response ) => {
	query.id = request;
    ModifySettings.new = false;
	Contact.findOneAndRemove( query.id,  ModifySettings, ( error ) => responseCall( response, error, Confirmation ) );
};