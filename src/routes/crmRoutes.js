import { addNewContact, deleteContact, getContacts, getContactWithId, updateContact } from '../controllers/crmController';

const routes = ( app ) => {

	app.route( '/contact' )
		.get( getContacts ) // SELECT all (*) Contact records.
		.post( addNewContact ); // INSERT new Contact record.

	app.route( '/contact/:contactID' )
		.get( getContactWithId ) // SELECT queried Contact record.
		.put( updateContact ) // UPDATE queried Contact record.
		.delete( deleteContact ); // DELETE queried Contact record.

};

export default routes;