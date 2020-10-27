public with sharing class ManagedContentController {
    // API reference: https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_ConnectAPI_ManagedContent_static_methods.htm#apex_ConnectAPI_ManagedContent_static_methods
    
    /**
     * Returns all configured channels to which this user has access.
     */
    @AuraEnabled
    public static ConnectApi.ManagedContentChannelCollection getAllAvailableContentChannels() {
        return ConnectApi.ManagedContent.getAllDeliveryChannels(0, 250); // TODO: Make this paginate.
    }
    
    
    /**
     * Returns all content for a particular topic in the current community.
     */
    @AuraEnabled
    public static ConnectApi.ManagedContentVersionCollection getCMSContentForTopic(String topicId, String managedContentType) {
        String communityId = Network.getNetworkId();
        
        List<String> topicIds = new List<String>();
        topicIds.add(topicId);
        
        return getCMSContentForTopics(topicIds, managedContentType);
    }
    
    /**
     * Returns all CMS content for a set of topics in the current community.
     */
    @AuraEnabled
    public static ConnectApi.ManagedContentVersionCollection getCMSContentForTopics(List<String> topicIds, String managedContentType) {
        String curLanguage = UserInfo.getLanguage(); // TODO: how does this work for the guest user?
        String communityId = Network.getNetworkId();
        
        System.debug('Retrieving CMS Content for Community ' + communityId);
        
        // convert topic IDs to names to work with the API
        List<Topic> topics = [select Name from Topic where Id in :topicIds and networkId = :communityId];
        List<String> topicNames = new List<String>();
        for (Topic tpc : topics) {
            System.debug('Adding topic ' + tpc.Name + ' to CMS lookup list.');
            topicNames.add(tpc.Name);
        }
        
        return ConnectApi.ManagedContent.getManagedContentByTopics(communityId, topicNames, 0, 10, curLanguage, managedContentType); // TODO: Implement pagination, more robust topic name wrapping?
    }
    
    /**
     * Returns CMS content related to a record by virtue of topic-for-objects associations.
     */
    @AuraEnabled
    public static ConnectApi.ManagedContentVersionCollection getCMSContentForRecordTopics(String recordId, String managedContentType) {
        // 1. Retrieve network-scoped topics related to the record.
        String networkId = Network.getNetworkId();
        List<TopicAssignment> assignments = [Select TopicId from TopicAssignment where networkId = :networkId and EntityId = :recordId];
        // get the names opf the topics, to be used with the CMS API
        List<String> topicIds = new List<String>();
        for (TopicAssignment assn : assignments) {
            topicIds.add(assn.TopicId);
        }
        
        // 2. Retrieve CMS content tagged with those same topics
        return getCMSContentForTopics(topicIds, managedContentType);
    }
}