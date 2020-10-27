import { LightningElement, wire, api } from 'lwc';
import getCMSContentForRecordTopics from '@salesforce/apex/ManagedContentController.getCMSContentForRecordTopics';

export default class lwcCMSContentByRecord extends LightningElement {
    
    // Params from config
    @api recordId;
    @api contentType;

    //Params for content
    content;
    contentArray;
    items;
    error;

    //Fetch CMS content
    @wire(getCMSContentForRecordTopics, { recordId: '$recordId', managedContentType: '$contentType' })
    wiredContent({ error, data }) {
        if (data) {

            //Grab data
            this.contentArray = data;
            this.content = JSON.stringify(this.contentArray);
            this.items = this.contentArray.items;
            
            //Logs
            console.log("CMS Component Debug || Fetched content successfully");
            console.log("CMS Component Debug || Record Id: " + this.recordId);
            console.log("CMS Component Debug || Content Type: " + this.contentType);
            console.log("CMS Component Debug || Content Array: ");
            console.log(this.content);

        } else if (error) {

            //Grab error
            this.error = 'Unknown error';
            this.content = undefined;
            if (Array.isArray(error.body)) {
                this.error = error.body.map(e => e.message).join(', ');
            } else if (typeof error.body.message === 'string') {
                this.error = error.body.message;
            }

            //Logs
            console.log("CMS Component Debug || Fetch failed");
            console.log("CMS Component Debug || Error" + error);

        }
    }
}