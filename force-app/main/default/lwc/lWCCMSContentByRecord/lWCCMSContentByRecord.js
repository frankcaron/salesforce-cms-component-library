import { LightningElement, wire, api } from 'lwc';
import getCMSContentForRecordTopics from '@salesforce/apex/ManagedContentController.getCMSContentForRecordTopics';

export default class lwcCMSContentByRecord extends LightningElement {
    
    // Params from config
    @api recordId;
    @api contentType;
    @api inBuilder;
    @api titleAttribute;
    @api bodyAttribute;
    @api imageAttribute;
    @api contentDisplayStyle;

    //Params for content
    content;
    contentArray;
    items;
    error;
    isCardDisplayStyle = false;
    isGalleryDisplayStyle = false;

    //Fetch CMS content
    @wire(getCMSContentForRecordTopics, { recordId: '$recordId', managedContentType: '$contentType' })
    wiredContent({ error, data }) {
        if (data) {

            //Determine display style
            if (this.contentDisplayStyle == 'Cards') {
                this.isCardDisplayStyle = true;
            } else {
                this.isGalleryDisplayStyle = true;
            }

            //Grab data
            this.contentArray = data;
            this.content = JSON.stringify(this.contentArray);

            //Temporarily hold items
            let itemsToTweak = [];

            //HTML encode the body where necessary
            for (let item of this.contentArray.items) {
                
                //Clone the original item object json
                let itemToAdd = JSON.parse(JSON.stringify(item));
                
                //Logs
                console.log("CMS Component Debug || Item to add");
                console.log(itemToAdd);

                //Tweak the specific values necessary to render properly
                if (itemToAdd.contentNodes.body) {
                    console.log("CMS Component Debug || HTML: " + this.htmlDecode(itemToAdd.contentNodes.body.value));
                    itemToAdd.contentNodes.body.value = this.htmlDecode(itemToAdd.contentNodes.body.value);
                }
                if (itemToAdd.contentNodes.bannerImage.url) {
                    itemToAdd.contentNodes.bannerImage.url = '/sfsites/c' + itemToAdd.contentNodes.bannerImage.url;
                }

                //Add to array
                itemsToTweak.push(itemToAdd);
            }

            //Assign items
            this.items = itemsToTweak;

            //Todo
            //Refactor items array to HTML encode the
            
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

    //Private function to decode HTML
    htmlDecode(input) {
        var doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
    }

    //Private function to set up scrolling for the gallery view
    slideRight() {
        let currentAmount = this.template.querySelector('.cms-gallery-block').scrollLeft;
        console.log("CMS Component Debug || Scroll Amount" + currentAmount);
        this.template.querySelector('.cms-gallery-block').scrollTo({
            left: calc(currentAmount + 200),
            behavior: 'smooth'
        });
    }
    slideLeft() {
        let currentAmount = this.template.querySelector('.cms-gallery-block').scrollLeft;
        console.log("CMS Component Debug || Scroll Amount" + currentAmount);
        this.template.querySelector('.cms-gallery-block').scrollTo({
            left: calc(currentAmount - 200),
            behavior: 'smooth'
        });
    }
}