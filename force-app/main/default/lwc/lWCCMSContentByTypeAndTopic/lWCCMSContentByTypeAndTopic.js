import { LightningElement, track, wire, api } from 'lwc';
import getCMSContentForTopic from '@salesforce/apex/ManagedContentController.getCMSContentForTopic';

export default class lwcCMSContentByTypeAndTopic extends LightningElement {
    
    // Params from config
    @api topicId;
    @api contentType;

    //Params for content
    content;
    items;
    contentArray;
    error;

    //Fetch CMS content
    @wire(getCMSContentForTopic, { topicId: '$topicId', managedContentType: '$contentType' })
    wiredContent({ error, data }) {
        if (data) {

            //Grab data
            this.contentArray = data;
            this.content = JSON.stringify(this.contentArray);
            this.items = this.contentArray.items;
            
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