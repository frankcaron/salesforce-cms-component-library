import { LightningElement, api } from 'lwc';

export default class lwcCMSContentByTypeAndTopic extends LightningElement {
    
    // Params from config
    @api topicId;
    @api contentType;
    @api inBuilder;
    @api numberContentItems;
    @api pathAttribute;
    @api titleAttribute;
    @api bodyAttribute;
    @api imageAttribute;
    @api linkAttribute;
    @api contentDisplayStyle;
    @api topicMode;

    //Params for content
    topicMode = true;

}