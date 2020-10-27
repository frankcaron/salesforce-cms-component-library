import { LightningElement } from 'lwc';
import getCMSContentForTopic from '@salesforce/apex/cmsutils.ManagedContentController';

export default class lwcCMSContentByTypeAndTopic extends LightningElement {

}

/* ({
	getContentForTopic : function(component, event, helper) {
        var action = component.get("c.getCMSContentForTopic");
        action.setParams({topicId : component.get("v.topicId"), managedContentType : component.get("v.managedContentType")});
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var myContent = response.getReturnValue();
                component.set("v.CMSContent", myContent);
                
                // set values to help debug
                console.log("CMS Content: " + myContent);
                //alert(JSON.stringify(myContent));
				component.set("v.stringCMSContent", JSON.stringify(response.getReturnValue()));
            } else if (state === "INCOMPLETE") {
                console.log("State incomplete.");
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        
        $A.enqueueAction(action);
	}
})
*/