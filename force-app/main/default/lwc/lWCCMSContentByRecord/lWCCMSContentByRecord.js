import { LightningElement, track, wire, api } from 'lwc';
import getCMSContentForRecordTopics from '@salesforce/apex/ManagedContentController.getCMSContentForRecordTopics';

export default class lwcCMSContentByRecord extends LightningElement {
    
    // Params from config
    @api recordId;
    @api contentType;

    //Params for content
    content;
    contentArray;
    error;

    //Fetch CMS content
    @wire(getCMSContentForRecordTopics, { recordId: '$recordId', managedContentType: '$contentType' })
    wiredContent({ error, data }) {
        if (data) {

            //Grab data
            this.contentArray = data;
            this.content = JSON.stringify(this.contentArray);
            
            //Logs
            console.log("Grabbed content");
            console.log(this.contentArray);
            console.log(this.content);

        } else if (error) {
            //Logs
            console.log("Failed to grab content");

            //Grab error
            this.error = 'Unknown error';
            this.content = undefined;
            if (Array.isArray(error.body)) {
                this.error = error.body.map(e => e.message).join(', ');
            } else if (typeof error.body.message === 'string') {
                this.error = error.body.message;
            }
        }
    }
}