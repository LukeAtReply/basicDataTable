@isTest
public with sharing class CampaignMembersDataTableControllerTest {
    
    @isTest
    public static void campaignMembersQuery_retrieveRecords_shouldReturnListSize1(){
        Id eventRecId = Schema.SObjectType.Campaign.getRecordTypeInfosByName().get('Event').getRecordTypeId(); 

        // Set up data
        List<Campaign> campaignRec = DataFactory.createCampaign(1);
        campaignRec[0].Name = 'Campaign 1';
        campaignRec[0].RecordTypeId = eventRecId;
        campaignRec[0].StartDate = system.today();
        
        insert campaignRec;

        List<Account> testAccount = DataFactory.createAccounts(1);
        testAccount[0].Name = 'Test Account 1';
        
        insert testAccount;

        List<Contact> contactRec = DataFactory.createContacts(1);
        contactRec[0].FirstName = 'Contact';
        contactRec[0].LastName = 'One';
        contactRec[0].AccountId = testAccount[0].Id;

        insert contactRec;

        List<CampaignMember> campaignMemberRec = DataFactory.createCampaignMembers(1);
        campaignMemberRec[0].ContactId = contactRec[0].Id;
        campaignMemberRec[0].CampaignId = campaignRec[0].Id;

        insert campaignMemberRec;

        // Test
        List<CampaignMember> campaignMemberResult = CampaignMembersDataTableController.campaignMembersQuery(campaignRec[0].Id);

        // Assert
        system.assertEquals(1, campaignMemberResult.size());
    }
}